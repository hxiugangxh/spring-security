package com.hxg.security.validate.core;

import org.springframework.web.context.request.ServletWebRequest;

public interface ValidateCodeGenerator {
    ImageCode createImageCode(ServletWebRequest request);
}
