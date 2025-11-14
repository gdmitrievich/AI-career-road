package com.aicareerroad.modules.roadmap.infrastructure.adapters.ai.requiredinterfacesimpl;

import com.aicareerroad.modules.roadmap.domain.requiredinterfaces.AiService;
import com.aicareerroad.modules.roadmap.infrastructure.adapters.ai.AiServiceAdaptee;
import com.aicareerroad.modules.roadmap.infrastructure.adapters.ai.dtos.ParsedVacancyData;
import com.aicareerroad.modules.roadmap.web.dtos.RoadmapResponse;
import java.util.Map;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.chat.prompt.PromptTemplate;
import org.springframework.ai.converter.BeanOutputConverter;
import org.springframework.core.ParameterizedTypeReference;

public class AiServiceAdapter implements AiService {
  private final AiServiceAdaptee aiServiceAdaptee;

  public AiServiceAdapter(AiServiceAdaptee aiServiceAdaptee) {
    this.aiServiceAdaptee = aiServiceAdaptee;
  }

  @Override
  public ParsedVacancyData parseRequiredVacancyData(String vacancyAnalysisPrompt) {
    String preparedPrompt = addOutputFormatRequirementsForParsedVacancyData(vacancyAnalysisPrompt);
    p("preparedPrompt (of parseRequiredVacancyData()): " + preparedPrompt);
    String result = aiServiceAdaptee.process(preparedPrompt);
    p("result (AI response): " + result);
    ParsedVacancyData parsedVacancyData = convertResultStringToParsedVacancyData(result);
    p("parsedVacancyData: " + parsedVacancyData);
    return parsedVacancyData;
  }

  // TODO: DRY!
  private String addOutputFormatRequirementsForParsedVacancyData(String vacancyAnalysisPrompt) {
    // TODO: DRY!
    BeanOutputConverter<ParsedVacancyData> outputConverter = new BeanOutputConverter<>(
      new ParameterizedTypeReference<ParsedVacancyData>() {
      });

    String format = outputConverter.getFormat();
    String template = vacancyAnalysisPrompt + "\n{format}";
    Prompt prompt = PromptTemplate.builder().template(template).variables(Map.of("format", format)).build().create();
    return prompt.getContents();
  }

  // TODO: DRY!
  private ParsedVacancyData convertResultStringToParsedVacancyData(String result) {
    // TODO: DRY!
    BeanOutputConverter<ParsedVacancyData> outputConverter = new BeanOutputConverter<>(
      new ParameterizedTypeReference<ParsedVacancyData>() {
      });
    return outputConverter.convert(result);
  }

  // TODO: DRY!
  @Override
  public RoadmapResponse generateRoadmapData(String roadmapDataGeneratorPrompt) {
    String preparedPrompt = addOutputFormatRequirementsForRoadmapResponse(roadmapDataGeneratorPrompt);
    p("preparedPrompt (of generateRoadmapData()): " + preparedPrompt);
    String result = aiServiceAdaptee.process(preparedPrompt);
    p("result (AI response): " + result);
    // TODO: Move validation logic of the JSON object to another class.
    RoadmapResponse roadmapResponse = null;
    try {
      roadmapResponse = convertResultStringToRoadmapResponse(result);
    } catch (Exception e) {
      result = result + "\n}";
      roadmapResponse = convertResultStringToRoadmapResponse(result);
    }
    p("roadmapResponse: " + roadmapResponse);
    return roadmapResponse;
  }

  // TODO: DRY!
  private String addOutputFormatRequirementsForRoadmapResponse(String roadmapDataGeneratorPrompt) {
    // TODO: DRY!
    BeanOutputConverter<RoadmapResponse> outputConverter = new BeanOutputConverter<>(
      new ParameterizedTypeReference<RoadmapResponse>() {
      });

    String format = outputConverter.getFormat();
    String template = roadmapDataGeneratorPrompt + "\n{format}";
    Prompt prompt = PromptTemplate.builder().template(template).variables(Map.of("format", format)).build().create();
    return prompt.getContents();
  }

  private RoadmapResponse convertResultStringToRoadmapResponse(String result) {
    BeanOutputConverter<RoadmapResponse> outputConverter = new BeanOutputConverter<>(
      new ParameterizedTypeReference<RoadmapResponse>() {
      });
    return outputConverter.convert(result);
  }

  // TODO: REMOVE.
  private void p(String message) {
    System.out.println("aicareerroad [AiServiceAdapter]: " + message);
  }
}
