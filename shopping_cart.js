document.addEventListener("DOMContentLoaded", () => {
    const cartContainer = document.querySelector(".cart-container");
    const cartTotalElement = document.querySelector(".cart-total");
    const emptyCartMessage = document.querySelector(".empty-cart-message");

    if (!cartContainer || !cartTotalElement) {
        console.error("Cart container or total element is missing in HTML.");
        return;
    }

    // Fetch cart items from localStorage
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    console.log("Loaded cart items:", cartItems);

    const renderCart = () => {
        cartContainer.innerHTML = "";

        if (cartItems.length === 0) {
            if (emptyCartMessage) emptyCartMessage.style.display = "block";
            cartTotalElement.textContent = "Total: $0.00";
            return;
        }

        if (emptyCartMessage) emptyCartMessage.style.display = "none";

        let total = 0;

        cartItems.forEach((item, index) => {
            const cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");
            cartItem.dataset.index = index;

            cartItem.innerHTML = `
                <img src="${item.image || 'placeholder.png'}" alt="${item.name}" width="100">
                <div class="item-details">
                    <h4>${item.name}</h4>
                    <p>Price: $${parseFloat(item.price).toFixed(2)}</p>
                    <p>Color: ${item.color || "Not selected"}</p>
                </div>
                <div class="quantity-control">
                    <button class="decrease-qty" data-index="${index}">-</button>
                    <input type="number" value="${item.quantity}" min="1" readonly>
                    <button class="increase-qty" data-index="${index}">+</button>
                </div>
                <p class="item-subtotal">$${(parseFloat(item.price) * item.quantity).toFixed(2)}</p>
                <button class="remove-btn" data-index="${index}">Remove</button>
            `;

            cartContainer.appendChild(cartItem);
            total += parseFloat(item.price) * item.quantity;
        });

        cartTotalElement.textContent = `Total: $${total.toFixed(2)}`;
    };

    // Event Listeners for Quantity Changes
    cartContainer.addEventListener("click", (event) => {
        const index = parseInt(event.target.dataset.index);

        if (isNaN(index) || index < 0 || index >= cartItems.length) return;

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

    // Ensure cart updates when returning from another page
    window.addEventListener("storage", (event) => {
        if (event.key === "cartItems") {
            cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
            renderCart();
        }
    });

    // Initialize render
    renderCart();
});