package com.hxg.controller;

import com.fasterxml.jackson.annotation.JsonView;
import com.hxg.bean.User;
import com.hxg.dao.UserDao;
import com.hxg.security.core.properties.SecurityProperties;
import com.hxg.service.UserService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang.StringUtils;
import org.apache.commons.lang.builder.ReflectionToStringBuilder;
import org.apache.commons.lang.builder.ToStringStyle;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import javax.validation.constraints.Size;
import javax.xml.ws.RespectBinding;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/user")
@Slf4j
public class UserController {

    @Autowired
    private UserDao userDao;

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
        String token = StringUtils.substringAfter(header, "bearer");
        Claims claims = Jwts.parser().setSigningKey(securityProperties.getOauth2()
                .getJwtSigningKey().getBytes("utf-8"))
                .parseClaimsJws(token).getBody();

        String company = claims.get("company") + "";

        log.info("company = " + company);

        return authentication;
    }

    @JsonView(User.UserSimpleView.class)
    @GetMapping
    public List<User> query(
            @RequestParam(value = "username", required = false, defaultValue = "haha") String username,
            @PageableDefault(page = 1, size = 15, sort = {"age"}, direction = Sort.Direction.DESC)
                    Pageable pageable) {

       /* System.out.println(pageable.getPageNumber());
        System.out.println(pageable.getPageSize());
        System.out.println(pageable.getSort());*/

        List<User> userList = new ArrayList<>();

        User user1 = new User("zhangsan1", "123456", "12");
        User user2 = new User("zhangsan2", "123456", "22");
        User user3 = new User("zhangsan3", "123456", "33");

        userList.add(user1);
        userList.add(user2);
        userList.add(user3);

        System.out.println("username = " + username);

        return userList;
    }

    @JsonView(User.UserDetailView.class)
    @GetMapping("/{id:\\d+}")
    public User getInfo(@PathVariable Integer id) {
        User user = new User();
        user.setUsername("tom");
        user.setPwd("123456");

        return user;
    }

    @PostMapping
    public User create(@Valid @RequestBody User user, BindingResult errors) {

        if (errors.hasErrors()) {
            errors.getAllErrors().stream().forEach(error ->
                    System.out.println(error.getDefaultMessage()));
        }

        user.setId(1);
        System.out.println("getUser = " + ReflectionToStringBuilder.toString(user, ToStringStyle.MULTI_LINE_STYLE));

        return user;
    }

    @PutMapping("/{id:\\d+}")
    public User update(@Valid @RequestBody User user, BindingResult errors) {

        if (errors.hasErrors()) {
            errors.getAllErrors().stream().forEach(error -> {
               FieldError fieldError = (FieldError) error;
                System.out.println(fieldError.getField() + ": " + fieldError.getDefaultMessage());
            });
        }

        user.setId(1);
        System.out.println("getUser = " + ReflectionToStringBuilder.toString(user, ToStringStyle.MULTI_LINE_STYLE));

        return user;
    }

    @DeleteMapping("/{id:\\d+}")
    @ResponseBody
    public void delete(@PathVariable("id") Integer id) {
        userDao.delete(id);
    }

    @GetMapping("/userByIdIn")
    @ResponseBody
    public List<User> userByIdIn() {
        List<User> userList = userDao.findByIdIn(Arrays.asList(new Integer[] {1, 2, 3, 4}));

        return userList;
    }
}
