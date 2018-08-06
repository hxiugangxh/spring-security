package com.hxg.controller;

import com.hxg.base.RestResult;
import com.hxg.base.ResultUtil;
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
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/user")
@Slf4j
public class UserController {


    @Autowired
    private SecurityProperties securityProperties;

    @Autowired
    private StringRedisTemplate stringRedisTemplate;

    @GetMapping("/me")
    public RestResult<Authentication> me(Authentication authentication) throws Exception {

        return ResultUtil.success(authentication);
    }

    @GetMapping("/info")
    public Map<String, Object> info(Authentication authentication) throws Exception {

        Map<String, Object> map = new HashMap<>();

        map.put("userName", authentication.getName());
        return map;
    }

}
