package com.aicareerroad.modules.roadmap.domain.valueobjects;

import org.apache.commons.validator.routines.UrlValidator;
import org.springframework.web.util.InvalidUrlException;

public final class VacancyUrl {
  private String url;

  public VacancyUrl(String url) {
    super();
    this.setUrl(url);
  }

  public String url() {
    return this.url;
  }

  private void setUrl(String url) {
    if (url == null) {
      throw new IllegalArgumentException("Vacancy URL can't be null");
    }

    String trimmedUrl = url.trim();
    if (trimmedUrl.isEmpty()) {
      throw new InvalidUrlException("Vacancy URL must be filled");
    }

    if (!UrlValidator.getInstance().isValid(trimmedUrl)) {
      throw new InvalidUrlException("Vacancy URL is invalid");
    }

    this.url = trimmedUrl;
  }
}
