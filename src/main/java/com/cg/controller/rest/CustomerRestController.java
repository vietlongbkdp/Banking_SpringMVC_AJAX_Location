package com.cg.controller.rest;

import com.cg.model.Customer;
import com.cg.model.dto.CustomerCreDTO;
import com.cg.model.dto.CustomerReqDTO;
import com.cg.service.customerService.ICustomerService;
import com.cg.utils.AppUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/customers")
public class CustomerRestController {
    @Autowired
    private ICustomerService customerService;
    @Autowired
    private AppUtils appUtils;
    @GetMapping
    public ResponseEntity<?> getAll(){
        List<Customer> customers = customerService.findAll();
        return new ResponseEntity<>(customers, HttpStatus.OK);
    }
    @PostMapping
    public ResponseEntity<?> create(@RequestBody CustomerCreDTO customerCreDTO, BindingResult bindingResult) {

        new CustomerCreDTO().validate(customerCreDTO, bindingResult);

        if (bindingResult.hasFieldErrors()) {
            return appUtils.mapErrorToResponse(bindingResult);
        }

        Customer customer = customerCreDTO.toCustomer();
        customer.setFullName(customerCreDTO.getFullName());
        customer.setEmail(customerCreDTO.getEmail());
        customer.setPhone(customerCreDTO.getPhone());
        customer.setBalance(BigDecimal.ZERO);
        customer.setDeleted(false);

        customerService.create(customer);

        return new ResponseEntity<>(customer, HttpStatus.CREATED);
    }
}
