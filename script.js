const accessKey = "FCP8LJvtxD6yxQiDSTudbQ5am8l5zXCgtz3u30eizFI"
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchButton');
const imageResults = document.getElementById('imageResults');

searchBtn.addEventListener('click', fetchImages);
searchInput.addEventListener('keypress', handleKeyPress);

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        fetchImages();
    }
}

async function fetchImages() {
    const query = searchInput.value.trim();
    if (!query) return;

    const url = `https://api.unsplash.com/search/photos?query=${query}&per_page=12&client_id=${accessKey}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        imageResults.innerHTML = ''; // Clear previous results
        
        if (!data.results|| data.results.length === 0) {
            imageResults.innerHTML = '<p>No images found. Try another search!</p>';
            return;
        }

        data.results.forEach(image => {
            const imageCard = document.createElement('div');
            imageCard.className = 'image-card';

            const imgElement = document.createElement('img');
            imgElement.src = image.urls.small;
            imgElement.alt = image.alt_description;

            

            imageCard.appendChild(imgElement);
            imageResults.appendChild(imageCard);
        });

    } catch (error) {
        console.error('Error fetching images:', error);
         imageResults.innerHTML = '<p>Failed to load images. Try again later.</p>';
    }
}
