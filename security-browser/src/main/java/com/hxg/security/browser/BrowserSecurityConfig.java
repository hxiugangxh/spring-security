package com.hxg.security.browser;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
public class BrowserSecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        // 必须注解掉，否则httpBasic无法生效
//        super.configure(http);

        /*http.httpBasic()*/
        http.formLogin()
                .loginPage("/login/login.html")
                .loginProcessingUrl("/security/login")
                .and()
                .authorizeRequests()
                .antMatchers("/login/login.html").permitAll()
                .anyRequest()
                .authenticated()
                .and().csrf().disable();
    }
}
