document.addEventListener('DOMContentLoaded', function () {

    let phone            = document.getElementById("phone");
    let suggestionText   = document.getElementById("suggestion-text");
    let suggestionTag    = document.getElementById("suggestion-tag");
    let listofPhoneValue = document.getElementById("listofPhoneValue");
    let submitBtn        = document.getElementById("submitBtn");
    let errorMessage     = document.getElementById("errorMessage");
    let allTags          = document.querySelector(".all-tags");

    var inputValue = "";
    var arrOfPhone = [];


    let inputForm = document.getElementById("inputForm");
    inputForm.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault()
        }
    })

    //add onkeyup event listener
    phone.addEventListener("keyup", function (event) {
        errorMessage.innerText = '';
        inputValue = event.target.value;

        toggleSuggestionText(inputValue);

        if (event.key === "Enter") {
            inputData();
        }
    })

    //add click event listener
    suggestionTag.addEventListener("click", function (event) {
        inputData();
    })

    //toggle suggestion
    function toggleSuggestionText(inputValue) {

        if (inputValue.length > 0) {
            suggestionText.innerHTML = inputValue;
            suggestionTag.classList.remove("toggle-suggestion-text");
        } else {
            suggestionTag.classList.add("toggle-suggestion-text");
        }
    }

    function inputData() {

        let stringOfPhone         = inputValue;
        let splitedArr            = stringOfPhone.split(",");
            splitedArr            = trimSplitedArrayElement(splitedArr);
        let validateArrayElements = validateArrayElement(splitedArr);

        if (!validateArrayElements) {
            errorMessage.innerText = "input containt invalid character!";
            console.log("input containt invalid character!");

            setTimeout(() => {
                errorMessage.innerText = "";
            }, 5000);
            return false;
        }

        let checkLengthofArrayElements = checkLengthofArrayElement(splitedArr);

        if (!checkLengthofArrayElements) {
            console.log("invalid lenght of number");
            errorMessage.innerText = "invalid lenght of number, each number length must be between 9-14 character!";
            setTimeout(() => {
                errorMessage.innerText = "";
            }, 5000);
            return false;
        }

        pushDataintoArrofPhone(splitedArr);

        phone.value = "";
        suggestionText.innerHTML = "";
        suggestionTag.classList.add("toggle-suggestion-text");
        showElementOfArray();
    }


    //display input data input input box
    function showElementOfArray() {

        let newElement = "";
        arrOfPhone.forEach((data, index) => {
            newElement += `<li class="all-tags-elem" id="${index}" data-value="${data}">${data}<span>x</span></li>`;
        });
        allTags.innerHTML = newElement;

        setListofPhoneValue();
    }


    //set list of phone into option of select
    function setListofPhoneValue() {

        let listofPhone = "";
        arrOfPhone.forEach((data, index) => {
            listofPhone += `<option value="${data}">${data}</option>`;
        });
        listofPhoneValue.innerHTML = listofPhone;

    }

    //tirm array element
    function trimSplitedArrayElement(splitedArr) {

        let arr = [];
        splitedArr.forEach((value) => {
            arr.push(value.trim());
        })
        return arr;
    }


    //push data into array arrayOfPhone
    function pushDataintoArrofPhone(splitedArr) {

        splitedArr.forEach((value) => {
            arrOfPhone.push(value);
        })
    }

    //validate single phone number
    function validateArrayElement(splitedArr) {

        let invalidCounter = 0;
        var format = /[a-zA-Z!@#$%^&*_\=\[\]{};':"\\|,.<>\/?]+/;
        splitedArr.forEach((value) => {
            if (format.test(value)) {
                invalidCounter++
            }
        })


        if (invalidCounter > 0) {
            return false;
        }
        return true;
    }

    //check lenght of array elements
    function checkLengthofArrayElement(splitedArr) {
        let invalidCounter = 0;
        splitedArr.forEach((value) => {
            if (value.length > 14 || value.length < 8) {
                invalidCounter++
            }
        })

        if (invalidCounter > 0) {
            return false;
        }
        return true;
    }

    //add event for remove element from input
    $(".all-tags").on("click", '.all-tags-elem', function (event) {
        let indexOfData = event.currentTarget.id;
        arrOfPhone.splice(indexOfData, 1);
        showElementOfArray();
    })

    //submit validated data
    submitBtn.addEventListener("click", function (event) {
        event.preventDefault();
        console.log(arrOfPhone)
    })

});

$(function () {
    $("input[name='phone']").on('input', function (e) {
        $(this).val($(this).val().replace(/[^0-9 +-_,()]/g, ''));
    });
});