package com.example.entity;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.Column;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
public class Sale extends PanacheEntity {

    @Column(nullable = false)
    public String name;

    @Column(nullable = false)
    public String course;

    @Column(nullable = false)
    public BigDecimal price;

    @Column(name = "sale_date", nullable = false)
    public LocalDate saleDate;
}
