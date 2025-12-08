package com.aicareerroad.modules.roadmap.infrastructure.adapters.ai;

import chat.giga.client.GigaChatClient;
import chat.giga.client.auth.AuthClient;
import chat.giga.client.auth.AuthClientBuilder.OAuthBuilder;
import chat.giga.model.ModelName;
import chat.giga.model.Scope;
import chat.giga.model.completion.ChatMessage;
import chat.giga.model.completion.ChatMessageRole;
import chat.giga.model.completion.CompletionRequest;
import chat.giga.model.completion.CompletionResponse;
import java.net.http.HttpClient;
import java.time.Duration;
import org.springframework.stereotype.Component;

@Component
public class GigaChatService implements AiServiceAdaptee {
  private String apiKey;

  private GigaChatClient client;

  public GigaChatService() {
    apiKey = System.getenv("API_KEY");

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
    CompletionResponse response = client.completions(CompletionRequest.builder()
      .model(ModelName.GIGA_CHAT_2)
      .message(ChatMessage.builder()
        .content(prompt)
        .role(ChatMessageRole.USER)
        .build())
      .maxTokens(10000)
      .build());
    return response.choices().getFirst().message().content();
  }
}
