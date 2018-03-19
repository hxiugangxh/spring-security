package com.hxg.security.properties;

import lombok.Data;

@Data
public class BrowserProperties {

    private String loginPage = "/browser-login.html";

    private LoginType loginType = LoginType.JSON;

    private int rememberMeSeconds = 3600;
}
