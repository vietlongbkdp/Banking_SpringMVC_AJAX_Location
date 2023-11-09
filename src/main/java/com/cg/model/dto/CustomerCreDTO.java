package com.cg.model.dto;

import com.cg.model.Customer;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

import java.math.BigDecimal;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class CustomerCreDTO implements Validator {
    private String fullName;
    private String phone;
    private String email;
    private LocationRegionCreDTO locationRegion;

    @Override
    public boolean supports(Class<?> aClass) {
        return false;
    }

    @Override
    public void validate(Object o, Errors errors) {
//        CustomerReqDTO customerCreDTO = (CustomerReqDTO) o;
//        String fullName = customerCreDTO.fullName;
//        String email = customerCreDTO.email;
//
//        if(fullName.length() < 5){
//            errors.rejectValue("fullName", "fullName.length", "Tên phải có ít nhất là 5 ký tự");
//        }
//        if(!email.contains("@")||!email.contains(".com")){
//            errors.rejectValue("email","email.contains","Bạn cần nhập email hợp lệ");
//        }
    }

    public Customer toCustomer() {
        return new Customer().setFullName(fullName).setEmail(email).setPhone(phone).setDeleted(false).setBalance(BigDecimal.ZERO).setLocationRegion(locationRegion.toLocationRegion());
    }
}
