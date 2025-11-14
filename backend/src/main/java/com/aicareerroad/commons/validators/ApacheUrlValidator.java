package com.aicareerroad.commons.validators;

public class ApacheUrlValidator implements com.aicareerroad.commons.validators.UrlValidator {
  private final org.apache.commons.validator.routines.UrlValidator urlValidator;

  public ApacheUrlValidator() {
    this.urlValidator = new org.apache.commons.validator.routines.UrlValidator();
  }

  @Override
  public boolean isValid(String url) {
    return urlValidator.isValid(url);
  }
}
