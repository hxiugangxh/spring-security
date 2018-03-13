package com.hxg.swagger;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

@ApiModel
public class SwaggerBean {
    @ApiModelProperty(value = "模型参数描述信息")
    private Integer id;
    @ApiModelProperty(value = "姓名")
    private String name;
    @ApiModelProperty(value = "年龄")
    private Integer age;
    /* 参数隐藏写法 */
    @ApiModelProperty(hidden = true)
    private String hiddeValue;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public String getHiddeValue() {
        return hiddeValue;
    }

    public void setHiddeValue(String hiddeValue) {
        this.hiddeValue = hiddeValue;
    }
}
