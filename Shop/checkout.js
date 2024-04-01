var totalPrice = localStorage.getItem('totalPrice');

// Display total price
document.getElementById('totalPrice').textContent = totalPrice;



function validate() {
    // Get all required input fields
    var requiredInputs = document.querySelectorAll('input[required]');
  
    // Flag to keep track of validation result
    var isValid = true;
  
    // Iterate over required input fields
    requiredInputs.forEach(function(input) {
      // Check if the input value is empty
      if (input.value.trim() === '') {
        isValid = false;
        
      } else {
        // If not empty, true
        isValid
      }
    });
  
    // If all required fields are filled, submit the form or proceed with further actions
    if (isValid) {
        alert("Thank you for the purchase!")
        window.location.href = "shop.html";
    }
    else {
      // Optionally, you can display an error message to the user
      alert('Please fill out all required fields.');
    }
}
