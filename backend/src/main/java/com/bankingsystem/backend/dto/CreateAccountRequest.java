package com.bankingsystem.backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateAccountRequest {

    private String email;
    private String accountType;
}