package com.hxg.controller;

import com.sun.scenario.effect.impl.sw.sse.SSEBlend_SRC_OUTPeer;
import org.apache.commons.io.FileUtils;
import org.apache.commons.io.IOUtils;
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
import javax.servlet.http.HttpServletResponse;
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

    @RequestMapping(value = "/upload", method = RequestMethod.POST)
    @ResponseBody
    public String upload(@RequestParam("file") MultipartFile file, HttpServletRequest request) throws IOException {

        String toPath = "D://tmp//";
        String toName = "我定义的.txt";

        File pathFile = new File(toPath);
        if (!pathFile.exists()) {
            pathFile.mkdirs();
        }

        File localFile = new File(toPath + toName);

        if (localFile.exists()) {
            localFile.delete();
        }
        localFile.createNewFile();
        file.transferTo(localFile);

        File tempFile = new File(localFile.getAbsolutePath());
        FileUtils.copyInputStreamToFile(file.getInputStream(), tempFile);

        System.out.println(FileUtils.readLines(tempFile, "UTF-8"));

        return file.getOriginalFilename();
    }

    @RequestMapping("/download")
    public void download(HttpServletRequest request, HttpServletResponse response) {
        try (
                InputStream inputStream = new FileInputStream(new File("D:\\tmp\\我定义的.txt"));
                OutputStream outputStream = response.getOutputStream();
        ) {
            String fileName = new String("中文".getBytes("GB2312"), "ISO-8859-1");
            response.setContentType("application/x-download");
            response.addHeader("Content-Disposition", "attachment;filename="
                    + fileName + ".txt");
            IOUtils.copy(inputStream, outputStream);
            outputStream.flush();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}
