package com.hxg.swagger;

import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.Authorization;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class SwaggerController {

    @ApiOperation(value = "test basic-auth", authorizations = @Authorization("password"))
    @GetMapping("/basic")
    public String basic() {
        String name = SecurityContextHolder.getContext().getAuthentication().getName();
        return "from basicAuth: hello," + name;
    }

    @ApiOperation(value = "oauth2 password")
    @PostMapping("/{id:\\d+}")
    @ResponseBody
    public SwaggerBean swaggerBean(@PathVariable(value = "id", required = true) Integer id) {

        SwaggerBean swaggerBean = new SwaggerBean();

        swaggerBean.setId(id);
        swaggerBean.setName("张三");
        swaggerBean.setAge(13);

        return swaggerBean;
    }

    @GetMapping("/getSwaggerByParams")
    @ApiOperation("通过参数获取SwaggerBean")
    @ApiImplicitParams({
            @ApiImplicitParam(paramType = "query", dataType = "String",
                    name = "name", value = "姓名", required = true),
            @ApiImplicitParam(paramType = "body", dataType = "SwaggerBean",
                    name = "swaggerBean", value = "载体", required = true)
    })
    public SwaggerBean getSwaggerByParams(@RequestParam("name") String name,
                                          @RequestBody SwaggerBean swaggerBean) {
        SwaggerBean swaggerBean1 = new SwaggerBean();

        swaggerBean1.setId(1);
        swaggerBean1.setName("张三");
        swaggerBean1.setAge(13);

        return swaggerBean1;
    }
}
