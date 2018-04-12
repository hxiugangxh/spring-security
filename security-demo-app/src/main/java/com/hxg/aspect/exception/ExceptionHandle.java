package com.hxg.aspect.exception;

import com.hxg.bean.User;
import com.hxg.security.core.validate.core.ValidateCodeException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
@Slf4j
public class ExceptionHandle {

    @ExceptionHandler(value = Exception.class)
    @ResponseBody
    public Result handle(Exception e) {
        if (e instanceof UserException) {
            UserException userException = (UserException) e;

            return ResultUtil.error(userException.getCode(), userException.getMessage());
        } else if (e instanceof ValidateCodeException) {
            ValidateCodeException validateCodeException = (ValidateCodeException) e;

            return ResultUtil.error(-2, validateCodeException.getMessage());
        } else {
            log.info("[系统异常]{}", e);
            return ResultUtil.error(-1, "未知错误");
        }
    }

}
