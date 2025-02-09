document.addEventListener("DOMContentLoaded", () => {
    const cartContainer = document.querySelector(".cart-container");
    const cartTotalElement = document.querySelector(".cart-total");
    const emptyCartMessage = document.querySelector(".empty-cart-message");

    // Fetch cart items from localStorage
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    // Function to render the cart
    const renderCart = () => {
        cartContainer.innerHTML = ""; // Clear existing items
        if (cartItems.length === 0) {
            emptyCartMessage.style.display = "block";
            cartTotalElement.textContent = "Total: $0.00";
            return;
        }

        emptyCartMessage.style.display = "none";
        let total = 0;

        cartItems.forEach((item, index) => {
            const cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");

            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="item-details">
                    <h4 class="item-name">${item.name}</h4>
                    <p class="item-price">$${item.price.toFixed(2)}</p>
                </div>
                <div class="quantity-control">
                    <button class="decrease-qty" data-index="${index}">-</button>
                    <input type="number" value="${item.quantity}" min="1" readonly>
                    <button class="increase-qty" data-index="${index}">+</button>
                </div>
                <p class="item-subtotal">$${(item.price * item.quantity).toFixed(2)}</p>
                <button class="remove-btn" data-index="${index}">Remove</button>
            `;

            cartContainer.appendChild(cartItem);
            total += item.price * item.quantity;
        });

        cartTotalElement.textContent = `Total: $${total.toFixed(2)}`;
    };

    // Event Listener for quantity adjustment
    cartContainer.addEventListener("click", (event) => {
        const index = event.target.dataset.index;
        if (event.target.classList.contains("increase-qty")) {
            cartItems[index].quantity++;
        } else if (event.target.classList.contains("decrease-qty") && cartItems[index].quantity > 1) {
            cartItems[index].quantity--;
        } else if (event.target.classList.contains("remove-btn")) {
            cartItems.splice(index, 1);
        }
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        renderCart();
    });

    // Initialize the cart rendering
    renderCart();
});
