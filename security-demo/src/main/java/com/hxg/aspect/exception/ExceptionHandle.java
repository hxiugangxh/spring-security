package com.hxg.aspect.exception;

import com.hxg.bean.User;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

@ControllerAdvice
@Slf4j
public class ExceptionHandle {

    @ExceptionHandler(value = Exception.class)
    @ResponseBody
    public Result handle(Exception e) {
        if (e instanceof UserException) {
            UserException userException = (UserException) e;

            return ResultUtil.error(userException.getCode(), userException.getMessage());
        } else {
            log.info("[系统异常]{}", e);
            return ResultUtil.error(-1, "未知错误");
        }
    }

}
