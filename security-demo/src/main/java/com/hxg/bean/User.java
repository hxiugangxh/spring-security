package com.hxg.bean;

import com.fasterxml.jackson.annotation.JsonView;
import lombok.Data;
import org.hibernate.validator.constraints.NotBlank;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.validation.constraints.Past;
import java.io.Serializable;
import java.util.Date;

@Entity
public class User implements Serializable  {

    public interface UserSimpleView {};
    public interface UserDetailView extends UserSimpleView {};

    @Id @GeneratedValue
    private Integer id;

    private String username;

    private String pwd;

    @NotBlank(message = "年龄不能为空")
    private String age;

    @Past(message = "日期不能为未来")
    private Date date;

    public User() {}

    public User(String username, String pwd, String age) {
        this.username = username;
        this.pwd = pwd;
        this.age = age;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    @JsonView(UserSimpleView.class)
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @JsonView(UserDetailView.class)
    public String getPwd() {
        return pwd;
    }

    public void setPwd(String pwd) {
        this.pwd = pwd;
    }

    public String getAge() {
        return age;
    }

    public void setAge(String age) {
        this.age = age;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }
}
