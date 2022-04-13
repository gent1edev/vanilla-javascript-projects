const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

// Show input error message
function _showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';

  const small = formControl.querySelector('small');
  small.innerText = message;
}

// Check email is valid
function _checkEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (re.test(input.value.trim())) {
    _showSuccess(input);
  } else {
    _showError(input, `Email is not valid`);
  }

  return re.test(String(input).toLowerCase());
}

// Show success outline
function _showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}

// Check required fields
function _checkRequiredFields(inputArray) {
  inputArray.forEach((input) => {
    if (input.value.trim()) {
      _showSuccess(input);
    } else {
      _showError(input, `${_getFieldName(input)} is required`);
    }
  });
}

// Check input check
function _checkLength(input, min, max) {
  if (input.value.length < min) {
    _showError(input, `${_getFieldName(input)} must be at least ${min} characters`);
  } else if (input.value.length > max) {;
    _showError(input, `${_getFieldName(input)} must be less than ${max} characters`);
  } else {
    _showSuccess(input);
  }
}

// Check passwords match
function _checkPasswordsMatch(input1, input2) {
  if (input1.value !== input2.value) {
    _showError(input2, 'Passwords do not match');
  }
}

// Get field name
function _getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Event listeners
form.addEventListener('submit', (event) => {
  event.preventDefault();

  _checkRequiredFields([username, email, password, password2]);
  _checkLength(username, 3, 15);
  _checkLength(password, 6, 25);
  _checkEmail(email);
  _checkPasswordsMatch(password, password2);
});
