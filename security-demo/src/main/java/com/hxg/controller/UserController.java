package com.hxg.controller;

import com.hxg.bean.User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class UserController {

    @GetMapping("/user")
    public String query() {

        List<User> userList = new ArrayList<>();

        User user1 = new User("zhangsan", "22");
        User user2 = new User("zhangsan", "22");
        User user3 = new User("zhangsan", "22");

        userList.add(user1);
        userList.add(user2);
        userList.add(user3);

        return userList.toString();
    }


}
