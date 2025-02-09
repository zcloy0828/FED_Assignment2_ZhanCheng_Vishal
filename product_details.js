document.addEventListener("DOMContentLoaded", () => {
  const addToCartButton = document.getElementById("add-to-cart");

  if (addToCartButton) {
      addToCartButton.addEventListener("click", () => {
          const nameElement = document.getElementById("product-title");
          const priceElement = document.getElementById("product-price");
          const imageElement = document.getElementById("productImg");
          const colorElement = document.getElementById("product-color");
          const quantityElement = document.getElementById("product-quantity");

          if (!nameElement || !priceElement || !imageElement || !colorElement || !quantityElement) {
              alert("Some product details are missing.");
              return;
          }

          const name = nameElement.innerText.trim();
          const price = parseFloat(priceElement.innerText.replace("$", "").trim());
          const image = imageElement.src;
          const color = colorElement.value;
          const quantity = parseInt(quantityElement.value, 10);

          if (!color) {
              alert("Please select a color.");
              return;
          }

          if (isNaN(quantity) || quantity <= 0) {
              alert("Please enter a valid quantity.");
              return;
          }

          // Create a unique product ID based on name + color
          const productId = `${name}-${color}`;

          const product = { id: productId, name, price, image, color, quantity };

          let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

          // Check if the product already exists in cart
          const existingProductIndex = cartItems.findIndex(item => item.id === productId);

          if (existingProductIndex > -1) {
              // If the product exists, increment its quantity
              cartItems[existingProductIndex].quantity += quantity;
          } else {
              // If the product does not exist, add it to cart
              cartItems.push(product);
          }

          // Save updated cart to localStorage
          localStorage.setItem("cartItems", JSON.stringify(cartItems));

          alert(`${name} has been added to your cart!`);
      });
  } else {
      console.error("Add to Cart button not found on the page.");
  }
});
