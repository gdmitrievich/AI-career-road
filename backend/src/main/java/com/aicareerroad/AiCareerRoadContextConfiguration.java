package com.aicareerroad;

import com.aicareerroad.modules.roadmap.domain.RoadmapModelFacade;
import com.aicareerroad.modules.roadmap.domain.services.AiRoadmapGeneratorService;
import com.aicareerroad.modules.roadmap.domain.services.AiService;
import com.aicareerroad.modules.roadmap.domain.services.JsonDtoConverterService;
import com.aicareerroad.modules.roadmap.domain.services.PromptBuilderService;
import com.aicareerroad.modules.roadmap.domain.services.RoadmapGeneratorService;
import com.aicareerroad.modules.roadmap.domain.services.RoadmapService;
import com.aicareerroad.modules.roadmap.domain.services.VacancyPageReaderService;
import com.aicareerroad.modules.roadmap.infrastructure.adapters.ai.AiServiceAdaptee;
import com.aicareerroad.modules.roadmap.infrastructure.adapters.ai.AiServiceAdapter;
import com.aicareerroad.modules.roadmap.infrastructure.adapters.ai.GigaChatService;
import com.aicareerroad.modules.roadmap.infrastructure.adapters.ai.PromptFormatter;
import com.aicareerroad.modules.roadmap.infrastructure.services.InMemoryPromptBuilderService;
import com.aicareerroad.modules.roadmap.infrastructure.services.JsoupVacancyPageReaderService;
import com.aicareerroad.modules.roadmap.web.dtos.RoadmapResponse;
import com.aicareerroad.modules.roadmap.web.requiredinterfaces.RoadmapModel;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AiCareerRoadContextConfiguration {
  // ------------- Roadmap module beans -------------

  @Bean
  public AiServiceAdaptee aiServiceAdaptee() {
    return new GigaChatService();
//    return new AiServiceMock(); // TODO: create actual object.
  }

  @Bean
  public AiService aiService() {
    return new AiServiceAdapter(aiServiceAdaptee());
  }

  @Bean
  public PromptBuilderService promptBuilderService() {
    return new InMemoryPromptBuilderService();
  }

  @Bean
  public VacancyPageReaderService vacancyPageReaderService() {
    return new JsoupVacancyPageReaderService();
//    return new MockVacancyPageReaderService(); // TODO: create actual object.
  }

  @Bean
  public RoadmapGeneratorService roadmapGeneratorService() {
    return new AiRoadmapGeneratorService(aiService(), promptBuilderService(), vacancyPageReaderService());
  }

  @Bean
  public RoadmapService roadmapService(RoadmapGeneratorService roadmapGeneratorService) {
    return new RoadmapService(roadmapGeneratorService);
  }

  @Bean
  public JsonDtoConverterService jsonDtoConverterService() {
    return new PromptFormatter<RoadmapResponse>(RoadmapResponse.class);
  }

  @Bean
  public RoadmapModel roadmapModel() {
    return new RoadmapModelFacade(roadmapService(roadmapGeneratorService()), jsonDtoConverterService());
  }
}