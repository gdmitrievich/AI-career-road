package com.aicareerroad.modules.roadmap.infrastructure.adapters.ai;

import com.aicareerroad.modules.roadmap.domain.services.JsonDtoConverterService;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.chat.prompt.PromptTemplate;
import org.springframework.ai.converter.BeanOutputConverter;
import org.springframework.core.ParameterizedTypeReference;

public class PromptFormatter<T> implements JsonDtoConverterService<T> {
  private static final Logger logger = LoggerFactory.getLogger(PromptFormatter.class);
  private final BeanOutputConverter<T> outputConverter;
  private final Class<T> targetClass;

  public PromptFormatter(Class<T> targetClass) {
    this.targetClass = targetClass;
    this.outputConverter = new BeanOutputConverter<>(
      ParameterizedTypeReference.forType(targetClass)
    );
  }

  public String addFormatRequirements(String prompt) {
    String format = outputConverter.getFormat();
    logger.debug("Generated format requirements for {}: {}", this.targetClass.getSimpleName(), format);
    String template = prompt + "\n{format}";
    Prompt formattedPrompt = PromptTemplate.builder()
      .template(template)
      .variables(Map.of("format", format))
      .build()
      .create();
    return formattedPrompt.getContents();
  }

  @Override
  public T convert(String jsonContainingDtoData) {
    return outputConverter.convert(jsonContainingDtoData);
  }
}
