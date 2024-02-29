function menuAnimation(x) {
    x.classList.toggle("change");
}

// Get the modal
var modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

//Username and password

function showModal() {
    document.getElementById('id01').style.display = 'block';
}

function hideModal() {
    document.getElementById('id01').style.display = 'none';
}

function validateForm() {
    var username = document.getElementById('uname').value;
    var password = document.getElementById('psw').value;

    // Add your validation logic here
    if (username === 'valid_username' && password === 'valid_password') {
        return true; // Allow form submission
    } else {
        alert('Invalid username or password!');
        return false; // Prevent form submission
    }
}