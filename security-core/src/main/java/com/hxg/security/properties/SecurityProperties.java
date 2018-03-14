package com.hxg.security.properties;

import com.sun.org.apache.bcel.internal.util.ClassPath;
import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

@ConfigurationProperties(prefix = "hxg.security")
@Data
public class SecurityProperties {

    private BrowserProperties browserProperties = new BrowserProperties();

}
