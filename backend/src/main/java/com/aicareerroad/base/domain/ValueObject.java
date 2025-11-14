package com.aicareerroad.base.domain;

public abstract class ValueObject<T> {
  private final T value;

  protected ValueObject(T value) {
    this.value = value;
  }

  public T value() {
    return value;
  }
}
