package com.aicareerroad.modules.roadmap.domain.services;

public interface JsonDtoConverterService<T> {
  T convert(String jsonContainingDtoData);
}
