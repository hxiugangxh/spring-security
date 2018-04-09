package com.hxg.bean;

import org.apache.commons.lang.builder.ReflectionToStringBuilder;
import org.apache.commons.lang.builder.ToStringStyle;

public class ReflectBean {

    public static void main(String[] args) {
        ReflectBean reflectBean = new ReflectBean();
        reflectBean.setName("zhanhsan");
        reflectBean.setAge("12");
        System.out.println(ReflectionToStringBuilder.toString(reflectBean, ToStringStyle.SHORT_PREFIX_STYLE));
    }

    private String name;
    private String age;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAge() {
        return age;
    }

    public void setAge(String age) {
        this.age = age;
    }
}
