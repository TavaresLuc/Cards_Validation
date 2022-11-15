import "./css/index.css"
import IMask from "imask"

const ccBgColor01 = document.querySelector(".cc-bg svg > g g:nth-child(1) path")
const ccBgColor02 = document.querySelector(".cc-bg svg > g g:nth-child(2) path")
const ccLogo = document.querySelector(".cc-logo span:nth-child(2) img")

function setCardType(type) {
  const colors = {
    visa: ["#436D99", "#2D57F2"],
    mastercard: ["#DF6F29", "#C69347"],
    default: ["black", "gray"],
    americanexpress: ["#0077A6", "#99979C"],
  }

  ccBgColor01.setAttribute("fill", colors[type][0])
  ccBgColor02.setAttribute("fill", colors[type][1])
  ccLogo.setAttribute("src", `cc-${type}.svg`)
}
globalThis.setCardType = setCardType

// mask for expiration-date
const expirationDate = document.querySelector("#expiration-date")
 const years = String(new Date().getFullYear()).slice(2)
 const expirationDatePattern = {
  
  mask: 'MM{/}YY',
  blocks: {
    MM: {
      mask: IMask.MaskedRange,
      from: 1,
      to: 12
    },
    YY: {
      mask: IMask.MaskedRange,
      from: years,
      to: String(new Date().getFullYear() + 10).slice(2)
    
    }
  }
};

const expirationDateMasked = IMask(expirationDate, expirationDatePattern)

// mask for CVC

const securityCode = document.querySelector("#security-code")
 const securityCodePattern = {
  mask: '0000'
};
const securityCodeMasked = IMask(securityCode, securityCodePattern)

// mask for Card

const cardNumber = document.querySelector("#card-number")
 const cardNumberPattern = {
  mask: [
    {
      mask: "0000 0000 0000 0000",
      //Regex VISA: Inicia com número 4, seguido de 0 até 15 dígitos.
      regex: /^4\d{0,15}/,
      cardtype: "visa",
    },
    {
      mask: "0000 0000 0000 0000",
      // Regex mastercard: Inicia com 5, seguido de 1 até 2 digitos que são entre 1 a 5 
      //OU Inicia com 22 seguido de 1 digito que são entre 2 e 9
      // OU Inicia com 2 seguido de 2 dígitos que são entre 3 e 7, seguido de 0 a 12 digitos.
      regex: /(^5[1-5]\d{0,2}|^22[2-9]\d|^2[3-7]\d{0,2})\d{0,12}/,
      cardtype: "mastercard",
    },
    {
      mask: "0000 0000 0000 0000",
      cardtype: "default",
    }
  ],

  //Imask.js.org -> guide

  dispatch: function (appended, dynamicMasked) {
    const number = (dynamicMasked.value + appended).replace(/\D/g,'')
    const foundMask = dynamicMasked.compiledMasks.find(function (item) {
      setCardType(item.cardtype)
     return number.match(item.regex)
    })
    
    return foundMask
    
   }
};

const cardMasked = IMask(cardNumber, cardNumberPattern)

const addButton  = document.querySelector("#add-card")
addButton.addEventListener("click")

