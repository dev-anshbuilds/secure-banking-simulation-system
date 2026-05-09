package com.bankingsystem.backend.controller;

import com.bankingsystem.backend.entity.Transaction;
import com.bankingsystem.backend.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    @Autowired
    private TransactionRepository transactionRepository;

    @GetMapping("/all")
    public List<Transaction> getAllTransactions() {

        return transactionRepository.findAll();
    }
}