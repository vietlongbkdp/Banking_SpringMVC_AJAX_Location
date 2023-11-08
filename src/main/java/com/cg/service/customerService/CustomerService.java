package com.cg.service.customerService;

import com.cg.model.Customer;
import com.cg.model.Deposit;
import com.cg.model.Transfer;
import com.cg.model.Withdraw;
import com.cg.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
@Service
@Transactional
public class CustomerService implements ICustomerService{
    @Autowired
    private CustomerRepository customerRepository;
    @Override
    public List<Customer> findAll() {
        return null;
    }

    @Override
    public Optional<Customer> findById(Long id) {
        return Optional.empty();
    }

    @Override
    public void save(Customer customer) {

    }

    @Override
    public void update(Customer customer) {

    }

    @Override
    public void delete(Long id) {

    }

    @Override
    public List<Customer> findAllByIdNot(Long id) {
        return null;
    }

    @Override
    public void deposit(Deposit deposit) {

    }

    @Override
    public void withdraw(Withdraw withdraw) {

    }

    @Override
    public void transfer(Transfer transfer) {

    }
}
