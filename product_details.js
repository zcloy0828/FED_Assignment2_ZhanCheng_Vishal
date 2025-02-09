document.addEventListener("DOMContentLoaded", () => {
  const addToCartButton = document.getElementById("add-to-cart");

  if (addToCartButton) {
      addToCartButton.addEventListener("click", () => {
          const productDetails = document.getElementById("product-details");
          const name = document.getElementById("product-title").textContent;
          const price = document.getElementById("product-price").textContent.replace("$", "").trim();
          const image = document.getElementById("productImg").src;
          const color = document.getElementById("product-color").value;
          const quantity = parseInt(document.getElementById("product-quantity").value, 10);

          if (!color) {
              alert("Please select a color.");
              return;
          }

          const product = { name, price, image, color, quantity };

          let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
          cartItems.push(product);
          localStorage.setItem("cartItems", JSON.stringify(cartItems));

          alert("Item added to cart!");
      });
  }
});
