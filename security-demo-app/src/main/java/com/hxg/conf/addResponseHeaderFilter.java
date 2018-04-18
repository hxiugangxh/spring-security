package com.hxg.conf;

import com.hxg.security.MyUserDetail;
import com.netflix.zuul.ZuulFilter;
import com.netflix.zuul.context.RequestContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import java.util.UUID;

import static org.springframework.cloud.netflix.zuul.filters.support.FilterConstants.POST_TYPE;
import static org.springframework.cloud.netflix.zuul.filters.support.FilterConstants
        .SEND_RESPONSE_FILTER_ORDER;


/**
 * Created by 廖师兄
 * 2018-02-15 16:00
 */
@Component
public class addResponseHeaderFilter extends ZuulFilter {
    @Override
    public String filterType() {
        return POST_TYPE;
    }

    @Override
    public int filterOrder() {
        return SEND_RESPONSE_FILTER_ORDER - 1;
    }

    @Override
    public boolean shouldFilter() {
        return true;
    }

    @Override
    public Object run() {
        RequestContext requestContext = RequestContext.getCurrentContext();
        HttpServletResponse response = requestContext.getResponse();

        MyUserDetail myUserDetail = (MyUserDetail) SecurityContextHolder.getContext()
                .getAuthentication()
                .getPrincipal();

        String myDefined = myUserDetail.getMyDefined();

        Cookie cookie1 = new Cookie("myDefined", myDefined);
        Cookie cookie2 = new Cookie("name", "zhangsan");
        Cookie cookie3 = new Cookie("age", "13");
        response.addCookie(cookie1);
        response.addCookie(cookie2);
        response.addCookie(cookie3);

        return null;
    }
}
