package com.cg.controller;

import com.cg.model.Customer;
import com.cg.service.customerService.CustomerService;
import com.cg.service.customerService.ICustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequestMapping("/customers")
public class CustomerController {

    @GetMapping
    public String showList(){
        return "customer/list";
    }

}
