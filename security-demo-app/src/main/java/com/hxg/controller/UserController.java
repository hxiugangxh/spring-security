package com.hxg.controller;

import com.hxg.security.core.properties.SecurityProperties;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/user")
@Slf4j
public class UserController {


    @Autowired
    private SecurityProperties securityProperties;

    @Autowired
    private StringRedisTemplate stringRedisTemplate;

    @GetMapping("/me")
    public Object me(Authentication authentication, HttpServletRequest request) throws Exception {

        log.info("获取用户信息-2");
        log.info(securityProperties.getOauth2().getJwtSigningKey());
        stringRedisTemplate.opsForValue().set("redis", "获取用户信息");
        String header = request.getHeader("Authorization");

        System.out.println(SecurityContextHolder.getContext().getAuthentication());

        String token = StringUtils.substringAfter(header, "bearer");
//        Claims claims = Jwts.parser().setSigningKey(securityProperties.getOauth2()
//                .getJwtSigningKey().getBytes("utf-8"))
//                .parseClaimsJws(token).getBody();
//
//        String company = claims.get("company") + "";
//
//        log.info("company = " + company);

        return authentication;
    }

}
