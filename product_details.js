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

        const product = { name, price, image, color, quantity };

        let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
        cartItems.push(product);
        localStorage.setItem("cartItems", JSON.stringify(cartItems));

        alert("Item added to cart!");
    });
  }
});
