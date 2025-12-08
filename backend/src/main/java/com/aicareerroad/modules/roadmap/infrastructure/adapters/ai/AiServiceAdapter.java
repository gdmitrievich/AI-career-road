package com.aicareerroad.modules.roadmap.infrastructure.adapters.ai;

import com.aicareerroad.modules.roadmap.domain.services.AiService;
import com.aicareerroad.modules.roadmap.infrastructure.adapters.ai.dtos.ParsedVacancyData;
import com.aicareerroad.modules.roadmap.web.dtos.RoadmapResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class AiServiceAdapter implements AiService {
  private static final Logger logger = LoggerFactory.getLogger(AiServiceAdapter.class);
  private final AiServiceAdaptee aiServiceAdaptee;

  public AiServiceAdapter(AiServiceAdaptee aiServiceAdaptee) {
    this.aiServiceAdaptee = aiServiceAdaptee;
  }

  @Override
  public ParsedVacancyData parseRequiredVacancyData(String vacancyAnalysisPrompt) {
    PromptFormatter<ParsedVacancyData> promptFormatter = new PromptFormatter<>(ParsedVacancyData.class);
    String preparedPrompt = promptFormatter.addFormatRequirements(vacancyAnalysisPrompt);
    String response = aiServiceAdaptee.process(preparedPrompt);
    logger.debug("The AI response containing the parsed vacancy data: \n{}", response);
    return promptFormatter.convert(response);
  }

  @Override
  public String generateRoadmap(String roadmapDataGeneratorPrompt) {
    PromptFormatter<RoadmapResponse> promptFormatter = new PromptFormatter<>(RoadmapResponse.class);
    String preparedPrompt = promptFormatter.addFormatRequirements(roadmapDataGeneratorPrompt);
    String response = aiServiceAdaptee.process(preparedPrompt);
    logger.debug("The AI response containing the generated roadmap data: \n{}", response);

    // TODO: Move validation logic of the JSON object to another class.
    try {
      promptFormatter.convert(response);
    } catch (Exception e) {
      response = response + "\n}";
      logger.debug("Additional '}' was added in the end of AI response");
    }
    return response;
  }
}
