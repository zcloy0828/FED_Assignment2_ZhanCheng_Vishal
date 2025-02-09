document.addEventListener("DOMContentLoaded", function () {
  const likedItemsContainer = document.querySelector(".liked-items-container");
  let likedItems = JSON.parse(localStorage.getItem("likedItems")) || [];

  if (likedItems.length === 0) {
      likedItemsContainer.innerHTML = "<p>No saved items yet!</p>";
  } else {
      likedItems.forEach(item => {
          let itemHTML = `
              <div class="liked-product-card">
                  <img src="${item.image}" alt="${item.name}">
                  <h4>${item.name}</h4>
                  <p>$${item.price}</p>
                  <button class="remove-listing" data-id="${item.id}">❌ Remove</button>
              </div>
          `;
          likedItemsContainer.innerHTML += itemHTML;
      });
  }

  // Remove item from liked list
  document.querySelectorAll(".remove-listing").forEach(button => {
      button.addEventListener("click", function () {
          let productId = this.dataset.id;
          likedItems = likedItems.filter(item => item.id !== productId);
          localStorage.setItem("likedItems", JSON.stringify(likedItems));
          location.reload(); // Refresh to update UI
      });
  });
});
