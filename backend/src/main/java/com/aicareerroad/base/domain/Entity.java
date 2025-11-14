package com.aicareerroad.base.domain;

import java.util.Objects;
import java.util.UUID;

public abstract class Entity {
  private final UUID id;

  protected Entity() {
    id = UUID.randomUUID();
  }

  protected Entity(UUID id) {
    if (id == null) {
      throw new IllegalArgumentException("Entity id must not be null");
    }
    this.id = id;
  }

  @Override
  public boolean equals(Object obj) {
    if (this == obj) {
      return true;
    }
    if (obj == null || this.getClass() != obj.getClass()) {
      return false;
    }
    Entity that = (Entity) obj;
    return Objects.equals(this.id, that.id);
  }

  @Override
  public int hashCode() {
    return Objects.hash(this.id);
  }

  @Override
  public String toString() {
    return this.getClass().getSimpleName() + ": id='" + this.id.toString() + "'";
  }
}
