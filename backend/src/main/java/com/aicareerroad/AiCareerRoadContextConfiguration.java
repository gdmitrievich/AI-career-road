package com.aicareerroad;

import com.aicareerroad.commons.validators.ApacheUrlValidator;
import com.aicareerroad.commons.validators.UrlValidator;
import com.aicareerroad.modules.roadmap.domain.entities.RoadmapGenerator;
import com.aicareerroad.modules.roadmap.domain.entities.RoadmapGeneratorImpl;
import com.aicareerroad.modules.roadmap.domain.requiredinterfaces.AiService;
import com.aicareerroad.modules.roadmap.domain.requiredinterfacesimpl.RoadmapModelFacade;
import com.aicareerroad.modules.roadmap.domain.utils.AiCareerRoadPromptBuilder;
import com.aicareerroad.modules.roadmap.domain.utils.InMemoryAiCareerRoadPromptBuilder;
import com.aicareerroad.modules.roadmap.domain.utils.JsoupVacancyPageReader;
import com.aicareerroad.modules.roadmap.domain.utils.VacancyPageReader;
import com.aicareerroad.modules.roadmap.infrastructure.adapters.ai.AiServiceAdaptee;
import com.aicareerroad.modules.roadmap.infrastructure.adapters.ai.GigaChatService;
import com.aicareerroad.modules.roadmap.infrastructure.adapters.ai.requiredinterfacesimpl.AiServiceAdapter;
import com.aicareerroad.modules.roadmap.web.requiredinterfaces.RoadmapModel;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AiCareerRoadContextConfiguration {
  // ------------- Roadmap module beans -------------
  @Bean
  public UrlValidator urlValidator() {
    return new ApacheUrlValidator();
  }

  @Bean
  public AiServiceAdaptee aiServiceAdaptee() {
    return new GigaChatService();
  }

  @Bean
  public AiService aiService() {
    return new AiServiceAdapter(aiServiceAdaptee());
//    return new AiServiceMock();
  }

  @Bean
  public AiCareerRoadPromptBuilder aiCareerRoadPromptBuilder() {
    return new InMemoryAiCareerRoadPromptBuilder();
  }

  @Bean
  public VacancyPageReader vacancyPageReader() {
    return new JsoupVacancyPageReader();
  }

  @Bean
  public RoadmapGenerator roadmapGenerator() {
    return new RoadmapGeneratorImpl(urlValidator(), aiService(), aiCareerRoadPromptBuilder(), vacancyPageReader());
  }

  @Bean
  public RoadmapModel roadmapModel() {
    return new RoadmapModelFacade(roadmapGenerator());
  }
}