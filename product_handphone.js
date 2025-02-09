document.addEventListener("DOMContentLoaded", function () {
  const saveButtons = document.querySelectorAll(".save-listing");

  saveButtons.forEach(button => {
      button.addEventListener("click", function () {
          const productCard = this.closest(".product-card");

          if (!productCard) {
              console.error("Product card not found!");
              return;
          }

          const productId = productCard.dataset.id;
          const productName = productCard.dataset.name;
          const productImage = productCard.dataset.image;
          const productPrice = productCard.dataset.price;

          console.log("Product Data:", { productId, productName, productImage, productPrice });

          if (!productId || !productName || !productImage || !productPrice) {
              console.error("Product data missing!");
              return;
          }

          let likedItems = JSON.parse(localStorage.getItem("likedItems")) || [];

          if (!likedItems.some(item => item.id === productId)) {
              likedItems.push({ id: productId, name: productName, image: productImage, price: productPrice });
              localStorage.setItem("likedItems", JSON.stringify(likedItems));
              console.log("Item saved:", likedItems);
              alert("Item saved!");
          } else {
              alert("Item already saved!");
          }
      });
  });
});


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


