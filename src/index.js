// write your code here
document.addEventListener('DOMContentLoaded', function () {
    const ramenMenu = document.querySelector('#ramen-menu');
    const ramenDetail = document.querySelector('#ramen-detail');
    const newRamenForm = document.querySelector('#new-ramen');
    const editRamenForm = document.querySelector('#edit-ramen');
  
    let ramenData = []; // To store the fetched ramen objects
  
    // Function to fetch ramen data from the server
    function fetchRamenData() {
      // Make a GET request to the server's endpoint to fetch ramen objects
      fetch('/ramens')
        .then(response => response.json())
        .then(data => {
          ramenData = data; // Store the fetched ramen objects
          displayRamenImages(); // Display the ramen images
          displayRamenDetails(ramenData[0]); // Display details for the first ramen
        })
        .catch(error => {
          console.error('Error fetching ramen data:', error);
        });
    }
  
    // Function to display the ramen images in the #ramen-menu div
    function displayRamenImages() {
      // Clear the ramen menu before appending new images
      ramenMenu.innerHTML = '';
  
      // Iterate over the ramen data and create <img> tags for each ramen
      ramenData.forEach(ramen => {
        const img = document.createElement('img');
        img.src = ramen.imageUrl;
        img.addEventListener('click', () => displayRamenDetails(ramen));
        ramenMenu.appendChild(img);
      });
    }
  
    // Function to display ramen details in the #ramen-detail div
    function displayRamenDetails(ramen) {
      ramenDetail.innerHTML = `
        <h2>${ramen.name}</h2>
        <img src="${ramen.imageUrl}">
        <p>Restaurant: ${ramen.restaurant}</p>
        <p>Rating: ${ramen.rating}</p>
        <p>Comment: ${ramen.comment}</p>
      `;
      // Set the form values for updating rating and comment
      document.querySelector('#new-rating').value = ramen.rating;
      document.querySelector('#new-comment').value = ramen.comment;
    }
  
    // Function to handle form submission for creating a new ramen
    newRamenForm.addEventListener('submit', function (event) {
      event.preventDefault();
  
      const imageUrl = document.querySelector('#image-url').value;
      // Retrieve other ramen fields as needed
  
      // Create a new ramen object
      const newRamen = {
        imageUrl: imageUrl,
        // Other ramen fields: name, restaurant, etc.
      };
  
      // Add the new ramen to the ramen data and display the images
      ramenData.push(newRamen);
      displayRamenImages();
  
      // Clear the form
      this.reset();
    });
  
    // Function to handle form submission for updating rating and comment
    editRamenForm.addEventListener('submit', function (event) {
      event.preventDefault();
  
      const newRating = document.querySelector('#new-rating').value;
      const newComment = document.querySelector('#new-comment').value;
  
      // Update the rating and comment for the currently displayed ramen
      const currentRamen = ramenData[0]; // Assuming the first ramen is displayed
      currentRamen.rating = newRating;
      currentRamen.comment = newComment;
  
      // Update the ramen details
      displayRamenDetails(currentRamen);
    });
  
    // Initial fetch of ramen data
    fetchRamenData();
  });