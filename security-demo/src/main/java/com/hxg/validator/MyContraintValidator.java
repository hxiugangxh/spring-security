package com.hxg.validator;

import com.hxg.bean.User;
import com.hxg.service.UserService;
import com.hxg.service.impl.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.List;

public class MyContraintValidator implements ConstraintValidator<MyContraint, Object> {

    @Override
    public void initialize(MyContraint myContraint) {
        System.out.println("my validator init");
    }

    @Override
    public boolean isValid(Object o, ConstraintValidatorContext constraintValidatorContext) {

        UserService userService = new UserServiceImpl();
        String msg = userService.greet("tom");
        System.out.println(msg);

        return true;
    }
}
