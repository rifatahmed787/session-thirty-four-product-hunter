const loadAllProducts = async () => {
    const response = await fetch('https://fakestoreapi.com/products');
    const data = await response.json();
    // console.log(data);
    return data;
}

const displayProducts = async () => {
    const data = await loadAllProducts();
    const searchProduct = document.getElementById('search-product');
    uniqueArray = [];
    for (const product of data) {
        if (uniqueArray.indexOf(product.category) === -1) {
            uniqueArray.push(product.category);
            const li = document.createElement('li');
            li.innerHTML = `
            <a>${product.category}</a>
            `;
            searchProduct.appendChild(li);
        }

    }

}
displayProducts();

// loadAllProducts();

const searchField = document.getElementById('search-field');
searchField.addEventListener('keypress', async (event) => {
    if (event.key === 'Enter') {
        const searchValue = searchField.value;
        const allProducts = await loadAllProducts();
        // console.log(allProducts)
        const foundProducts = allProducts.filter(product => product.category.includes(searchValue));
        console.log(foundProducts)

        const productContainer = document.getElementById('product-container');
        const notFound = document.getElementById('not-found');

        productContainer.textContent = '';
        notFound.textContent = '';

        if (foundProducts.length === 0) {
            notFound.innerHTML = `<h3 class="font-bold text-2xl text-orange-400 text-center">Not Found</h3>`
        }

        foundProducts.forEach(product => {
            // console.log(product)

            //distructuring
            const { category, image, id, description, price, rating, title } = product;

            const div = document.createElement('div');
            div.innerHTML = `
            <div class="card card-compact w-full  bg-base-100 shadow-xl">
                <figure><img src="${image}" alt="Shoes" class="h-56 w-full" /></figure>
                <div class="card-body">
                    <h2 class="card-title">${category}</h2>
                     <p>${title.length > 20 ? title.slice(0, 20) + '...' : title}</p>
                    <div class="card-actions justify-end">
                    <label for="my-modal-3" class="btn btn-primary modal-button">Show Details</label>
                    </div>
                </div>
            </div>
            `;
            productContainer.appendChild(div);
        })
    }
})