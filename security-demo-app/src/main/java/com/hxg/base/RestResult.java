package com.hxg.base;

import lombok.Data;

@Data
public class RestResult<T> {
    public static final Integer CODE_OK = 1;
    public static final Integer CODE_FAIL = 0;

    public static <T> RestResult<T> newInstance() {
        return new RestResult<T>();
    }

    private Integer code;
    private String msg;
    private T data;
}
