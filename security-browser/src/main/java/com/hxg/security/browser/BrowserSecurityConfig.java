package com.hxg.security.browser;

import com.hxg.security.browser.authentication.HxgAuthenticaTionFailureHandler;
import com.hxg.security.browser.authentication.HxgAuthenticationSuccessHandler;
import com.hxg.security.properties.SecurityProperties;
import com.hxg.security.validate.core.ValidateCodeFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration
        .WebSecurityConfigurerAdapter;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import sun.invoke.util.VerifyAccess;

@Configuration
public class BrowserSecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private SecurityProperties securityProperties;

    @Autowired
    private HxgAuthenticationSuccessHandler hxgAuthenticationSuccessHandler;

    @Autowired
    private HxgAuthenticaTionFailureHandler hxgAuthenticaTionFailureHandler;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        // 必须注解掉，否则httpBasic无法生效
//        super.configure(http);

        ValidateCodeFilter validateCodeFilter = new ValidateCodeFilter();
        validateCodeFilter.setAuthenticationFailureHandler(hxgAuthenticaTionFailureHandler);
        /*http.httpBasic()*/
        http.addFilterBefore(validateCodeFilter, UsernamePasswordAuthenticationFilter.class)
                .formLogin()
                .loginPage("/authentication/require")
                .loginProcessingUrl("/security/form")
                .successHandler(hxgAuthenticationSuccessHandler)
//                .defaultSuccessUrl("/security/form")
                .failureHandler(hxgAuthenticaTionFailureHandler)
                .and()
                .authorizeRequests()
                .antMatchers("/authentication/require",
                        securityProperties.getBrowserProperties().getLoginPage(),
                        "/code/image").permitAll()
                .anyRequest()
                .authenticated()
                .and().csrf().disable();
    }
}
