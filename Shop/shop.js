function filter() {
  var category = document.getElementById('select-category').value;
  var cards = document.querySelectorAll('.card');

  cards.forEach(function(card) {
    var button = card.querySelector('.button');
    var price = card.querySelector('.price');

    if (category === 'all' || card.classList.contains(category)) {
      card.style.display = 'block';
      button.style.display = 'block'; // Show button if it exists
      price.style.display = 'block'; // Show price if it exists
    } else {
      card.style.display = 'none';
    }
    console.log("Card:", card);
    console.log("Button:", button);
    console.log("Price:", price);
  });

  
}




function addToBasket(cardId) {
  var card = document.getElementById(cardId);
  var description = card.querySelector('.description').innerHTML;
  var priceText = card.querySelector('.price').textContent;
  var price = parseFloat(priceText.replace(/[^\d.]/g, ''));
  var imageSrc = card.querySelector('img').src;
  var basket = document.querySelector('.basket-con');

  // Check if an item with the same ID is already in the basket
  var existingBasketItem = basket.querySelector(`.basket-item[data-card-id="${cardId}"]`);

  if (existingBasketItem) {
    var quantityInput = existingBasketItem.querySelector('.quantity');
    var newQuantity = parseInt(quantityInput.value) + 1;
    quantityInput.value = newQuantity;
    updateTotalPrice(existingBasketItem);
    updateBasketTotal();
    
  } else {
      // Create a new basket item if it's not already in the basket
      var basketItem = document.createElement('div');
      basketItem.classList.add('basket-item');
      basketItem.setAttribute('data-card-id', cardId); // Store card ID as data attribute

      basketItem.innerHTML = `
        <img src="${imageSrc}" alt="${description}">
        <div class="description">${description}</div>
        <div class="price">${priceText}</div>
        <input type="number" class="quantity" value="1" min="1">
        <div class="total-price">Total: ${priceText}</div>
        <button class="remove-button">Remove item</button>
      `;


    // Function to update total price based on quantity
    function updateTotalPrice() {
      var quantity = parseInt(basketItem.querySelector('.quantity').value);
      var totalPrice = price * quantity;
      basketItem.querySelector('.total-price').textContent = `Total: £${totalPrice.toFixed(2)}`;
      updateBasketTotal();
    }

    // Add event listener to update total price when quantity changes
    basketItem.querySelector('.quantity').addEventListener('change', function() {
      updateTotalPrice(basketItem);
    });

    // Add event listener to remove the item from the basket when the remove button is clicked
    basketItem.querySelector('.remove-button').addEventListener('click', function() {
      basketItem.remove();
      updateBasketTotal();
    });

    // Append the new card to the basket
    basket.appendChild(basketItem);

    updateBasketTotal();
  } 

  updateBasketTotal();
}
  
  

document.getElementById('burj').addEventListener('click', function() {
    addToBasket('burj');
});

document.getElementById('tower').addEventListener('click', function() {
    addToBasket('tower');
});

document.getElementById('shard').addEventListener('click', function() {
    addToBasket('shard');
});

document.getElementById('emp-state').addEventListener('click', function() {
    addToBasket('emp-state');
});


function calculateBasketTotal() {
  var basketItems = document.querySelectorAll('.basket-item');
  var total = 0;

  basketItems.forEach(function(basketItem) {
    var priceText = basketItem.querySelector('.price').textContent;
    var price = parseFloat(priceText.replace(/[^\d.]/g, ''));
    var quantity = parseInt(basketItem.querySelector('.quantity').value);
    total += price * quantity;
  });
    var totalPrice = total.toFixed(2);
  return totalPrice
}

function updateBasketTotal() {
  var basketTotal = calculateBasketTotal();
  var basketTotalElement = document.querySelector('.total');
  basketTotalElement.textContent = "Total: £" + basketTotal;
}

// Call the function to update the basket total initially
updateBasketTotal();

function redirectToCheckout() {
  // Calculate total price
  var totalPrice = calculateBasketTotal();
  
  // Store total price in localStorage
  localStorage.setItem('totalPrice', totalPrice);

  // Redirect to checkout.html
  window.location.href = 'checkout.html';
}