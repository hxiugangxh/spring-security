package com.hxg.base;


public class ResultUtil {

    private static <T> RestResult<T> createResult(Integer code, String msg, T data) {
        RestResult<T> result = RestResult.newInstance();

        result.setCode(code);
        result.setMsg(msg);
        result.setData(data);
        return result;
    }

    public static <T> RestResult<T> success() {
        return createResult(RestResult.CODE_OK, "操作成功", null);
    }

    public static <T> RestResult<T> success(T data) {
        return createResult(RestResult.CODE_OK, "操作成功", data);
    }

    public static <T> RestResult<T> success(String msg, T data) {
        return createResult(RestResult.CODE_OK, msg, data);
    }

    public static <T> RestResult<T> fail() {
        return createResult(RestResult.CODE_FAIL, "操作失败", null);
    }

    public static <T> RestResult<T> fail(String msg) {
        return createResult(RestResult.CODE_FAIL, msg, null);
    }

    public static <T> RestResult<T> fail(String msg, T data) {
        return createResult(RestResult.CODE_FAIL, msg, data);
    }

}
