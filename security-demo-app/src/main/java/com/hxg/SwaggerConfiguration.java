package com.hxg;


import com.google.common.base.Predicate;
import com.google.common.base.Predicates;
import com.google.common.collect.Lists;
import com.hxg.security.core.properties.OAuth2ClientProperties;
import com.hxg.security.core.properties.SecurityProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.OAuthBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.*;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spi.service.contexts.SecurityContext;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger.web.ApiKeyVehicle;
import springfox.documentation.swagger.web.SecurityConfiguration;
import springfox.documentation.swagger.web.SecurityConfigurationBuilder;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import java.util.ArrayList;
import java.util.List;

import static com.google.common.collect.Lists.newArrayList;
import static springfox.documentation.builders.PathSelectors.regex;

@Configuration
@EnableSwagger2
public class SwaggerConfiguration {

    @Autowired
    private SecurityProperties securityProperties;

    @Bean
    public Docket postsApi() {
        return new Docket(DocumentationType.SWAGGER_2)
                .apiInfo(apiInfo())
                .select()
//                .paths(postPaths())
                .apis(RequestHandlerSelectors.basePackage("com.hxg.swagger"))
                .paths(springBootActuatorJmxPaths())
                .build()
                .securitySchemes(Lists.newArrayList(oauth()))
                .securityContexts(Lists.newArrayList(securityContext()))
                ;
    }

    public enum SchemaName {
        basic,
        password,
        client
    }

//    private Predicate<String> postPaths() {
//        return regex("/api.*");
//    }

    private Predicate<String> springBootActuatorJmxPaths() {
        return regex("^/(?!env|restart|pause|resume|refresh).*$");
    }

    private ApiInfo apiInfo() {
        return new ApiInfoBuilder().title("swagger").description("swaggerUI简单示范").build();
    }

    private SecurityContext securityContext() {
        return SecurityContext.builder()
                .securityReferences(defaultAuth())
                .forPaths(PathSelectors.ant("/api/**"))//配置哪些url需要做oauth2认证
                .build();
    }

    List<SecurityReference> defaultAuth() {
        return Lists.newArrayList(
                new SecurityReference(SchemaName.password.name(), scopes().toArray(new AuthorizationScope[0])));
    }

    SecurityScheme oauth() {
        return new OAuthBuilder()
                .name(SchemaName.password.name())
                .scopes(scopes())
                .grantTypes(newArrayList(new ResourceOwnerPasswordCredentialsGrant("/oauth/token")))
                .build();
    }

    private List<AuthorizationScope> scopes() {
        List<AuthorizationScope> list = new ArrayList();
        list.add(new AuthorizationScope("all", "Grants all access"));
        list.add(new AuthorizationScope("read", "Grants read access"));
        list.add(new AuthorizationScope("write", "Grants write access"));
        return list;
    }

    @Bean
    public SecurityConfiguration securityInfo() {
        OAuth2ClientProperties[] clients = securityProperties.getOauth2().getClients();

        return SecurityConfigurationBuilder.builder()
                .useBasicAuthenticationWithAccessCodeGrant(true)
                .clientId(clients[0].getClientId())
                .clientSecret(clients[0].getClientSecret())
                .scopeSeparator(",")
                .build();
    }
}


