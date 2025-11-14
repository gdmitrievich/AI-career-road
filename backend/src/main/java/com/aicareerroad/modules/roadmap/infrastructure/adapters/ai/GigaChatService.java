package com.aicareerroad.modules.roadmap.infrastructure.adapters.ai;

import chat.giga.client.GigaChatClient;
import chat.giga.client.auth.AuthClient;
import chat.giga.client.auth.AuthClientBuilder.OAuthBuilder;
import chat.giga.http.client.HttpClientException;
import chat.giga.model.ModelName;
import chat.giga.model.Scope;
import chat.giga.model.completion.ChatMessage;
import chat.giga.model.completion.ChatMessageRole;
import chat.giga.model.completion.CompletionRequest;
import chat.giga.model.completion.CompletionResponse;
import java.net.http.HttpClient;
import java.time.Duration;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class GigaChatService implements AiServiceAdaptee {
  @Value("${api.key}")
  private String apiKey;

  private GigaChatClient client;

  public GigaChatService() {
    // TODO: Remove API_KEY from application.properties.
    apiKey = System.getenv("API_KEY"); // instead of apiKey == null ? System.getenv("API_KEY") : apiKey

    // Создаем кастомный HTTP клиент с увеличенными таймаутами
    HttpClient httpClient = HttpClient.newBuilder()
      .connectTimeout(Duration.ofMinutes(5))
      .followRedirects(HttpClient.Redirect.NORMAL)
      .build();

    this.client = GigaChatClient.builder()
      // Check for certificates now is turned off.
      .verifySslCerts(false)
      .authClient(AuthClient.builder()
        .withOAuth(OAuthBuilder.builder()
          .scope(Scope.GIGACHAT_API_PERS)
          .authKey(apiKey)
          .build())
        .build())
      .connectTimeout(300000) // Possibly in seconds.
      .readTimeout(300000) // Possibly in seconds.
      .build();
  }

  @Override
  public String process(String prompt) {
    try {
      CompletionResponse response = client.completions(CompletionRequest.builder()
        .model(ModelName.GIGA_CHAT_2)
        .message(ChatMessage.builder()
          .content(prompt)
          .role(ChatMessageRole.USER)
          .build())
        .maxTokens(10000)
        .build());
      return response.choices().getFirst().message().content();
    } catch (HttpClientException ex) {
      System.out.println("aicareerroad [GigaChatClient]: " + ex.statusCode() + " " + ex.bodyAsString());
    }
    return null;
  }

  // TODO: REMOVE.
  private void p(String message) {
    System.out.println("aicareerroad [GigaChatService]: " + message);
  }
}
