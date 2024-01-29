document.addEventListener("DOMContentLoaded", () => {
  const userExist = localStorage.getItem('userInfo');
  console.log(userExist);
  const username = document.getElementById("username");
  const email = document.getElementById("email");
  const loginEmail = document.getElementById("login-email");
  const password = document.getElementById("password");
  const loginPassword = document.getElementById("login-password");
  const confirmPassword = document.getElementById("confirm-password");
  const location = document.getElementById("location");
  const register = document.getElementById("register-btn");
  const login = document.getElementById("loginBTN");
  if(userExist){
    window.location.href = "/frontend/index.html";
  }
  login.addEventListener("click", async(e)=>{
    e.preventDefault()
    const data = {
        email: username.value,
        email: email.value,
        password: password.value,
        location:location.value
    };
    const response = await postData("http://localhost:3000/api/users/login", data);
                  console.log(response);
                  localStorage.setItem("userInfo", JSON.stringify(response))
                  window.location.href = "/frontend/index.html";
  })

  register.addEventListener("click", async (e) => {
      e.preventDefault();

      if (!userExist) {
          try {
             
              if (confirmPassword.value !== password.value) {
                  console.log("Passwords do not match");
              } else {
                  
                  const data = {
                      username: username.value,
                      email: email.value,
                      password: password.value,
                      location:location.value
                  };

                  
                  const response = await postData("http://localhost:3000/api/users", data);
                  console.log(response);
                  localStorage.setItem("userInfo", JSON.stringify(response))
                  window.location.href = "/frontend/index.html";
              }
          } catch (error) {
              console.error("Error:", error);
          }
      }
  });
});

async function postData(url = "", data = {}) {
  const response = await fetch(url, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
          "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(data),
  });
  return response.json();
}

const toggleForm = () => {
  const container = document.querySelector(".container");
  container.classList.toggle("active");
};
