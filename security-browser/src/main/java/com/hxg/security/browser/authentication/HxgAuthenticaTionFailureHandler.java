package com.hxg.security.browser.authentication;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.hxg.security.browser.SimpleResponse;
import com.hxg.security.properties.LoginType;
import com.hxg.security.properties.SecurityProperties;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component("hxgAuthenticaTionFailureHandler")
@Slf4j
public class HxgAuthenticaTionFailureHandler extends SimpleUrlAuthenticationFailureHandler {

    @Autowired
    private ObjectMapper objectMaper;

    @Autowired
    private SecurityProperties securityProperties;

    @Override
    public void onAuthenticationFailure(HttpServletRequest httpServletRequest,
                                        HttpServletResponse httpServletResponse,
                                        AuthenticationException e) throws IOException,
            ServletException {
        log.info("登录失败");

        if (LoginType.JSON.equals(securityProperties.getBrowserProperties().getLoginType())) {
            httpServletResponse.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.value());
            httpServletResponse.setContentType("application/json;charset=utf-8");
            System.out.println("我看看 = " + objectMaper.writeValueAsString(e));
            httpServletResponse.getWriter().write(objectMaper.writeValueAsString(new
                    SimpleResponse(e.getMessage())));
        } else {
            super.onAuthenticationFailure(httpServletRequest, httpServletResponse, e);
        }


    }
}
