package com.hxg.service;

import com.hxg.bean.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

import java.util.List;

public interface UserService {

    User saveUser(User user);

    List<User> saveBatch();

    Page<User> userPage(Pageable pageable);

    String greet(String name);
}
