// Dados de exemplo (em um aplicativo real, esses dados viriam de um backend)
const products = [
    { id: 1, name: 'Pizza Margherita', price: 35.90, category: 'Pizzas', image: '/placeholder.svg?height=200&width=200', popular: true, new: false, restaurant: 'Pizzaria Capixaba', location: 'Vila Velha' },
    { id: 2, name: 'Hambúrguer Clássico', price: 25.90, category: 'Lanches', image: '/placeholder.svg?height=200&width=200', popular: true, new: false, restaurant: 'Burguer ES', location: 'Vitória' },
    { id: 3, name: 'Refrigerante Cola', price: 5.00, category: 'Bebidas', image: '/placeholder.svg?height=200&width=200', popular: true, new: false, restaurant: 'Bebidas do ES', location: 'Serra' },
    { id: 4, name: 'Salada Caesar', price: 22.90, category: 'Saudável', image: '/placeholder.svg?height=200&width=200', popular: false, new: true, restaurant: 'Vida Saudável', location: 'Vitória' },
    { id: 5, name: 'Sushi Combo', price: 45.90, category: 'Japonesa', image: '/placeholder.svg?height=200&width=200', popular: true, new: true, restaurant: 'Sushi Capixaba', location: 'Vila Velha' },
    { id: 6, name: 'Feijoada', price: 32.90, category: 'Pratos Feitos', image: '/placeholder.svg?height=200&width=200', popular: true, new: false, restaurant: 'Sabor Capixaba', location: 'Cariacica' },
    { id: 7, name: 'Coxinha', price: 4.50, category: 'Salgados', image: '/placeholder.svg?height=200&width=200', popular: true, new: false, restaurant: 'Salgados ES', location: 'Serra' },
    { id: 8, name: 'Açaí na Tigela', price: 18.90, category: 'Sobremesas', image: '/placeholder.svg?height=200&width=200', popular: true, new: false, restaurant: 'Açaí do ES', location: 'Vitória' },
    { id: 9, name: 'Moqueca Capixaba', price: 49.90, category: 'Pratos Feitos', image: '/placeholder.svg?height=200&width=200', popular: true, new: false, restaurant: 'Sabor Capixaba', location: 'Vila Velha' },
    { id: 10, name: 'Torta Capixaba', price: 39.90, category: 'Pratos Feitos', image: '/placeholder.svg?height=200&width=200', popular: false, new: true, restaurant: 'Delícias Capixabas', location: 'Vitória' },
];

const promotions = [
    { id: 1, name: 'Combo Pizza + Refrigerante', price: 39.90, image: '/placeholder.svg?height=200&width=200', category: 'Pizzas', restaurant: 'Pizzaria Capixaba', location: 'Vila Velha' },
    { id: 2, name: 'Hambúrguer Duplo', price: 29.90, image: '/placeholder.svg?height=200&width=200', category: 'Lanches', restaurant: 'Burguer ES', location: 'Vitória' },
    { id: 3, name: 'Refrigerante 2L', price: 8.90, image: '/placeholder.svg?height=200&width=200', category: 'Bebidas', restaurant: 'Bebidas do ES', location: 'Serra' },
    { id: 4, name: 'Combo Sushi 30 peças', price: 59.90, image: '/placeholder.svg?height=200&width=200', category: 'Japonesa', restaurant: 'Sushi Capixaba', location: 'Vila Velha' },
    { id: 5, name: 'Feijoada para 2', price: 54.90, image: '/placeholder.svg?height=200&width=200', category: 'Pratos Feitos', restaurant: 'Sabor Capixaba', location: 'Cariacica' },
    { id: 6, name: 'Kit 10 Salgados', price: 25.90, image: '/placeholder.svg?height=200&width=200', category: 'Salgados', restaurant: 'Salgados ES', location: 'Serra' },
    { id: 7, name: 'Sobremesa do Dia', price: 12.90, image: '/placeholder.svg?height=200&width=200', category: 'Sobremesas', restaurant: 'Delícias Capixabas', location: 'Vitória' },
];

let cart = [];

