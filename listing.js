document.getElementById('createListingForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const category = document.getElementById('category').value;
  const itemName = document.getElementById('itemName').value;
  const itemDescription = document.getElementById('itemDescription').value;
  const itemPrice = document.getElementById('itemPrice').value;
  const itemPhoto = document.getElementById('itemPhoto').files[0];

  if (itemPhoto) {
      const reader = new FileReader();
      reader.onload = function(e) {
          const photoURL = e.target.result;
          displayListing(category, itemName, itemDescription, itemPrice, photoURL);
      };
      reader.readAsDataURL(itemPhoto);
  }
});

function displayListing(category, itemName, itemDescription, itemPrice, photoURL) {
  const output = document.getElementById('listingOutput');
  output.innerHTML = `
      <h2>Your Listing:</h2>
      <p><strong>Category:</strong> ${category}</p>
      <p><strong>Item Name:</strong> ${itemName}</p>
      <p><strong>Description:</strong> ${itemDescription}</p>
      <p><strong>Price:</strong> $${itemPrice}</p>
      <img src="${photoURL}" alt="${itemName}" style="width: 100%; max-height: 200px; object-fit: cover;">
  `;
}

// Preview image when selecting a file
document.getElementById('itemPhoto').addEventListener('change', function(event) {
  const file = event.target.files[0];
  const preview = document.getElementById('previewImage');
  
  if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
          preview.src = e.target.result;
          preview.style.display = 'block';
      };
      reader.readAsDataURL(file);
  } else {
      preview.style.display = 'none';
  }
});
