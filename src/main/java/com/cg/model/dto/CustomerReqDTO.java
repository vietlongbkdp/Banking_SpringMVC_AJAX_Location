package com.cg.model.dto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CustomerReqDTO implements Validator{
    private String fullName;
    private String email;
    private String phone;
    private String address;

    @Override
    public boolean supports(Class<?> aClass) {
        return false;
    }

    @Override
    public void validate(Object o, Errors errors) {
        CustomerReqDTO customerCreDTO = (CustomerReqDTO) o;
        String fullName = customerCreDTO.fullName;
        String address = customerCreDTO.address;
        String email = customerCreDTO.email;

        if(fullName.length() < 5){
            errors.rejectValue("fullName", "fullName.length", "Tên phải có ít nhất là 5 ký tự");
        }
        if(address.length() < 5) {
            errors.rejectValue("address", "address.length", "Địa chỉ phải có ít nhất là 5 ký tự");
        }
        if(!email.contains("@")||!email.contains(".com")){
            errors.rejectValue("email","email.contains","Bạn cần nhập email hợp lệ");
        }
    }
}
