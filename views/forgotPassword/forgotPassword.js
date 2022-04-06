function verifyPassword() {
    var pw = document.getElementById("password").value;
    var cpw = document.getElementById("confirmPassword").value;
    //check empty password field
    if (pw !== cpw) {
      document.getElementById("message").innerHTML = "Password does not match";
      return false;
    }
  }


  