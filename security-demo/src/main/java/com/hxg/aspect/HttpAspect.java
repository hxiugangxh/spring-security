package com.hxg.aspect;

import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.*;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;

@Aspect
@Component
@Slf4j
public class HttpAspect {

    @Pointcut("execution(public * com.hxg.controller.JpaUserContorller.*(..))")
    public void log() {

    }

    @Before("log()")
    public void doBefore(JoinPoint joinPoint) {
        ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        HttpServletRequest request = attributes.getRequest();

        //url
        log.info("url={}", request.getRequestURI());

        //method
        log.info("method={}", request.getMethod());

        //ip
        log.info("ip={}", request.getRemoteAddr());

        //类方法
        log.info("class_method={}", joinPoint.getSignature().getDeclaringTypeName() + "." + joinPoint.getSignature
                ().getName());

        //参数
        log.info("args={}", joinPoint.getArgs());
    }

    @Around("log()")
    public Object doAround(ProceedingJoinPoint joinPoint) throws Throwable {
        long start = System.currentTimeMillis();
        Object result = joinPoint.proceed();
        long end = System.currentTimeMillis();

        log.info("请求耗时记录：" + joinPoint.getSignature().getName() + ": " + (end - start));

        return result;
    }

    @After("log()")
    public void doAfter() {
        log.info("222222222222");
    }

    @AfterReturning(returning = "object", pointcut = "log()")
    public void doAfterReturning(Object object) {
        log.info("response={}", object.toString());
    }

}

