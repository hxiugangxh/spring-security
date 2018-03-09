package com.hxg.service;

import com.hxg.bean.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

public interface UserService extends JpaRepository<User, Integer> {
}
