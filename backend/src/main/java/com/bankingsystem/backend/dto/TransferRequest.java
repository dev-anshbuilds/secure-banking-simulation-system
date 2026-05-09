package com.bankingsystem.backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TransferRequest {

    private Long senderAccountId;
    private Long receiverAccountId;
    private Double amount;
}