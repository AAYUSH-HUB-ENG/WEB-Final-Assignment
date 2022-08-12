document.getElementById("email").size = "25";
document.getElementById("name").size = "25";
document.getElementById("address").size = "25";
document.getElementById("postal").size = "25";

const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.navbar__menu');

menu.addEventListener('click', function() {
  menu.classList.toggle('is-active');
  menuLinks.classList.toggle('active');
});

let messages = [];
const form = document.getElementById('form');
const errorElement = document.getElementById('isvalid');

form.addEventListener('submit', (e) => {
  messages = [];


  checkName();
  checkEmail();
  checkAddress();
  checkCity();
  checkPostal();
  checkMessage();


  if (clicked > 0) {
      payRateValidation();
  }

  if (messages.length > 0) {
      e.preventDefault();
      errorElement.innerHTML = `
      <h3>Incorrect Inputs Provided:</h3>
      <pre>${messages.join('\r\n')}</pre>
      `;
  }
})

form.addEventListener('reset', (e) => {
  messages = [];
  errorElement.innerHTML = '';
})

function checkName() {
  const inputName = document.getElementById('name');
  if(nullChecker(inputName, 'Name')) {
      areAlphabets(inputName, '! Invalid Entry');
  }
}

function checkEmail() {
  const email = document.getElementById('email');
  if (nullChecker(email, 'Email')) {
      let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if (!(email.value.match(validRegex))) {
          messages.push("! Invalid Entry");
      }
  }    
}

function checkAddress() {
  const address = document.getElementById('address');
  if (nullChecker(address, 'Address')) {
      if (address.value.length < 10) {
          messages.push("! Invalid Entry");
      }
  }
}

function checkCity() {
  const city = document.getElementById('choice');
  if(nullChecker(city, 'City')) {
      areAlphabets(city, '! Invalid Entry');
  }
}

function checkPostal() {
  let postalCode = document.getElementById('postal');
  let validRegex = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;
  if (!(postalCode.value.match(validRegex))) {
      messages.push("! Enter a valid postal code");
  }
}

function checkMessage() {
  const message = document.getElementById('Message');
  if (nullChecker(message, 'Message')) {
      if (address.value.length < 10) {
          messages.push("! Message not long enough");
      }
  }
}


function payRateValidation() {
  let payRateInput = document.getElementById('hiring-rate-input');
  if (payRateInput.value <= 0) {
      messages.push("! Enter an appropriate expected hourly pay rate")
  }
}

function nullChecker(element, elementName) {
  result = true;
  if (element.value === '' || element.value == null) {
      messages.push(`! please enter valid ${elementName}`);
      result = false;
  }

  return result;
}

function areAlphabets(element, message) {
  let validRegex = /^[A-Za-z\s]+$/;
  if (!(element.value.match(validRegex))) {
      messages.push(message);
  }
}


let hiringRadioButton = document.getElementById('hiring');
let questionRadioButton = document.getElementById('question');
let commentRadioButton = document.getElementById('comment');

var clicked = 0;

hiringRadioButton.addEventListener('click', function() {
    if (clicked == 0) {
        generatePayRateInput();
        clicked++;
    }
});

questionRadioButton.addEventListener('click', function() {
    if (clicked > 0) {
        deletePayRateInput();
        clicked = 0;
    }
});

commentRadioButton.addEventListener('click', function() {
    if (clicked > 0) {
        deletePayRateInput();
        clicked = 0;
    }
});

function generatePayRateInput() {
    let break1 = document.createElement('br');
    break1.id = 'b1';
    let break2 = document.createElement('br');
    break2.id = 'b2';
    let break3 = document.createElement('br');
    break3.id = 'b3';

    const node1 = document.createElement("label");
    const textNode = document.createTextNode("Expected Hourly Rate: ");
    node1.appendChild(textNode);
    node1.id = 'hiring-rate-label';

    const node2 = document.createElement("input");
    node2.id = 'hiring-rate-input';
    node2.type = 'number';
    node2.step = '1';
    node2.placeholder = 'Hourly Pay';
    node2.classList.add('format')

    document.querySelector(".button").appendChild(break1);
    document.querySelector(".button").appendChild(break2);
    document.querySelector(".button").appendChild(node1);
    document.querySelector(".button").appendChild(break3);
    document.querySelector(".button").appendChild(node2);
}
function deletePayRateInput() {
    let label = document.getElementById('hiring-rate-label');
    let input = document.getElementById('hiring-rate-input');
    let div = document.querySelector(".button");
    let b1 = document.getElementById('b1');
    let b2 = document.getElementById('b2');
    let b3 = document.getElementById('b3');

    div.removeChild(b1);
    div.removeChild(b2);
    div.removeChild(b3);
    div.removeChild(input);
    div.removeChild(label);
}
