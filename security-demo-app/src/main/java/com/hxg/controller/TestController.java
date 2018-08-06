package com.hxg.controller;

import com.hxg.base.RestResult;
import com.hxg.base.ResultUtil;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;

@RestController
public class TestController {

    @GetMapping("/test")
    public RestResult<Object> test(HttpServletResponse response) {
        return ResultUtil.success("是我，没有错");
    }

}
