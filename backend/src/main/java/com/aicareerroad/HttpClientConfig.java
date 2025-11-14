package com.aicareerroad;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.web.client.RestTemplate;

@Configuration
public class HttpClientConfig {

  /**
   * Sets the read timeout.
   */
  @Bean
  public RestTemplate restTemplate() {
    RestTemplate restTemplate = new RestTemplate();

//    HttpComponentsClientHttpRequestFactory factory =
//      new HttpComponentsClientHttpRequestFactory();
    SimpleClientHttpRequestFactory factory = new SimpleClientHttpRequestFactory();
    factory.setConnectTimeout(300000);
    factory.setReadTimeout(300000);

    restTemplate.setRequestFactory(factory);
    return restTemplate;
  }
}