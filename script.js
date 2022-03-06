const formEl = document.getElementById("form");
const usernameEl = document.getElementById("username");
const emailEl = document.getElementById("email");
const passwordEl = document.getElementById("password");
const passwordComfirmEl = document.getElementById("passwordComfirm");

// Show input error message
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const small = formControl.querySelector("small");
  small.innerText = message;
}

// Show success outline
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

// Check email is valid
function checkEmail(input) {
  let check = true;
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
    check = false;
  } else {
    showError(input, "Email is not valid");
  }
  return check;
}

// Check required fields
function checkRequired(inputArr) {
  let isRequired = false;
  inputArr.forEach(function (input) {
    if (input.value.trim() === "") {
      showError(input, `${getFieldName(input)} is required`);
      isRequired = true;
    } else {
      showSuccess(input);
    }
  });

  return isRequired;
}

// Check input length
function checkLength(input, min, max) {
  let check = true;
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must be maximum ${max} characters`
    );
  } else {
    showSuccess(input);
    check = false;
  }
  return check;
}

// Check passwords match
function checkPasswordsMatch(input1, input2) {
  let check = true;
  if (input1.value !== input2.value) {
    showError(input2, "Passwords do not match");
  } else {
    check = false;
  }
  return check;
}

// Get fieldname
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Event listeners
form.addEventListener("submit", function (e) {
  e.preventDefault();

  if (
    !checkRequired([usernameEl, emailEl, passwordEl, passwordComfirmEl]) &&
    !checkLength(usernameEl, 3, 15) &&
    !checkLength(passwordEl, 6, 25) &&
    !checkEmail(emailEl) &&
    !checkPasswordsMatch(passwordEl, passwordComfirmEl)
  ) {
    alert("You have successfully signed up!");
  }
});
