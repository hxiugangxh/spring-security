package com.hxg.security.controller;

import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang.StringUtils;
import org.springframework.security.web.DefaultRedirectStrategy;
import org.springframework.security.web.RedirectStrategy;
import org.springframework.security.web.savedrequest.HttpSessionRequestCache;
import org.springframework.security.web.savedrequest.RequestCache;
import org.springframework.security.web.savedrequest.SavedRequest;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Controller
@Slf4j
@RequestMapping("/security")
public class SecurityController {

    @RequestMapping("/index")
    public String login(HttpServletRequest request, HttpServletResponse response) throws Exception {

        log.info("securty index");

        return "security/index";
    }

    @RequestMapping("/form")
    public String form() {

        log.info("登录成功");

        return "security/form";
    }

}
