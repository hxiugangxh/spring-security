package com.hxg.controller;

import com.alibaba.fastjson.JSON;
import com.hxg.aspect.exception.ResultEnum;
import com.hxg.aspect.exception.UserException;
import com.hxg.bean.User;
import com.hxg.dao.UserDao;
import com.hxg.service.UserService;
import jdk.nashorn.internal.runtime.JSONFunctions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.jws.soap.SOAPBinding;
import java.util.List;

@Controller
@RequestMapping("/jpa/user")
public class JpaUserContorller {

    @Autowired
    private UserService userService;

    @Autowired
    private UserDao userDao;

    @RequestMapping("/exceptionHandler")
    public String exceptionHandler() {
        throw new UserException(ResultEnum.TEST_EXCEPTION);
    }

    @RequestMapping("/save")
    @ResponseBody
    public User save() {

        User user = new User();
        user.setPwd("123456");
        user.setAge("12");

        User user1 = userService.saveUser(user);

        return user;
    }

    @RequestMapping("saveBatch")
    @ResponseBody
    public List<User> saveBatch() {

        List<User> userList = userService.saveBatch();

        return userList;
    }

    @RequestMapping("userPage")
    @ResponseBody
    public Page<User> userPage(@PageableDefault(page = 0, size = 5, sort = "id", direction = Sort.Direction.DESC)
                                           Pageable pageable) {

        return userService.userPage(pageable);
    }

    @RequestMapping("/{id:\\d+}")
    @ResponseBody
    public String user(@PathVariable("id") Integer id){

        String string = JSON.toJSONString(userDao.getOne(id));

        System.out.println(string);

        return string;
    }


}
