// Log a message to confirm the script has loaded successfully
console.log("script.js loaded");
// Select the container where GIFs will be displayed
const gifContainer = document.querySelector("#gif-container");
// Select the button that triggers the GIF fetch
const fetchButton = document.querySelector("#fetch-gif-btn");
// Select the input field where users type their search term
const searchInput = document.querySelector("#search-input");
// Add a click event listener to the button
// The function is marked async so we can use await inside it
fetchButton.addEventListener("click", async function () {
  // Get the user's search term and remove extra whitespace
  const searchTerm = searchInput.value.trim();
  // If the input is empty, show an alert and stop the function
  if (!searchTerm) {
    alert("Please enter a search term!");
    return;
  }
  // 🌐 Build the Giphy API URL dynamically using the search term
  const endpoint = `https://api.giphy.com/v1/gifs/search?api_key=YhfM3v3TpTURAzFwANhlAly9pdkKW7ca&q=${searchTerm}&limit=25&offset=0&rating=g&lang=en&bundle=messaging_non_clips`;
  try {
    // 📡 Fetch data from the Giphy API
    const response = await fetch(endpoint);
    // 📦 Convert the response to JSON format
    const data = await response.json();
    // 🖼️ Extract the original image URLs from the response data
    const images = data.data.map(gif => gif.images.original.url);
    // 🧹 Clear any previously displayed GIFs
    gifContainer.innerHTML = "";
    // 🔁 Loop through each image URL and add it to the page
    for (let url of images) {
      gifContainer.innerHTML += `<img src="${url}" class="col-3 mb-3 img-fluid">`;
    }
    // 🧪 Log the search term and image URLs to the console for debugging
    console.log(`Search term: ${searchTerm}`);
    console.log(images);
  } catch (error) {
    // ⚠️ If something goes wrong, log the error to the console
    console.error("Error fetching GIFs:", error);
  }
});
