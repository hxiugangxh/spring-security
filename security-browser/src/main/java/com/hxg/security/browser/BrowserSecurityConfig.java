package com.hxg.security.browser;

import com.hxg.security.browser.authentication.HxgAuthenticaTionFailureHandler;
import com.hxg.security.browser.authentication.HxgAuthenticationSuccessHandler;
import com.hxg.security.properties.SecurityProperties;
import com.hxg.security.validate.core.ValidateCodeFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration
        .WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.rememberme.JdbcTokenRepositoryImpl;
import org.springframework.security.web.authentication.rememberme.PersistentTokenRepository;

import javax.sql.DataSource;

@Configuration
public class BrowserSecurityConfig extends WebSecurityConfigurerAdapter {

    @SuppressWarnings("SpringJavaAutowiringInspection")
    @Autowired
    private DataSource dataSource;

    @Autowired
    private SecurityProperties securityProperties;

    @Autowired
    private HxgAuthenticationSuccessHandler hxgAuthenticationSuccessHandler;

    @Autowired
    private HxgAuthenticaTionFailureHandler hxgAuthenticaTionFailureHandler;

    @Autowired
    private UserDetailsService userDetailsService;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public PersistentTokenRepository persistentTokenRepository() {
        JdbcTokenRepositoryImpl tokenRepository = new JdbcTokenRepositoryImpl();

        tokenRepository.setDataSource(dataSource);
        // 没有表则设置下，或者去源码里面取 CREATE_TABLE_SQL 的SQL
//        tokenRepository.setCreateTableOnStartup(true);

        return tokenRepository;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        // 必须注解掉，否则httpBasic无法生效
//        super.configure(http);

        ValidateCodeFilter validateCodeFilter = new ValidateCodeFilter();
        validateCodeFilter.setAuthenticationFailureHandler(hxgAuthenticaTionFailureHandler);
        validateCodeFilter.setSecurityProperties(securityProperties);
        validateCodeFilter.afterPropertiesSet();

        /*http.httpBasic()*/
        http.addFilterBefore(validateCodeFilter, UsernamePasswordAuthenticationFilter.class)
                .formLogin()
                .loginPage("/authentication/require")
                .loginProcessingUrl("/security/form")
                .successHandler(hxgAuthenticationSuccessHandler)
                //                .defaultSuccessUrl("/security/form")
                .failureHandler(hxgAuthenticaTionFailureHandler)
                .and()
                .rememberMe()
                .tokenRepository(persistentTokenRepository())
                .tokenValiditySeconds(securityProperties.getBrowser().getRememberMeSeconds())
                .userDetailsService(userDetailsService)
                .and()
                // 授权的请求路径
                .authorizeRequests()
                .antMatchers("/authentication/require",
                        securityProperties.getBrowser().getLoginPage(),
                        "/code/image").permitAll()
                // 所有请求
                .anyRequest()
                // 都需要身份验证
                .authenticated()
                .and()
                // 跨栈请求认证
                .csrf().disable();
    }
}
