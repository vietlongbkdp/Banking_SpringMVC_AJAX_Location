package com.cg.service.customerService;

import com.cg.model.*;
import com.cg.model.dto.LocationRegionCreDTO;
import com.cg.repository.CustomerRepository;
import com.cg.repository.LocationRegionRepository;
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
    @Autowired
    private LocationRegionRepository locationRegionRepository;
    @Override
    public List<Customer> findAll() {
        return customerRepository.findAll();
    }

    @Override
    public Optional<Customer> findById(Long id) {

        return customerRepository.findById(id);
    }

    @Override
    public void save(Customer customer) {
        customerRepository.save(customer);
    }

    @Override
    public void update(Customer customer) {
        customerRepository.save(customer);
    }

    @Override
    public void delete(Long id) {

    }

    @Override
    public List<Customer> findAllByIdNot(Long id) {

        return customerRepository.findAllByIdNot(id);
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

    @Override
    public void create(Customer customer) {
        LocationRegion locationRegion = customer.getLocationRegion();
        locationRegionRepository.save(locationRegion);
        customer.setLocationRegion(locationRegion);
        customerRepository.save(customer);
    }
}
