const loginEmail = document.getElementById("loginEmail");
const loginPassward = document.getElementById("loginPassward");
const signupNames = document.getElementById("signupNames");
const signupEmail = document.getElementById("signupEmail");
const signupPassword = document.getElementById("signupPassword");
const signupNameError = document.getElementById("nameError");
const signupForm = document.getElementById("signupForm");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");

// regex
const isValidPwd = /^[a-zA-Z0-9]{6,15}$/;
const isValidEmail =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const isValidNames = /^[a-zA-Z]+(?:(?:\. |[' ])[a-zA-Z]+)*$/;

function validateInputs() {
  const signupNamesValue = signupNames.value;
  const signupEmailValue = signupEmail.value;
  const signupPasswordValue = signupPassword.value;

  if (signupNamesValue === "") {
    signupNames.style.borderColor = "red";
    signupNameError.innerText = "Please Enter your names";
    signupNames.focus();
    return false;
  }
  if (signupEmailValue.trim() === "") {
    signupEmail.style.borderColor = "red";
    document.getElementById("emailError").innerText = "Please Enter your email";
    signupEmail.focus();
    return false;
  }
  if (signupPasswordValue.trim() === "") {
    signupPassword.style.borderColor = "red";
    document.getElementById("passwordError").innerText =
      "Please Enter your password" + "& password must contain at least 6 char.";
    signupPassword.focus();
    return false;
  }
  return true;
}

signupNames.addEventListener("focusin", () => {
  signupNames.addEventListener("keyup", () => {
    if (isValidNames.test(signupNames.value) && signupNames.value !== "") {
      signupNameError.style.display = "none";
      signupNames.style.border = "2px solid green";

      signupNameError.style.color = "green";
    } else if (signupNames.value.trim() === "") {
      signupNameError.innerText = "fill your names name";
      signupNames.focus();
      signupNameError.style.display = "block";
      signupNameError.style.color = "red";
    } else {
      signupNames.style.border = "1.7px solid red";
      signupNameError.style.color = "red";
      signupNameError.style.display = "block";
      signupNameError.innerText =
        "name must have only char. 3 to 25 characters";
      signupNames.focus();
    }
  });
});
signupNames.addEventListener("focusout", () => {
  emailError.style.display = "none";
});

signupEmail.addEventListener("focusin", () => {
  signupEmail.addEventListener("keyup", () => {
    if (
      isValidEmail.test(signupEmail.value.trim()) &&
      signupEmail.value !== ""
    ) {
      emailError.style.display = "none";
      signupEmail.style.border = "2px solid green";
      emailError.style.color = "green";
    } else if (signupEmail.value.trim() === "") {
      emailError.innerText = "Enter your Email";
      signupEmail.focus();
      emailError.style.display = "block";
    } else {
      signupEmail.style.border = "1.7px solid red";
      emailError.style.color = "red";
      emailError.style.display = "block";
      emailError.innerText = "Enter valid Email";
      signupEmail.focus();
    }
  });
});
signupEmail.addEventListener("focusout", () => {
  emailError.style.display = "none";
});

signupPassword.addEventListener("focusin", () => {
  passwordError.style.display = "none";

  //check if input password is valid
  signupPassword.addEventListener("keyup", () => {
    if (isValidPwd.test(signupPassword.value)) {
      passwordError.style.display = "none";
      signupPassword.style.border = "2px solid green"; // if match validation
    } else {
      signupPassword.style.border = "1.7px solid red";
      passwordError.style.color = "red";
      passwordError.style.display = "block";
      passwordError.innerText = "password must contain 6-15 characters";
      signupPassword.focus();
    }
  });
});
signupPassword.addEventListener("focusout", () => {
  passwordError.style.display = "none";
});

const form = document.querySelector("form");
const errorMessage = document.getElementById("errorMessage");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  document.getElementById("show").innerText = username.value;
  const errors = [];
  if (username.value.trim() === "") {
    errors.push("username required");
  }
  if (passward.value.length < 4) {
    errors.push("passward must be atleast 4 characters");
  }
  if (passward.value.length > 10) {
    errors.push("passward must be atleast 4 characters");
  }
  if (errors.length > 0) {
    errorMessage.toggleAttribute("hidden");
  }
});

signupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (validateInputs()) {
    const newUser = {
      names: signupNames.value,
      email: signupEmail.value,
      password: signupPassword.value,
    };

    // if (signupEmail.value.trim() == "") {
    //   signupEmail.style.borderColor = "red";
    //   document.getElementById("emailError").innerText = "Please Enter your email";
    //   signupEmail.focus();
    // }
    // if (signupPassword.value.trim() === "" || signupPassword.value.length < 6) {
    // }

    if (localStorage.signedUpUsers) {
      //mean there are other users who have previously signed up
      //we cant errase them
      //we are going to add the new user to them.

      ////step 1
      //check if user already exists in our local storage
      //step1.1
      //get signedup users.
      const signedUpUsers = JSON.parse(localStorage.getItem("signedUpUsers"));

      //step 1.2
      //check if user exist in returned array
      let found = false;
      for (let i = 0; i < signedUpUsers.length; i++) {
        if (signedUpUsers[i].email == newUser.email) {
          found = true;
          break;
        }
      }
      if (found) {
        alert("email already exists!");
      } else {
        //save new user
        //step 1
        //add new user to other users we have
        signedUpUsers.push(newUser);

        //step 2
        //stringfy the arra
        const arrayTobeSaved = JSON.stringify(signedUpUsers);

        //step 3
        //save the users arry into localstorage
        localStorage.setItem("signedUpUsers", arrayTobeSaved);
        //reset the form
        document.getElementById("signupForm").reset();
        alert("signed up successful");
      }
    } else {
      //means we dont have other users who signed up before.
      //lets save our new user.
      //remember
      //signedUpUsers must me an array
      //and it is impossible to store arrays in local storage
      //i.e. all local storage values and keys must be strings.
      //so, we will create an array and convert it into a string.

      //step 1
      //create an array and add new user
      const myArray = [newUser];

      //step 2
      //stringfy the myArray
      const arrayTobeSaved = JSON.stringify(myArray);

      //step 3
      //save the user arry into localstorage
      localStorage.setItem("signedUpUsers", arrayTobeSaved);

      //reset the form (final step)
      document.getElementById("signupForm").reset();
      alert("signed up successful");
    }
  }
});


