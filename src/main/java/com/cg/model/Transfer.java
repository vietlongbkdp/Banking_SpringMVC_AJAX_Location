package com.cg.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.math.BigDecimal;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "transfers")
public class Transfer extends BaseEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "sender_id", referencedColumnName = "id", nullable = false)
    private Customer sender;

    @ManyToOne
    @JoinColumn(name = "recipient_id", referencedColumnName = "id", nullable = false)
    private Customer recipient;

    @Column(name = "transfer_amount", columnDefinition = "decimal(10,0)", nullable = false)
    private BigDecimal transferAmount;

    private Long fees;

    @Column(name = "fees_amount", columnDefinition = "decimal(10,0)", nullable = false)
    private BigDecimal feesAmount;

    @Column(name = "transaction_amount", columnDefinition = "decimal(10,0)", nullable = false)
    private BigDecimal transactionAmount;
}
