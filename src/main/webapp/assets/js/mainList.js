const page = {
    url: {
        getAllProvinces: 'https://vapi.vnappmob.com/api/province/',
        getAllDistrictsByProvinceId: 'https://vapi.vnappmob.com/api/province/district/',
        getAllWardsByDistrictId: 'https://vapi.vnappmob.com/api/province/ward/',
    },
    elements: {},
    loadData: {},
    commands: {}
}

page.elements.modalCreate = $('#modalCreate');
page.elements.frmCreate = $('#frmCreate');
page.elements.fullNameCre = $('#fullNameCre');
page.elements.emailCre = $('#emailCre');
page.elements.phoneCre = $('#phoneCre');
page.elements.provinceCre = $('#provinceCre');
page.elements.districtCre = $('#districtCre');
page.elements.wardCre = $('#wardCre');
page.elements.addressCre = $('#addressCre');
page.elements.btnCreate = $('#btnCreate');

page.elements.bodyCustomer = $('#tbCustomer tbody')

page.elements.loading = $('#loading');
page.elements.footer = $('footer')

page.elements.toastLive = $('#liveToast')
page.elements.toastBody = $('#toast-body')
page.elements.btnCloseToast = $('#btnCloseToast')

const btnUpdate = $('#btnUpdate');

const toastBootstrap = bootstrap.Toast.getOrCreateInstance(page.elements.toastLive)

let personId = 0;

async function fetchALlPerson() {
    return await $.ajax({
        url: "http://localhost:8080/api/customers"
    })
}

page.commands.getALlPerson = async () => {
    const persons = await fetchALlPerson();

    persons.forEach(item => {
        const str = page.commands.renderPerson(item)
       page.elements.bodyCustomer.prepend(str);
    });
    // const btnEditElems = document.querySelectorAll('.edit')
    //
    // btnEditElems.forEach(item => {
    //     item.addEventListener('click', async () => {
    //         // const id = item.id.replace('data_', '')
    //         personId = item.getAttribute('data-id')
    //
    //         const person = await getPersonById(personId);
    //         // console.log(person);
    //
    //         // openModal('modalUpdate')
    //         $('#modalUpdate').modal('show')
    //
    //         document.getElementById('fullNameUp').value = person.fullName
    //         document.getElementById('emailUp').value = person.email
    //         document.getElementById('phoneUp').value = person.phone
    //         document.getElementById('addressUp').value = person.address
    //
    //     })
    // })
    //
    // const btnDepositElems = $('.deposit')
    //
    // $.each(btnDepositElems, (index, item) => {
    //     $(item).on('click', async () => {
    //         personId = $(item).data('id')
    //
    //         console.log(personId);
    //
    //     })
    // })
}

page.commands.getPersonById = async (personId) => {
    const response = await fetch("http://localhost:8080/api/customers/" + personId);
    const person = await response.json();
    return person
}

page.commands.fetchUpdatePerson = async (personId, obj) => {
    const response = await fetch("http://localhost:8080/api/customers/" + personId, {
        method: 'PATCH',
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify(obj)
    });
    const person = await response.json();
    return person
}

page.commands.renderPerson = (obj) => {
    return `
                    <tr id="tr_${obj.id}">
                        <td><span></span></td>
                        <td>${obj.id}</td>
                        <td>${obj.fullName}</td>
                        <td>${obj.email}</td>
                        <td>${obj.phone}</td>
                        <td>${obj.locationRegion.provinceName}</td>
                        <td>${obj.locationRegion.districtName}</td>
                        <td>${obj.locationRegion.wardName}</td>
                        <td>${obj.locationRegion.address}</td>
                        <td>${obj.balance}</td>
<!--                        <td>-->
<!--                            <button class="btn btn-outline-secondary edit">-->
<!--                                <i class="far fa-edit"></i>-->
<!--                            </button>-->
<!--                        </td>-->
<!--                        <td>-->
<!--                            <button class="btn btn-outline-success deposit">-->
<!--                                <i class="fas fa-plus"></i>-->
<!--                            </button>-->
<!--                        </td>-->
<!--                        <td>-->
<!--                            <button class="btn btn-outline-warning">-->
<!--                                <i class="fas fa-minus"></i>-->
<!--                            </button>-->
<!--                        </td>-->
<!--                        <td>-->
<!--                            <button class="btn btn-outline-primary">-->
<!--                                <i class="fas fa-exchange-alt"></i>-->
<!--                            </button>-->
<!--                        </td>-->
<!--                        <td>-->
<!--                            <button class="btn btn-outline-danger">-->
<!--                                <i class="fas fa-ban"></i>-->
<!--                            </button>-->
<!--                        </td>-->
                    </tr>
                `
}


