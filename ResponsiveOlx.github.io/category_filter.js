
function displayProductsByCategory(category) {
    var data = {}; // Will replace with updated product data
    var container = document.getElementById("productsContainer");
    container.innerHTML = "";
    data.forEach(function (item) {
        if (item.category === category) {
            container.innerHTML += `
                <div class="product-card">
                    <h3>${item.product}</h3>
                    <img src="${item.image1}" alt="${item.product}">
                    <p>Price: ${item.price}</p>
                    <p>${item.description}</p>
                    <button onclick="showProductDetails(${JSON.stringify(item).replace(/"/g, '&quot;')})">View Details</button>
                </div>`;
        }
    });
}
