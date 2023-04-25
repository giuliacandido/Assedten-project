//tilt animation
VanillaTilt.init(document.querySelector(".card-container"), {
    max: 30,
    speed: 200
});


//credit-card authentication with cleave.js
let cleaveCardNumber = new Cleave('#card-number', {
    creditCard: true,
    delimiter: '-',
    onCreditCardTypeChanged: function(type) {
        const cardBrand = document.querySelector('.card-brand'),
        visa = 'visa',
        mastercard = 'mastercard',
        amex = 'amex',
        diners = 'diners',
        discover = 'discover',
        jcb = 'jcb';

        switch(type){
            case 'visa':
                cardBrand.setAttribute('id', visa);
                break;

            case 'mastercard':
                cardBrand.setAttribute('id', mastercard);
                break;
            
            case 'amex':
                cardBrand.setAttribute('id', amex);
                break;

            case 'discover':
                cardBrand.setAttribute('id', discover);
                break;

            case 'diners':
                cardBrand.setAttribute('id', diners);
                break;

            case 'jcb':
                cardBrand.setAttribute('id', jcb);
                break;

            default:
                cardBrand.setAttribute('id', '');
                break;
        }
    }

});

let cleaveExpiryDate = new Cleave('#expiry-date', {
    date: true,
    datePattern: ['m', 'y']
});

let cleaveCvv = new Cleave('#cvv', {
    blocks: [3],
});

//prevent letters on CVV input
const inputCvv = document.querySelector('#cvv');

inputCvv.addEventListener('keypress', (e) => {
    const keyCode = (e.keyCode ? e.keyCode : e.wich);

    if(keyCode > 65 && keyCode < 122){
        e.preventDefault();
    }
});


//form submit
const form = document.querySelector('.form');
const creditCard = document.querySelector('.card-container');
const finalMessage = document.querySelector('.final-message');
const cardNumberInput = document.querySelector('#card-number');
const cardHolderInput = document.querySelector('#card-holder')
const expiryInput =document.querySelector('#expiry-date');
const cvvInput = document.querySelector('#cvv')
// const finalMessage = document.querySelector('.thanks-message');
const cardBrandsValid = [4, 22, 23, 24, 25, 26, 27, 34, 35, 37, 51, 52, 53, 54, 55, 65,
    300, 301, 302, 303, 304, 305, 309, 644, 645, 646, 647, 648, 649, 1800, 2131, 6011];

const allInputs = [cardNumberInput, cardHolderInput, expiryInput, cvvInput]


let isFormValid = false;
let isValidationOn = false;

 //check if the fields are emtpy
 function isFieldEmpty(input){
    input.classList.add('error');
    input.nextElementSibling.classList.add('active')
    input.nextElementSibling.innerText = 'Please fill this camp'
}

function validateInputs() {
    if(!isValidationOn) return;
    isFormValid = true;

    allInputs.forEach((el) => {
        if(!el.value) {
            isFieldEmpty(el);
            isFormValid = false;
        }
    })

    if(cardNumberInput.value.length < 8 && cardNumberInput.value.length > 19) {
        isFieldEmpty(cardNumberInput);
        isFormValid = false;
    }

      //check if the card brand is accepted
    function checkValidCard(input, cardBrandsValid){
        if(!cardBrandsValid.some(cardBrandsValid => input.startsWith(cardBrandsValid))){
            cardNumberInput.classList.add('error');
            cardNumberInput.nextElementSibling.classList.add('active');
            cardNumberInput.nextElementSibling.innerText = 'Please enter a valid card number';
            isFormValid = false;
        }
    }
checkValidCard(cardNumberInput.value, cardBrandsValid);

    
}


form.addEventListener('submit', (event) => {
    event.preventDefault();
    isValidationOn = true;
    validateInputs();

    if(isFormValid){
        form.remove();
        creditCard.remove();
        finalMessage.classList.add('show');
    }
    
})

//remove error messages when the element gain focus and blur
allInputs.forEach((input) => {
    input.addEventListener('focus', () => {
        input.classList.remove('error');
        input.nextElementSibling.classList.remove('active');
    })

    input.addEventListener('blur', () => {
        input.classList.remove('error');
    })
})

//flip card animation & input animation
const cvvBox = document.querySelector('.cvv-box');
const cardNumberBox = document.querySelector('.card-number-box');
const cardHolderBox = document.querySelector('.card-holder-name');
const expiryDateBox = document.querySelector('.expiry-date');
const cardContainer = document.querySelector('.card-container');

cardNumberInput.addEventListener('input', () => {
    cardNumberBox.innerText = cardNumberInput.value
})

cardHolderInput.addEventListener('input', () => {
    cardHolderBox.innerText = cardHolderInput.value.toUpperCase();
});

expiryInput.addEventListener('input', () => {
    expiryDateBox.innerText = expiryInput.value
});

cvvInput.addEventListener('input', () => {
    cvvBox.innerText = cvvInput.value;
})

cvvInput.addEventListener('mouseenter', () => {
    cardContainer.classList.add('active');
});

cvvInput.addEventListener('focus', () => {
    cardContainer.classList.add('active');
})

cvvInput.addEventListener('mouseleave', () => {
    cardContainer.classList.remove('active');
});


// function isBackTrue() {
//     if(cvv === 'focus'){
//         cardContainer.classList.add('active')
//     }else {
//         cardContainer.classList.remove('active')
//     }
// }