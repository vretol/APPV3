// Función para abrir los popups
function abrirLoginModal() {
    document.getElementById('loginModal').style.display = 'flex';
  }
  
  function abrirAgregarProductoModal() {
    document.getElementById('addProductModal').style.display = 'flex';
  }
  
  function abrirPopup(popupId) {
    document.getElementById(popupId).style.display = 'flex';
  }
  
  function cerrarPopup(popupId) {
    document.getElementById(popupId).style.display = 'none';
  }
  
  // Funciones de Registro e Inicio de Sesión
  function registrarse() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    if (username && password) {
      localStorage.setItem('user', JSON.stringify({ username, password, role: username === 'admin' ? 'admin' : 'user' }));
      alert('Registro exitoso');
      cerrarPopup('loginModal');
      verificarUsuario();
    } else {
      alert('Por favor, complete todos los campos.');
    }
  }
  
  function iniciarSesion() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const storedUser = JSON.parse(localStorage.getItem('user'));
  
    if (storedUser && storedUser.username === username && storedUser.password === password) {
      alert('Inicio de sesión exitoso');
      cerrarPopup('loginModal');
      verificarUsuario();
    } else {
      alert('Usuario o contraseña incorrectos');
    }
  }
  
  function verificarUsuario() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      if (user.role === 'admin') {
        document.getElementById('admin-button').style.display = 'block';
      }
    }
  }
  
  // Función para agregar productos
  function agregarProducto() {
    const imageUrl = document.getElementById('productImageUrl').value;
    const name = document.getElementById('productName').value;
    const price = parseFloat(document.getElementById('productPrice').value);
    const expirationDate = document.getElementById('productExpirationDate').value;
  
    if (imageUrl && name && price && expirationDate) {
      const today = new Date();
      const expiry = new Date(expirationDate);
      let discount = 0;
  
      // Calcula el descuento si la fecha de vencimiento es cercana (30 días o menos)
      if ((expiry - today) / (1000 * 60 * 60 * 24) <= 7) {
        discount = 50; // 50% de descuento
      }
  
      const finalPrice = (price * (1 - discount / 100)).toFixed(2);
      const discountText = discount ? ` (${discount}% de descuento)` : '';
      
      const product = {
        imageUrl,
        name,
        price,
        finalPrice,
        expirationDate,
        discountText,
      };
  
      // Guardar producto en localStorage
      const existingProducts = JSON.parse(localStorage.getItem('products')) || [];
      existingProducts.push(product);
      localStorage.setItem('products', JSON.stringify(existingProducts));
  
      // Mostrar producto en la interfaz
      const productGrid = document.getElementById('product-grid');
      const newProduct = `
        <div class="product-card" data-name="${name.toLowerCase()}">
          <img src="${imageUrl}" alt="${name}">
          <p class="discount-percentage">${discountText}</p>
          <p class="original-price">$${price.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</p>
          <p class="price">$${finalPrice} COP</p>
          <p class="product-name">${name}</p>
          <p class="size">Fecha de vencimiento: ${expirationDate}</p>
          <button>Agregar</button>
        </div>
      `;
      
      productGrid.innerHTML += newProduct;
      cerrarPopup('addProductModal');
    } else {
      alert('Por favor, complete todos los campos.');
    }
  }
  
  // Función para cargar productos guardados en localStorage
  function cargarProductos() {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const productGrid = document.getElementById('product-grid');
    products.forEach(product => {
      const newProduct = `
        <div class="product-card" data-name="${product.name.toLowerCase()}">
          <img src="${product.imageUrl}" alt="${product.name}">
          <p class="discount-percentage">${product.discountText}</p>
          <p class="original-price">$${product.price.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</p>
          <p class="price">$${product.finalPrice} COP</p>
          <p class="product-name">${product.name}</p>
          <p class="size">Fecha de vencimiento: ${product.expirationDate}</p>
          <button>Agregar</button>
        </div>
      `;
      productGrid.innerHTML += newProduct;
    });
  }
  
  // Función de búsqueda de productos
  function buscarProducto() {
    const searchInput = document.getElementById('search-input').value.toLowerCase();
    const products = document.querySelectorAll('.product-card');
  
    products.forEach(product => {
      const productName = product.getAttribute('data-name').toLowerCase();
      if (productName.includes(searchInput)) {
        product.style.display = 'block';
      } else {
        product.style.display = 'none';
      }
    });
  }
  
  // Funciones para abrir los popups de Términos y Condiciones y Miembros del Proyecto
  function abrirTerminosYCondiciones() {
    abrirPopup('terminosModal');
  }
  
  function abrirMiembrosDelProyecto() {
    abrirPopup('miembrosModal');
  }
  
  // Verificar usuario y cargar productos al cargar la página
  window.onload = function() {
    verificarUsuario();
    cargarProductos();
  };
  
  