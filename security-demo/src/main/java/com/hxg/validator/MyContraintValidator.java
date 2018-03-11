package com.hxg.validator;

import com.hxg.bean.User;
import com.hxg.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class MyContraintValidator implements ConstraintValidator<MyContraint, Object> {

    @Autowired
    private UserService userService;

    @Override
    public void initialize(MyContraint myContraint) {
        System.out.println("my validator init");
    }

    @Override
    public boolean isValid(Object o, ConstraintValidatorContext constraintValidatorContext) {

        String msg = userService.greet("tom");
        System.out.println(msg);

        return false;
    }
}
