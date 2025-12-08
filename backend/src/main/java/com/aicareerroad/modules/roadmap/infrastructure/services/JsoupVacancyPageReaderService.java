package com.aicareerroad.modules.roadmap.infrastructure.services;

import com.aicareerroad.modules.roadmap.domain.services.VacancyPageReaderService;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Reads only hh.ru URLs. Reads this data: title, user content and key skills.
 */
public class JsoupVacancyPageReaderService implements VacancyPageReaderService {
  private final static Logger logger = LoggerFactory.getLogger(JsoupVacancyPageReaderService.class);
  private Document doc;

  @Override
  public String readTitle(String vacancyUrl) {
    if (doc == null || !doc.location().equals(vacancyUrl)) setDocument(vacancyUrl);

    Elements titleElements = doc.select("h1[data-qa=vacancy-title]");
    if (!titleElements.isEmpty()) {
      Element titleElement = titleElements.first();
      if (titleElement != null) {
        return titleElement.text();
      }
      logger.debug("Element 'vacancy-title' is null");
    }
    logger.debug("Elements 'vacancy-title' are null");
    return null;
  }

  @Override
  public String readUserContent(String vacancyUrl) {
    if (doc == null || !doc.location().equals(vacancyUrl)) setDocument(vacancyUrl);

    Elements userContent = doc.select("div[class*=user-content]"); // div.vacancy-branded-user-content
    if (!userContent.isEmpty()) {
      Element element = userContent.first();
      if (element != null) {
        return element.text();
      }
      logger.debug("Element 'user-content*' is null");
    }
    logger.debug("Elements 'user-content*' are null");
    return null;
  }

  @Override
  public String readSkills(String vacancyUrl) {
    if (doc == null || !doc.location().equals(vacancyUrl)) setDocument(vacancyUrl);

    Elements skillElements = doc.select("ul[class*=vacancy-skill-list]");
    if (!skillElements.isEmpty()) {
      Element element = skillElements.first();
      if (element != null) {
        return element.text();
      }
      logger.debug("Element 'vacancy-skill-list*' is null");
    }
    logger.debug("Elements 'vacancy-skill-list*' are null");
    return null;
  }

  private void setDocument(String url) {
    try {
      doc = Jsoup.connect(url).timeout(300000).get(); // default timeout was 10000.
    } catch (Exception e) {
      logger.error("Can't read the page", e);
      throw new RuntimeException("Ошибка при чтении страницы: " + e.getMessage());
    }
  }
}
