/**
 * AURA GLOW - MAIN.JS (VERSIÓN FINAL CONSOLIDADA)
 * Incluye: PWA + Carrito con Modal + Interfaz Interactiva
 */

// 1. REGISTRO DEL SERVICE WORKER
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(reg => console.log('✅ PWA: Service Worker activo'))
            .catch(err => console.error('❌ PWA: Error', err));
    });
}

// 2. LÓGICA PRINCIPAL
document.addEventListener('DOMContentLoaded', () => {
    
    // VARIABLES DE ESTADO
    let carrito = [];

    // ELEMENTOS DEL DOM
    const cartCount = document.querySelector('#cart-count');
    const cartIcon = document.querySelector('.cart-container');
    const modal = document.querySelector('#cart-modal');
    const closeModal = document.querySelector('.close-modal');
    const cartItemsContainer = document.querySelector('#cart-items');
    const totalPriceElement = document.querySelector('#total-price');
    const botonesAdd = document.querySelectorAll('.btn-add');
    const menuToggle = document.querySelector('#mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    // --- FUNCIONES DEL CARRITO ---

    function actualizarContador() {
        if (cartCount) {
            cartCount.innerText = carrito.length;
            cartCount.classList.add('bump');
            setTimeout(() => cartCount.classList.remove('bump'), 300);
        }
    }

    function renderCarrito() {
        if (!cartItemsContainer) return;
        
        cartItemsContainer.innerHTML = "";
        let total = 0;

        if (carrito.length === 0) {
            cartItemsContainer.innerHTML = "<p style='text-align:center; padding:20px;'>Tu carrito está vacío.</p>";
        } else {
            carrito.forEach((prod) => {
                total += prod.precio;
                cartItemsContainer.innerHTML += `
                    <div class="cart-item" style="display:flex; justify-content:space-between; padding:10px 0; border-bottom:1px solid #333;">
                        <span>${prod.nombre}</span>
                        <span style="color: #e5b3a3;">$${prod.precio.toFixed(2)}</span>
                    </div>
                `;
            });
        }
        if (totalPriceElement) {
            totalPriceElement.innerText = `$${total.toFixed(2)}`;
        }
    }

    // --- EVENTOS ---

    // Agregar productos
    botonesAdd.forEach(boton => {
        boton.addEventListener('click', (e) => {
            const card = e.target.closest('.card');
            const producto = {
                id: Date.now(),
                nombre: card.querySelector('h3').innerText,
                precio: parseFloat(card.querySelector('.price').innerText.replace('$', ''))
            };

            carrito.push(producto);
            actualizarContador();

            // Feedback visual en el botón
            const originalText = boton.innerText;
            boton.innerText = "¡Agregado! ✓";
            boton.style.backgroundColor = "#4CAF50";
            setTimeout(() => {
                boton.innerText = originalText;
                boton.style.backgroundColor = "";
            }, 1000);
        });
    });

    // Abrir Modal al dar clic en el icono del carrito
    if (cartIcon) {
        cartIcon.addEventListener('click', () => {
            renderCarrito();
            modal.style.display = "block";
        });
    }

    // Cerrar Modal
    if (closeModal) {
        closeModal.addEventListener('click', () => {
            modal.style.display = "none";
        });
    }

    // Cerrar al dar clic fuera del cuadro
    window.addEventListener('click', (e) => {
        if (e.target == modal) {
            modal.style.display = "none";
        }
    });

    // Menú móvil
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Scroll suave para links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

});