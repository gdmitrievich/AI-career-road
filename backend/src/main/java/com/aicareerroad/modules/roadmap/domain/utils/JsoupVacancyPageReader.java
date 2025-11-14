package com.aicareerroad.modules.roadmap.domain.utils;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

/**
 * Reads only hh.ru URLs. Reads this data: title, user content and key skills.
 */
public class JsoupVacancyPageReader implements VacancyPageReader {
  // TODO: The value should be passed through constructor.
  private Document doc;

  @Override
  public String readBodyContent(String vacancyUrl) {
    try {
      Document doc = Jsoup.connect(vacancyUrl)
        .timeout(10000)
        .get();

      return doc.body().html();
    } catch (Exception e) {
      throw new RuntimeException("Ошибка при чтении страницы: " + e.getMessage());
    }
  }

  @Override
  public String readTitle(String vacancyUrl) {
    if (doc == null || !doc.location().equals(vacancyUrl)) setDoc(vacancyUrl);

    Elements titleElements = doc.select("h1[data-qa=vacancy-title]");
    if (!titleElements.isEmpty()) {
      p("titleElements isn't null");
      Element titleElement = titleElements.first();
      if (titleElement != null) {
        p("title element isn't null");
        return titleElement.text();
      }
    }
    p("title is null");
    return null;
  }

  @Override
  public String readUserContent(String vacancyUrl) {
    if (doc == null || !doc.location().equals(vacancyUrl)) setDoc(vacancyUrl);

    Elements userContent = doc.select("div[class*=user-content]"); // div.vacancy-branded-user-content
    if (!userContent.isEmpty()) {
      Element element = userContent.first();
      if (element != null) {
        return element.text();
      }
    }
    p("user content is null");
    return null;
  }

  @Override
  public String readSkills(String vacancyUrl) {
    if (doc == null || !doc.location().equals(vacancyUrl)) setDoc(vacancyUrl);

    Elements skillElements = doc.select("ul[class*=vacancy-skill-list]");
    if (!skillElements.isEmpty()) {
      Element element = skillElements.first();
      if (element != null) {
        return element.text();
      }
    }
    p("skills is null");
    return null;
  }

  private void setDoc(String url) {
    try {
      doc = Jsoup.connect(url).timeout(300000).get(); // default timeout was 10000.
      p("doc set");
    } catch (Exception e) {
      throw new RuntimeException("Ошибка при чтении страницы: " + e.getMessage());
    }
  }

  // TODO: REMOVE.
  private void p(String message) {
    System.out.println("aicareerroad [PageReader]: " + message);
  }
}
