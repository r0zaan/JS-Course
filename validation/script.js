document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("validationForm");
  const usernameInput = document.getElementById("username");
  const emailInput = document.getElementById("email");
  const usernameError = document.getElementById("usernameError");
  const emailError = document.getElementById("emailError");

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    clearErrors();

    const usernameValue = usernameInput.value.trim();
    const emailValue = emailInput.value.trim();

    // Validate username
    if (usernameValue === "") {
      showError(usernameError, "Username is required");
    }

    // Validate email
    if (emailValue === "") {
      showError(emailError, "Email is required");
    } else if (!isValidEmail(emailValue)) {
      showError(emailError, "Invalid email format");
    }

    // Submit form if no errors
    if (!usernameError.textContent && !emailError.textContent) {
      alert("Form submitted successfully!");
      form.reset();
    }
  });

  function clearErrors() {
    usernameError.textContent = "";
    emailError.textContent = "";
  }

  function showError(element, message) {
    element.textContent = message;
  }

  function isValidEmail(email) {
    // Basic email validation using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
});
