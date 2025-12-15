// login.js
document.addEventListener("DOMContentLoaded", () => {
  const toggleLink = document.getElementById("toggleLink");
  const nameField = document.getElementById("nameField");
  const forgotLink = document.getElementById("forgotLink");
  const forgotButton = document.getElementById("forgotButton");
  const mainButton = document.getElementById("mainButton");
  const authForm = document.getElementById("authForm");
  const messageEl = document.getElementById("message");
  const togglePassword = document.getElementById("togglePassword");

  const nameInput = document.getElementById("nameInput");
  const emailInput = document.getElementById("emailInput");
  const passwordInput = document.getElementById("passwordInput");

  // true = Sign up mode, false = Log in mode
  let isSignup = true;

  // --------- localStorage helpers ---------
  const getUsers = () => JSON.parse(localStorage.getItem("users") || "[]");

  const saveUsers = (users) => {
    localStorage.setItem("users", JSON.stringify(users));
  };

  const setCurrentUser = (email) => {
    if (!email) return;
    localStorage.setItem("currentUserEmail", email.toLowerCase());
  };

  const findUser = (email) =>
    getUsers().find((u) => u.email.toLowerCase() === email.toLowerCase());

  // If there are already users, start in login mode
  if (getUsers().length > 0) {
    isSignup = false;
  }

  // --------- message helpers ---------
  function showMessage(msg, type) {
    if (!messageEl) return;
    messageEl.textContent = msg;
    if (!msg) {
      messageEl.className = "";
    } else {
      messageEl.className =
        type === "error" ? "error-message" : "success-message";
    }
  }

  const showError = (msg) => showMessage(msg, "error");
  const showSuccess = (msg) => showMessage(msg, "success");
  const clearMessage = () => showMessage("", "");

  // --------- show / hide password ---------
  if (togglePassword && passwordInput) {
    togglePassword.addEventListener("click", () => {
      const isHidden = passwordInput.type === "password";
      passwordInput.type = isHidden ? "text" : "password";
      togglePassword.classList.toggle("fa-eye");
      togglePassword.classList.toggle("fa-eye-slash");
    });
  }

  // --------- Switch between Sign up / Log in ---------
  function updateModeUI() {
    clearMessage();

    if (isSignup) {
      // Sign up mode
      if (nameField) nameField.style.display = "block";
      if (forgotLink) forgotLink.style.display = "none";
      if (mainButton) mainButton.textContent = "Sign up";
      if (toggleLink) toggleLink.textContent = "Log in";
    } else {
      // Log in mode
      if (nameField) nameField.style.display = "none";
      if (forgotLink) forgotLink.style.display = "inline";
      if (mainButton) mainButton.textContent = "Log in";
      if (toggleLink) toggleLink.textContent = "Sign up";
    }
  }

  if (toggleLink) {
    toggleLink.addEventListener("click", () => {
      isSignup = !isSignup;
      updateModeUI();
    });
  }

  // Initial state
  updateModeUI();

  // --------- Forgot Password - MODIFIED ---------
  if (forgotButton) {
    forgotButton.addEventListener("click", (e) => {
      e.preventDefault();

      let email =
        (emailInput && emailInput.value.trim().toLowerCase()) || "";

      // If email is not filled in the form, ask for it
      if (!email) {
        email = prompt("Enter your email address:") || "";
        email = email.trim().toLowerCase();
      }

      if (!email) return;

      const user = findUser(email);
      if (!user) {
        alert("No account found with that email.");
        return;
      }

      // Create a custom popup to display the password
      const popup = document.createElement("div");
      popup.className = "password-popup";
      
      const popupContent = document.createElement("div");
      popupContent.className = "popup-content";
      
      const title = document.createElement("h3");
      title.textContent = "Password Recovery";
      
      const message = document.createElement("p");
      // Display the full password
      message.innerHTML = `<strong>Email:</strong> ${user.email}<br>
                          <strong>Password:</strong> <span id="passwordDisplay">${user.password}</span>`;
      
      const closeBtn = document.createElement("button");
      closeBtn.textContent = "Close";
      closeBtn.className = "popup-close-btn";
      closeBtn.onclick = () => document.body.removeChild(popup);
      
      popupContent.appendChild(title);
      popupContent.appendChild(message);
      popupContent.appendChild(closeBtn);
      popup.appendChild(popupContent);
      
      // Styles for the popup
      popup.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
      `;
      
      popupContent.style.cssText = `
        background: white;
        padding: 30px;
        border-radius: 10px;
        max-width: 400px;
        width: 90%;
        text-align: center;
        box-shadow: 0 4px 20px rgba(0,0,0,0.2);
      `;
      
      closeBtn.style.cssText = `
        background: #000;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 5px;
        cursor: pointer;
        margin-top: 20px;
        font-size: 16px;
      `;
      
      document.body.appendChild(popup);
      
      // Close popup when clicking outside
      popup.addEventListener("click", (event) => {
        if (event.target === popup) {
          document.body.removeChild(popup);
        }
      });
    });
  }

  // --------- Submit Sign up / Log in ---------
  if (authForm) {
    authForm.addEventListener("submit", (e) => {
      e.preventDefault();
      clearMessage();

      const name = (nameInput && nameInput.value.trim()) || "";
      const email =
        (emailInput && emailInput.value.trim().toLowerCase()) || "";
      const password =
        (passwordInput && passwordInput.value.trim()) || "";

      // Validation
      if (!email || !password || (isSignup && !name)) {
        showError("All fields are required.");
        return;
      }

      if (!/^\S+@\S+\.\S+$/.test(email)) {
        showError("Please enter a valid email address.");
        return;
      }

      if (isSignup && password.length < 6) {
        showError("Password must be at least 6 characters.");
        return;
      }

      if (isSignup) {
        // ------- SIGN UP (create new account) -------
        const users = getUsers();
        if (users.some((u) => u.email.toLowerCase() === email)) {
          showError("This email is already registered. Please log in.");
          return;
        }

        users.push({
          name,
          email,
          password,
          lang: "en",
          createdAt: Date.now(),
        });

        saveUsers(users);
        showSuccess("Account created! You can now log in.");
        isSignup = false;
        updateModeUI();

        // Clear password field for security
        if (nameInput) nameInput.value = "";
        if (passwordInput) passwordInput.value = "";
      } else {
        // ------- LOG IN -------
        const user = findUser(email);
        if (!user) {
          showError("No account found with this email.");
          return;
        }
        if (user.password !== password) {
          showError("Incorrect password.");
          return;
        }

        // Save current user session
        setCurrentUser(user.email);
        showSuccess("Login successful! Redirecting...");
        setTimeout(() => {
          window.location.href = "home_MamyJean.html";
        }, 800);
      }
    });
  }
});