package com.hxg.filter;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.ArrayList;
import java.util.List;

@Configuration
public class FilterConfig {

    @Bean
    public FilterRegistrationBean timeFilter() {
        FilterRegistrationBean registrationBean = new FilterRegistrationBean();

        TimeFilter timeFilter = new TimeFilter();
        registrationBean.setFilter(timeFilter);

        List<String> urlList = new ArrayList<>();

        urlList.add("/*");

        registrationBean.setUrlPatterns(urlList);

        return  registrationBean;
    }

    @Bean
    public FilterRegistrationBean otherFiler() {
        FilterRegistrationBean registrationBean = new FilterRegistrationBean();

        OtherFilter otherFilter = new OtherFilter();
        registrationBean.setFilter(otherFilter);

        List<String> urlList = new ArrayList<>();

        urlList.add("/*");

        registrationBean.setUrlPatterns(urlList);

        return  registrationBean;
    }



}
