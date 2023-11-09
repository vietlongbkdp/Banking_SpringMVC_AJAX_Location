package com.cg.model.dto;

import com.cg.model.LocationRegion;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

import javax.validation.constraints.NotBlank;
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class LocationRegionCreDTO implements Validator {
    private String provinceId;
    private String provinceName;
    private String districtId;
    private String districtName;
    private String wardId;
    private String wardName;
    @NotBlank(message = "Địa chỉ không được để trống")
    private String address;
    @Override
    public boolean supports(Class<?> aClass) {
        return false;
    }

    @Override
    public void validate(Object o, Errors errors) {

    }
    public LocationRegion toLocationRegion(){
        return new LocationRegion().setProvinceId(provinceId).setProvinceName(provinceName).setDistrictId(districtId).setDistrictName(districtName).setWardId(wardId).setWardName(wardName).setAddress(address);
    }
}
