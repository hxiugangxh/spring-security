package com.hxg.async;

import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang.RandomStringUtils;
import org.bouncycastle.pqc.math.linearalgebra.RandUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.async.DeferredResult;
import sun.reflect.generics.reflectiveObjects.LazyReflectiveObjectGenerator;

import java.util.concurrent.Callable;

@RestController
@Slf4j
@RequestMapping("/async")
public class AsyncController {

    @Autowired
    private MockQueue mockQueue;

    @Autowired
    private DeferredResultHolder deferredResultHolder;

    @GetMapping("/orderCallable")
    @ResponseBody
    public Callable<String> orderCallable() throws Exception {

        log.info("主线程开始");

        Callable<String> result = new Callable<String>() {
            @Override
            public String call() throws Exception {
                log.info("副线程开始");
                Thread.sleep(1000);
                log.info("副线程返回");
                return "success";
            }
        };

        log.info("主线程返回");

        return result;
    }

    @GetMapping("/orderDeferredResult")
    @ResponseBody
    public DeferredResult<String> orderDeferredResult() throws Exception {

        log.info("主线程开始");

        String orderNumber = RandomStringUtils.randomNumeric(8);
        mockQueue.setPlaceOrder(orderNumber);
        DeferredResult<String> deferredResult = new DeferredResult<>();

        deferredResultHolder.getMap().put(orderNumber, deferredResult);

        log.info("主线程返回");

        return deferredResult;
    }

}
