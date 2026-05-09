package com.bankingsystem.backend.controller;
import org.springframework.web.bind.annotation.DeleteMapping;

import com.bankingsystem.backend.dto.TransferRequest;
import com.bankingsystem.backend.dto.TransactionRequest;
import java.util.Optional;
import com.bankingsystem.backend.dto.CreateAccountRequest;
import com.bankingsystem.backend.entity.Account;
import com.bankingsystem.backend.entity.User;
import com.bankingsystem.backend.repository.AccountRepository;
import com.bankingsystem.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.bankingsystem.backend.entity.Transaction;
import com.bankingsystem.backend.repository.TransactionRepository;
import java.util.List;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import java.time.LocalDateTime;
import java.util.Random;

@RestController
@RequestMapping("/api/accounts")
public class AccountController {

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TransactionRepository transactionRepository;

    @PostMapping("/create")
    public String createAccount(@RequestBody CreateAccountRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElse(null);

        if (user == null) {
            return "User not found!";
        }

        String accountNumber = String.valueOf(100000 + new Random().nextInt(900000));

        Account account = Account.builder()
                .accountNumber(accountNumber)
                .balance(0.0)
                .accountType(request.getAccountType())
                .user(user)
                .build();

        accountRepository.save(account);

        return "Bank account created successfully!";
    }
    @PostMapping("/deposit")
    public String deposit(@RequestBody TransactionRequest request) {

        Optional<Account> optionalAccount =
                accountRepository.findById(request.getAccountId());

        if (optionalAccount.isEmpty()) {
            return "Account not found!";
        }

        Account account = optionalAccount.get();

        account.setBalance(account.getBalance() + request.getAmount());

        accountRepository.save(account);

        Transaction transaction = Transaction.builder()
                .type("DEPOSIT")
                .amount(request.getAmount())
                .timestamp(LocalDateTime.now())
                .receiverAccountId(account.getId())
                .build();

        transactionRepository.save(transaction);

        return "Money deposited successfully!";
    }
    @PostMapping("/withdraw")
    public String withdraw(@RequestBody TransactionRequest request) {

        Optional<Account> optionalAccount =
                accountRepository.findById(request.getAccountId());

        if (optionalAccount.isEmpty()) {
            return "Account not found!";
        }

        Account account = optionalAccount.get();

        if (account.getBalance() < request.getAmount()) {
            return "Insufficient balance!";
        }

        account.setBalance(account.getBalance() - request.getAmount());

        accountRepository.save(account);

        Transaction transaction = Transaction.builder()
                .type("WITHDRAW")
                .amount(request.getAmount())
                .timestamp(LocalDateTime.now())
                .senderAccountId(account.getId())
                .build();

        transactionRepository.save(transaction);

        return "Money withdrawn successfully!";
    }
    @PostMapping("/transfer")
    public String transfer(@RequestBody TransferRequest request) {

        Account sender = accountRepository
                .findById(request.getSenderAccountId())
                .orElse(null);

        Account receiver = accountRepository
                .findById(request.getReceiverAccountId())
                .orElse(null);

        if (sender == null || receiver == null) {
            return "Invalid account!";
        }

        if (sender.getBalance() < request.getAmount()) {
            return "Insufficient balance!";
        }

        sender.setBalance(sender.getBalance() - request.getAmount());

        receiver.setBalance(receiver.getBalance() + request.getAmount());

        accountRepository.save(sender);

        accountRepository.save(receiver);

        Transaction transaction = Transaction.builder()
                .type("TRANSFER")
                .amount(request.getAmount())
                .timestamp(LocalDateTime.now())
                .senderAccountId(sender.getId())
                .receiverAccountId(receiver.getId())
                .build();

        transactionRepository.save(transaction);

        return "Money transferred successfully!";
    }
    @DeleteMapping("/delete/{id}")
    public String deleteAccount(@PathVariable Long id) {

        accountRepository.deleteById(id);

        return "Account deleted successfully!";
    }
    @GetMapping("/all")
    public List<Account> getAllAccounts() {

        return accountRepository.findAll();
    }
    @GetMapping("/{id}")
    public Account getAccountById(@PathVariable Long id) {

        return accountRepository.findById(id)
                .orElse(null);
    }
}