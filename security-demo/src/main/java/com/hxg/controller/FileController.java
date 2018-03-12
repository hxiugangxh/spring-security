package com.hxg.controller;

import com.sun.scenario.effect.impl.sw.sse.SSEBlend_SRC_OUTPeer;
import org.apache.commons.io.FileUtils;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartResolver;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;

import javax.servlet.http.HttpServletRequest;
import java.io.*;
import java.lang.management.LockInfo;
import java.util.ArrayList;
import java.util.List;

@Controller
public class FileController {

    @RequestMapping("/file")
    public String file() {

        System.out.println("file");

        return "file";
    }

    public static void main(String[] args) throws Exception {
        System.out.println(read(new File("D://记录.txt")));
    }

    @RequestMapping(value = "/upload", method = RequestMethod.POST)
    @ResponseBody
    public String upload(@RequestParam("file") MultipartFile file, HttpServletRequest request) throws IOException {

        File localFile = new File("D://tmp//我定义的.txt");

        localFile.createNewFile();
        file.transferTo(localFile);

        String filePath = request.getSession().getServletContext().getRealPath("/") + "upload/";
        String path = filePath + file.getOriginalFilename();
        File tempFile = new File(path);
        FileUtils.copyInputStreamToFile(file.getInputStream(), tempFile);

        System.out.println(read(tempFile));

        return file.getName();
    }

    public static List<String> read(File path) {
        List<String> list = new ArrayList<String>();
        BufferedReader br = null;
        try {
            br = new BufferedReader(new FileReader(path));
            String str = br.readLine();
            while (str != null) {
                list.add(str);
                str = br.readLine();
            }
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (br != null) {
                try {
                    br.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }

        return list;
    }

}
