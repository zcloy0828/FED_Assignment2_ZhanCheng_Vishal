document.addEventListener("DOMContentLoaded", () => {
    const cartContainer = document.querySelector(".cart-page table");
    const emptyCartMessage = document.querySelector(".empty-cart-message");
    const subtotalElement = document.querySelector(".total-price table tr:nth-child(1) td:nth-child(2)");
    const taxElement = document.querySelector(".total-price table tr:nth-child(2) td:nth-child(2)");
    const totalElement = document.querySelector(".total-price table tr:nth-child(3) td:nth-child(2)");

    if (!cartContainer) {
        console.error("Cart container is missing in HTML.");
        return;
    }

    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    const renderCart = () => {
        // Clear existing content
        cartContainer.innerHTML = `
            <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Subtotal</th>
                <th>Action</th>
            </tr>
        `;

        if (cartItems.length === 0) {
            if (emptyCartMessage) emptyCartMessage.style.display = "block";
            if (subtotalElement) subtotalElement.textContent = "$0.00";
            if (taxElement) taxElement.textContent = "$0.00";
            if (totalElement) totalElement.textContent = "$0.00";
            return;
        }

        if (emptyCartMessage) emptyCartMessage.style.display = "none";

        let subtotal = 0;

        cartItems.forEach((item, index) => {
            const itemSubtotal = item.price * item.quantity;
            subtotal += itemSubtotal;

            const cartRow = document.createElement("tr");
            cartRow.dataset.index = index;
            cartRow.innerHTML = `
                <td>
                    <div class="cart-info">
                        <img src="${item.image}" alt="${item.name}" width="80">
                        <div>
                            <p>${item.name}</p>
                            <small>Price: $${item.price.toFixed(2)}</small><br>
                            <small>Color: ${item.color}</small>
                        </div>
                    </div>
                </td>
                <td>
                    <button class="decrease-qty" data-index="${index}">-</button>
                    <input type="number" value="${item.quantity}" min="1" readonly>
                    <button class="increase-qty" data-index="${index}">+</button>
                </td>
                <td>$${itemSubtotal.toFixed(2)}</td>
                <td><button class="remove-btn" data-index="${index}">Remove</button></td>
            `;

            cartContainer.appendChild(cartRow);
        });

        // Calculate and display totals
        const tax = subtotal * 0.07; // Assuming 7% tax
        const total = subtotal + tax;

        if (subtotalElement) subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
        if (taxElement) taxElement.textContent = `$${tax.toFixed(2)}`;
        if (totalElement) totalElement.textContent = `$${total.toFixed(2)}`;
    };

    renderCart();
});
