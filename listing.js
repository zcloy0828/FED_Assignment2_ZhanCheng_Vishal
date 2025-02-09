document.addEventListener("DOMContentLoaded", function () {
  const photoUpload = document.querySelector(".photo-upload");
  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.accept = "image/*";
  fileInput.style.display = "none";

  photoUpload.addEventListener("click", function () {
      fileInput.click(); // Opens file dialog
  });

  fileInput.addEventListener("change", function (event) {
      const file = event.target.files[0];
      if (file) {
          const reader = new FileReader();
          reader.onload = function (e) {
              photoUpload.style.backgroundImage = `url(${e.target.result})`;
              photoUpload.style.backgroundSize = "cover";
              photoUpload.style.backgroundPosition = "center";
              photoUpload.textContent = ""; // Remove text after upload
          };
          reader.readAsDataURL(file);
      }
  });

  document.body.appendChild(fileInput); // Append hidden file input to body

  document.querySelector(".btn").addEventListener("click", function (event) {
      event.preventDefault(); // Prevent default form submission

      const category = document.getElementById("category").value;
      const itemName = document.getElementById("name").value;
      const description = document.getElementById("description").value;
      const price = document.getElementById("price").value;

      if (!category || !itemName || !description || !price) {
          alert("Please fill in all fields before listing.");
          return;
      }

      const output = document.createElement("div");
      output.innerHTML = `
          <h2>Your Listing</h2>
          <p><strong>Category:</strong> ${category}</p>
          <p><strong>Item Name:</strong> ${itemName}</p>
          <p><strong>Description:</strong> ${description}</p>
          <p><strong>Price:</strong> $${price}</p>
      `;

      if (fileInput.files[0]) {
          const img = document.createElement("img");
          img.src = photoUpload.style.backgroundImage.slice(5, -2);
          img.style.width = "100%";
          img.style.maxHeight = "200px";
          img.style.objectFit = "cover";
          output.appendChild(img);
      }

      document.body.appendChild(output); // Display listing details
  });
});
// Example of handling listing action
document.getElementById("list-item-button").addEventListener("click", function() {
  const category = document.getElementById("category-select").value; // Assuming there's a dropdown or similar for category selection
  const itemData = {
      name: document.getElementById("item-name").value,
      description: document.getElementById("item-description").value,
      price: document.getElementById("item-price").value
  };
  
  // Add item to Firebase or local storage
  // Example: Adding to Firebase (assuming you're using Firebase for storage)
  const dbRef = firebase.database().ref(category); // Select category as database reference
  dbRef.push(itemData); // Push the item data to Firebase
  
  // Redirect to the correct category page after listing the item
  window.location.href = `/category/${category}`; // Redirect to category page (adjust URL structure as needed)
});