page.elements.modalCreate.on('hidden.bs.modal', () => {
    $('#frmCreate').trigger('reset')
    $('#frmCreate input').removeClass('error')
    $('#frmCreate label.error').remove()
})

page.elements.frmCreate.validate({
    rules: {
        fullNameCre: {
            required: true
        },
        addressCre: {
            required: true
        },
        emailCre: {
            required: true
        }
    },
    messages: {
        fullNameCre: {
            required: 'FullName không được để trống !'
        },
        addressCre: {
            required: 'Địa chỉ không được để trống !'
        },
        emailCre: {
            required: 'Email không được để trống !'
        }
    },
    errorLabelContainer: "#modalCreate .area-error",
    errorPlacement: function (error, element) {
        error.appendTo("#modalCreate .area-error");
    },
    showErrors: function(errorMap, errorList) {
        if (this.numberOfInvalids() > 0) {
            $("#modalCreate .area-error").removeClass("hide").addClass("show");
        } else {
            $("#modalCreate .area-error").removeClass("show").addClass("hide").empty();
            $("#frmCreate input.error").removeClass("error");
        }
        this.defaultShowErrors();
    },
    submitHandler: () => {
        createCustomer()
    }
})

const createCustomer = () => {
    const provinceId = page.elements.provinceCre.val();
    const provinceName = page.elements.provinceCre.find('option:selected').text();
    const districtId = page.elements.districtCre.val();
    const districtName = page.elements.districtCre.find('option:selected').text();
    const wardId = page.elements.wardCre.val();
    const wardName = page.elements.wardCre.find('option:selected').text();
    const address = page.elements.addressCre.val();

    const fullName = page.elements.fullNameCre.val()
    const email = page.elements.emailCre.val()
    const phone = page.elements.phoneCre.val()

    const locationRegion = {
        provinceId,
        provinceName,
        districtId,
        districtName,
        wardId,
        wardName,
        address,
    }

    const obj = {
        fullName,
        email,
        phone,
        locationRegion,
    }

    page.elements.btnCreate.prop("disabled", true);

    page.elements.loading.removeClass('hide')

    setTimeout(() => {
        $.ajax(
            {
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                },
                method: 'POST',
                url: "http://localhost:8080/api/customers",
                data: JSON.stringify(obj)
            }
        )
            .done((data) => {
                const str = renderPerson(data)
                page.elements.bodyCustomer.prepend(str);

                closeModal('modalCreate')

                page.elements.toastBody.text('Thêm mới thành công')
                toastBootstrap.show()

                setTimeout(() => {
                    page.elements.btnCloseToast.click()
                }, 2000);
            })
            .fail((err) => {
                const responseJSON = err.responseJSON

                if (responseJSON) {
                    let str = '<ul>'
                    $.each(responseJSON, (k, v) => {
                        str += `<li><label for="${k + 'Cre'}">${v}</label></li>`
                    })

                    str += '</ul>'

                    $('.area-error').append(str).removeClass('hide').css('display', '')
                }
            })
            .always(() => {
                page.elements.btnCreate.prop("disabled", false);
                page.elements.loading.addClass('hide')
            });
    }, 1000);
}

page.elements.btnCreate.on('click', async () => {
    page.elements.frmCreate.trigger('submit')
})
page.commands.renderFooter = () => {
    return `
                <button class="btn btn-secondary edit">
                    <i class="far fa-edit"></i>
                    Update
                </button>
                <button class="btn btn-success deposit">
                    <i class="fas fa-plus"></i>
                    Deposit
                </button>
                <button class="btn btn-warning">
                    <i class="fas fa-minus"></i>
                    Withdraw
                </button>
                <button class="btn btn-primary">
                    <i class="fas fa-exchange-alt"></i>
                    Transfer
                </button>
                <button class="btn btn-danger">
                    <i class="fas fa-ban"></i>
                    Inactive
                </button>
            `
}
btnUpdate.on('click', async () => {
    const fullName = document.getElementById('fullNameUp').value
    const email = document.getElementById('emailUp').value
    const phone = document.getElementById('phoneUp').value
    const address = document.getElementById('addressUp').value

    const obj = {
        fullName,
        email,
        phone,
        address
    }

    const content = await fetchUpdatePerson(personId, obj)

    const updateRow = $('#tr_' + personId)
    const str = renderPerson(content)
    updateRow.replaceWith(str)

    closeModal('modalUpdate')

    page.elements.toastBody.text('Cập nhật thông tin thành công')
    toastBootstrap.show()

    const btnEditElems = $('.edit')

    $.each(btnEditElems, (index, item) => {
        $(item).on('click', async () => {
            personId = $(item).data('id')

            const person = await getPersonById(personId);

            openModal('modalUpdate')

            $('#fullNameUp').val(person.fullName)
            $('#emailUp').val(person.email)
            $('#phoneUp').val(person.phone)
            $('#addressUp').val(person.address)

        })
    })

    const btnDepositElems = $('.deposit')

    btnDepositElems.off('click')

    $.each(btnDepositElems, (index, item) => {
        $(item).on('click', async () => {
            personId = $(item).data('id')

            const person = await getPersonById(personId);

            // openModal('modalUpdate')

            // $('#fullNameUp').val(person.fullName)
            // $('#emailUp').val(person.email)
            // $('#phoneUp').val(person.phone)
            // $('#addressUp').val(person.address)

        })
    })


    setTimeout(() => {
        btnCloseToast.click()
    }, 2500);
})

