// Sample tea product data
const teas = [
    { id: 1, name: "Green Tea", price: 2.99, image: "term-project/Media/green-tea.jpg", description: "Refreshing and healthy, rich in antioxidants." },
    { id: 2, name: "Black Tea", price: 9.99, image: "../Media/black-tea.jpg", description: "Bold and robust, perfect for your morning routine." },
    { id: 3, name: "Herbal Tea", price: 14.99, image: "../Media/herbal-tea.jpg", description: "Caffeine-free and calming, a perfect way to unwind." },
    { id: 4, name: "Oolong Tea", price: 18.99, image: "../Media/oolong-tea.jpg", description: "A balanced flavor, perfect for a relaxing afternoon." },
    { id: 5, name: "White Tea", price: 15.99, image: "../Media/white-tea.jpg", description: "Delicate and subtle, a tea for connoisseurs." }
];

const productList = document.getElementById('product-list');
const cartItems = document.getElementById('cart-items');
const totalPriceElement = document.getElementById('total-price');

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function displayProducts() {
    teas.forEach(tea => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML = `
            <img src="${tea.image}" alt="${tea.name}">
            <h3>${tea.name}</h3>
            <p>${tea.description}</p>
            <p>$${tea.price.toFixed(2)}</p>
            <button onclick="addToCart(${tea.id})">Add to Cart</button>
        `;
        productList.appendChild(productDiv);
    });
}

function addToCart(teaId) {
    const tea = teas.find(t => t.id === teaId);
    const cartItem = cart.find(item => item.id === teaId);
    
    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        cart.push({ ...tea, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}

function displayCart() {
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;
        const cartItemDiv = document.createElement('div');
        cartItemDiv.classList.add('cart-item');
        cartItemDiv.innerHTML = `
            <h3>${item.name}</h3>
            <p>Quantity: ${item.quantity}</p>
            <p>Price: $${(item.price * item.quantity).toFixed(2)}</p>
        `;
        cartItems.appendChild(cartItemDiv);
    });

    totalPriceElement.textContent = `Total: $${total.toFixed(2)}`;
}

document.getElementById('checkout').addEventListener('click', () => {
    alert('Thank you for your purchase!');
    cart = [];
    localStorage.removeItem('cart');
    displayCart();
});

window.onload = () => {
    displayProducts();
    displayCart();
};