// Função para renderizar produtos
function renderProducts(filter = 'all') {
    const productGrid = document.getElementById('product-grid');
    productGrid.innerHTML = '';
    let filteredProducts = products;

    if (filter !== 'all') {
        filteredProducts = products.filter(product => 
            product.name.toLowerCase().includes(filter.toLowerCase()) ||
            product.category.toLowerCase().includes(filter.toLowerCase()) ||
            (filter === 'popular' && product.popular) ||
            (filter === 'new' && product.new)
        );
    }

    if (filteredProducts.length === 0) {
        productGrid.innerHTML = '<p>Produto indisponível</p>';
        return;
    }

    filteredProducts.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product-item');
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <h3>${product.name}</h3>
            <p>R$ ${product.price.toFixed(2)}</p>
            <p>${product.restaurant} - ${product.location}</p>
            <button onclick="addToCart(${product.id})" class="cta-button">Adicionar ao Carrinho</button>
        `;
        productGrid.appendChild(productElement);
    });
}

// Função para renderizar promoções
function renderPromotions() {
    const promotionGrid = document.getElementById('promotion-grid');
    promotionGrid.innerHTML = '';
    promotions.forEach(promotion => {
        const promotionElement = document.createElement('div');
        promotionElement.classList.add('promotion-item');
        promotionElement.innerHTML = `
            <img src="${promotion.image}" alt="${promotion.name}" class="promotion-image">
            <h3>${promotion.name}</h3>
            <p>R$ ${promotion.price.toFixed(2)}</p>
            <p>${promotion.restaurant} - ${promotion.location}</p>
            <button onclick="addPromotionToCart(${promotion.id})" class="cta-button">Aproveitar Oferta</button>
        `;
        promotionGrid.appendChild(promotionElement);
    });
}

// Função para renderizar categorias
function renderCategories() {
    const categoryGrid = document.getElementById('category-grid');
    const categories = ['Pizzas', 'Lanches', 'Bebidas', 'Pratos Feitos', 'Salgados', 'Sobremesas'];
    categoryGrid.innerHTML = '';
    categories.forEach((category, index) => {
        const categoryElement = document.createElement('div');
        categoryElement.classList.add('category-item');
        categoryElement.innerHTML = `
            <img src="/placeholder.svg?height=200&width=200" alt="Ícone de ${category}" class="category-icon">
            <h3>${category}</h3>
        `;
        categoryElement.addEventListener('click', () => {
            renderProducts(category.toLowerCase());
            document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
        });
        categoryGrid.appendChild(categoryElement);
    });
}

// Função para adicionar ao carrinho
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push({ ...product, quantity: 1 });
        updateCart();
        openCartSidebar();
    }
}

// Função para adicionar promoção ao carrinho
function addPromotionToCart(promotionId) {
    const promotion = promotions.find(p => p.id === promotionId);
    if (promotion) {
        cart.push({ ...promotion, quantity: 1 });
        updateCart();
        openCartSidebar();
    }
}

// Função para atualizar o carrinho
function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const cartSubtotal = document.getElementById('cart-subtotal');
    const deliveryFee = document.getElementById('delivery-fee');
    const cartTotal = document.getElementById('cart-total-value');
    const cartCount = document.getElementById('cart-count');
    
    cartItems.innerHTML = '';
    let subtotal = 0;

    cart.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-details">
                <p class="cart-item-name">${item.name}</p>
                <p class="cart-item-price">R$ ${item.price.toFixed(2)}</p>
            </div>
            <div class="cart-item-quantity">
                <button onclick="updateQuantity(${index}, -1)">-</button>
                <span>${item.quantity}</span>
                <button onclick="updateQuantity(${index}, 1)">+</button>
            </div>
            <button onclick="removeFromCart(${index})" class="remove-button">Remover</button>
        `;
        cartItems.appendChild(itemElement);
        subtotal += item.price * item.quantity;
    });

    const fee = subtotal > 0 ? 5 : 0; // Taxa de entrega fixa de R$ 5,00
    const total = subtotal + fee;

    cartSubtotal.textContent = subtotal.toFixed(2);
    deliveryFee.textContent = fee.toFixed(2);
    cartTotal.textContent = total.toFixed(2);
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
}

// Função para atualizar a quantidade de um item no carrinho
function updateQuantity(index, change) {
    cart[index].quantity += change;
    if (cart[index].quantity < 1) {
        cart.splice(index, 1);
    }
    updateCart();
}

// Função para remover do carrinho
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

// Função para abrir o carrinho lateral
function openCartSidebar() {
    document.getElementById('cart').classList.add('open');
}

// Função para fechar o carrinho lateral
function closeCartSidebar() {
    document.getElementById('cart').classList.remove('open');
}

// Função para calcular o tempo estimado de entrega
function calculateEstimatedDeliveryTime(userLocation, restaurantLocation) {
    const baseTime = 30; // Tempo base em minutos
    const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
    const additionalTime = Math.floor(itemCount / 3) * 5; // Adiciona 5 minutos a cada 3 itens

    // Simula a distância entre o usuário e o restaurante
    const locations = ['Vitória', 'Vila Velha', 'Serra', 'Cariacica'];
    const userIndex = locations.indexOf(userLocation);
    const restaurantIndex = locations.indexOf(restaurantLocation);
    const distance = Math.abs(userIndex - restaurantIndex);

    const deliveryTime = baseTime + additionalTime + (distance * 10); // Adiciona 10 minutos por "unidade" de distância

    return deliveryTime;
}