function openModal(elem) {
    let el = document.getElementById(elem);
    new bootstrap.Modal(el).show();
}

function closeModal(elem) {
    document.getElementById(elem).style.display = "none"
    document.getElementById(elem).classList.remove("show")
    document.querySelector('.modal-backdrop').remove();
    document.querySelector('body').setAttribute('style', 'overflow: none')
}




page.commands.getAllProvinces = () => {
    return $.ajax({
        url: page.url.getAllProvinces
    })
        .done((data) => {
            const provinces = data.results;

            $.each(provinces, (index, item) => {
                const str = `<option value="${item.province_id}">${item.province_name}</option>`

                page.elements.provinceCre.append(str)
            })
        })
}

page.commands.getAllDistricts = (provinceId) => {
    return $.ajax({
        url: page.url.getAllDistrictsByProvinceId + provinceId
    })
        .done((data) => {
            page.elements.districtCre.empty();

            const districts = data.results;

            $.each(districts, (index, item) => {
                const str = `<option value="${item.district_id}">${item.district_name}</option>`

                page.elements.districtCre.append(str)
            })
        })
}

page.commands.getAllWards = (districtId) => {
    $.ajax({
        url: page.url.getAllWardsByDistrictId + districtId
    })
        .done((data) => {
            page.elements.wardCre.empty();

            const wards = data.results;

            $.each(wards, (index, item) => {
                const str = `<option value="${item.ward_id}">${item.ward_name}</option>`

                page.elements.wardCre.append(str)
            })
        })
}


page.elements.provinceCre.on('change', function () {
    const provinceId = $(this).val()

    page.commands.getAllDistricts(provinceId).then(() => {
        const districtId = page.elements.districtCre.find('option:selected').val()

        page.commands.getAllWards(districtId)
    })
})
page.commands.handleClickRow = () => {
    $('#tbCustomer tbody tr td').on('click', function () {
        $('#tbCustomer tbody tr td span').removeClass('selected')
        personId = $(this).parent().attr('id').replace('tr_', '')

        const elem = $(this).parent().find('td')[0]

        const span = $(elem).find('span')
        $(span).addClass('selected')

        const str = page.commands.renderFooter()
        page.elements.footer.html(str)

        page.commands.handleClickEditButton()
    })
}
page.commands.handleClickEditButton = () => {
    $('footer button.edit').on('click', () => {
        page.loadData.getCustomerById();
    })
}
page.loadData.getCustomerById = async () => {
    $.ajax({
        url: page.url.getCustomerById + customerId,
    })
        .done(async (data) => {
            page.elements.fullNameUp.val(data.fullName)
            page.elements.emailUp.val(data.email)
            page.elements.phoneUp.val(data.phone)
            page.elements.provinceUp.val(data.locationRegion.provinceId)

            await page.commands.getAllDistricts(data.locationRegion.provinceId, page.elements.districtUp)

            await page.commands.getAllWards(data.locationRegion.districtId, page.elements.wardUp)

            page.elements.modalUpdate.modal('show');
        })
        .fail((err) => {

        })
}

page.elements.districtCre.on('change',  function () {
    const districtId = $(this).val()

    page.commands.getAllWards(districtId)
})
$.ajaxSetup({
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
})
$(async () => {
    await page.commands.getALlPerson()

    await page.commands.getAllProvinces();

    const provinceId = page.elements.provinceCre.find('option:selected').val()

    await page.commands.getAllDistricts(provinceId, page.elements.districtCre);

    const districtId = page.elements.districtCre.find('option:selected').val()

    page.commands.getAllWards(districtId, page.elements.wardCre)

})