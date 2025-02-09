var MenuItems = document.getElementById("MenuItems");

MenuItems.style.maxHeight = "0px";

function menutoggle(){
    if(MenuItems.style.maxHeight == "0px")
    {
        MenuItems.style.maxHeight = "200px";
    }
    else
    {
        MenuItems.style.maxHeight = "0px";
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    const saveButtons = document.querySelectorAll(".save-listing");

    saveButtons.forEach(button => {
        button.addEventListener("click", function () {
            const productCard = this.closest(".product-card");
            const productId = productCard.dataset.id;
            const productName = productCard.dataset.name;
            const productImage = productCard.dataset.image;
            const productPrice = productCard.dataset.price;

            let likedItems = JSON.parse(localStorage.getItem("likedItems")) || [];

            // Check if the product is already saved
            if (!likedItems.some(item => item.id === productId)) {
                likedItems.push({ id: productId, name: productName, image: productImage, price: productPrice });
                localStorage.setItem("likedItems", JSON.stringify(likedItems));
                alert("Item saved!");
            } else {
                alert("Item already saved!");
            }
        });
    });
});
