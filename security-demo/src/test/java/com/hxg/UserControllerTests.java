package com.hxg;

import com.alibaba.fastjson.JSON;
import com.hxg.bean.User;
import com.hxg.dao.UserDao;
import org.apache.commons.lang.builder.ReflectionToStringBuilder;
import org.apache.commons.lang.builder.ToStringStyle;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = SecurityDemoApplication.class)
public class UserControllerTests {

    @Autowired
    private WebApplicationContext wac;

    private MockMvc mockMvc;

    @Before
    public void setup() {
        mockMvc = MockMvcBuilders.webAppContextSetup(wac).build();
    }

    @Test
    public void whenQuerySuccess() throws Exception {
        String contentAsString = mockMvc.perform(MockMvcRequestBuilders.get("/user")
                        .contentType(MediaType.APPLICATION_JSON_UTF8)
                        .param("username", "test")
                        .param("size", "15")
                        .param("page", "3")
//                .param("sort", "age,desc")
        )
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.size()").value(3))
                .andReturn().getResponse().getContentAsString();

        System.out.println("contentAsString = " + contentAsString);
    }

    @Test
    public void whenGetInfoSuceess() throws Exception {
        String url = "/user/1";
        String str = mockMvc.perform(MockMvcRequestBuilders.get(url).contentType(MediaType.APPLICATION_JSON_UTF8))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.username").value("tom"))
                .andReturn().getResponse().getContentAsString();

        System.out.println("str = " + str);
    }

    @Test
    public void whenGetInfoFail() throws Exception {
        String url = "/user/a";
        mockMvc.perform(MockMvcRequestBuilders.get(url).contentType(MediaType.APPLICATION_JSON_UTF8))
                .andExpect(MockMvcResultMatchers.status().is4xxClientError());
    }

    @Test
    public void whenCreateSuccess() throws Exception {
        String url = "/user";
        String date = new Date().getTime() + "";

        String content = "{\"username\":\"tom\",\"pwd\":\"123456\",\"date\":\"" + date + "\"}";

        String contentAsString = mockMvc.perform(MockMvcRequestBuilders.post(url).contentType(MediaType
                .APPLICATION_JSON_UTF8)
                .content(content))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.id").value(1))
                .andReturn().getResponse().getContentAsString();

        System.out.println(contentAsString);
    }

    @Test
    public void whenUpdateSuccess() throws Exception {
        String url = "/user/1";
        String date = new Date(LocalDateTime.now().plusYears(1).atZone(ZoneId.systemDefault()).toInstant()
                .toEpochMilli()).getTime() + "";
        String content = "{\"id\":\"1\",\"username\":\"tom\",\"pwd\":\"123456\",\"date\":\"" + date + "\"}";
        String contentAsString = mockMvc.perform(MockMvcRequestBuilders.put(url).contentType(MediaType
                .APPLICATION_JSON_UTF8)
                .content(content))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.id").value(1))
                .andReturn().getResponse().getContentAsString();

        System.out.println("contentAsString = " + contentAsString);
    }

    @Test
    public void whenDeleteSuccess() throws Exception {
        String url = "/user/1";
        String contentAsString = mockMvc.perform(MockMvcRequestBuilders.delete(url).contentType(MediaType
                .APPLICATION_JSON_UTF8))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andReturn().getResponse().getContentAsString();

        System.out.println(contentAsString);

    }

}