// Função para formatar o número de telefone
function formatPhoneNumber(input) {
    const cleaned = input.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);
    if (match) {
        return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
    return input;
}

// Função para formatar o CEP
function formatCEP(input) {
    const cleaned = input.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{5})(\d{3})$/);
    if (match) {
        return match[1] + '-' + match[2];
    }
    return input;
}

// Evento para finalizar o pedido
document.getElementById('checkout-button').addEventListener('click', () => {
    document.getElementById('checkout-modal').style.display = 'block';
});

// Evento para fechar o modal
document.querySelector('.close').addEventListener('click', () => {
    document.getElementById('checkout-modal').style.display = 'none';
});

// Evento para confirmar o pedido
document.getElementById('checkout-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const cep = document.getElementById('cep').value;
    const address = document.getElementById('address').value;
    const houseNumber = document.getElementById('house-number').value;
    const paymentMethod = document.getElementById('payment-method').value;

    if (!name || !phone || !cep || !address || !houseNumber || !paymentMethod) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }

    const userLocation = 'Vitória'; // Simulando a localização do usuário
    const restaurantLocation = cart[0].location; // Usando a localização do primeiro item do carrinho
    const estimatedTime = calculateEstimatedDeliveryTime(userLocation, restaurantLocation);

    const orderDetails = `
        <h3>Detalhes do Pedido:</h3>
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>Telefone:</strong> ${phone}</p>
        <p><strong>CEP:</strong> ${cep}</p>
        <p><strong>Endereço:</strong> ${address}</p>
        <p><strong>Número da Casa:</strong> ${houseNumber}</p>
        <p><strong>Método de Pagamento:</strong> ${paymentMethod}</p>
        <p><strong>Total:</strong> R$ ${document.getElementById('cart-total-value').textContent}</p>
        <h3>Itens do Pedido:</h3>
        <ul>
            ${cart.map(item => `<li>${item.name} x${item.quantity} - R$ ${(item.price * item.quantity).toFixed(2)}</li>`).join('')}
        </ul>
    `;

    document.getElementById('order-details').innerHTML = orderDetails;
    document.getElementById('estimated-delivery-time').innerHTML = `<p>Tempo estimado de entrega: ${estimatedTime} minutos</p>`;

    document.getElementById('checkout-modal').style.display = 'none';
    document.getElementById('order-confirmation').style.display = 'block';

    // Aqui você normalmente enviaria os dados para um servidor
    cart = [];
    updateCart();
    closeCartSidebar();
});

// Adicionar eventos aos botões de filtro
document.querySelectorAll('.filter-button').forEach(button => {
    button.addEventListener('click', () => {
        document.querySelectorAll('.filter-button').forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        renderProducts(button.dataset.filter);
    });
});

// Adicionar evento para o botão do carrinho
document.querySelector('.cart-icon-button').addEventListener('click', () => {
    const cart = document.getElementById('cart');
    if (cart.classList.contains('open')) {
        closeCartSidebar();
    } else {
        openCartSidebar();
    }
});

// Adicionar evento para o campo de busca
document.getElementById('search-button').addEventListener('click', () => {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    renderProducts(searchTerm);
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
});

// Adicionar evento para formatar o número de telefone
document.getElementById('phone').addEventListener('input', function(e) {
    e.target.value = formatPhoneNumber(e.target.value);
});

// Adicionar evento para formatar o CEP
document.getElementById('cep').addEventListener('input', function(e) {
    e.target.value = formatCEP(e.target.value);
});

// Adicionar evento para fechar a confirmação do pedido
document.getElementById('close-confirmation').addEventListener('click', () => {
    document.getElementById('order-confirmation').style.display = 'none';
});

// Inicializar a página
document.addEventListener('DOMContentLoaded', () => {
    renderCategories();
    renderProducts();
    renderPromotions();
});

// Adicione a seguinte função para buscar o endereço pelo CEP:
function searchAddressByCEP() {
    const cep = document.getElementById('cep').value.replace(/\D/g, '');
    if (cep.length !== 8) {
        alert('CEP inválido');
        return;
    }

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => response.json())
        .then(data => {
            if (data.erro) {
                alert('CEP não encontrado');
            } else {
                document.getElementById('address').value = `${data.logradouro}, ${data.bairro}, ${data.localidade} - ${data.uf}`;
            }
        })
        .catch(error => {
            console.error('Erro ao buscar CEP:', error);
            alert('Erro ao buscar CEP. Por favor, tente novamente.');
        });
}

// Adicione um event listener para o campo de CEP
document.getElementById('cep').addEventListener('blur', searchAddressByCEP);