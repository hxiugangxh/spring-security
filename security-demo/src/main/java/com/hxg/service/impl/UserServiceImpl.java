package com.hxg.service.impl;

import com.hxg.bean.User;
import com.hxg.dao.UserDao;
import com.hxg.service.UserService;
import org.hibernate.loader.custom.Return;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service("userService")
public class UserServiceImpl implements UserService {

    @Autowired
    private UserDao userDao;

    @Override
    public User saveUser(User user) {

        User user1 = userDao.save(user);

        System.out.println("user = " + user1);

        return user1;
    }

    @Override
    public List<User> saveBatch() {

        List<User> userList = new ArrayList<>();
        for (int i = 0 ; i < 10; i++) {
            User user = new User();
            user.setUsername("username" + i);
            user.setAge(i + "");

            userList.add(user);
        }

        return userDao.save(userList);
    }

    @Override
    public Page<User> userPage(Pageable pageable) {

        return userDao.findAll(pageable);
    }

    @Override
    public String greet(String name) {
        return "hello " + name;
    }
}
