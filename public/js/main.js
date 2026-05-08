document.addEventListener('DOMContentLoaded', () => {
    

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js');
    }


    const especificaciones = {
        "Iluminador": "Brillo perlado de alta gama. Define y resalta tus facciones con un acabado natural.",
        "Sombra Negra": "Pigmentación extrema mate. Ideal para efectos de profundidad y smokey eyes.",
        "Rubor": "Tono Frambuesa vibrante. Textura sedosa que aporta frescura al rostro.",
        "Base": "Cobertura construible con acabado satinado. Hidratación constante durante 24 horas."
    };

    let carrito = [];
    const cartCount = document.getElementById('cart-count');

    document.querySelectorAll('.open-details').forEach(el => {
        el.onclick = (e) => {
            const card = e.target.closest('.card');
            const titulo = card.querySelector('h3').innerText;
            
            document.getElementById('detail-title').innerText = titulo;
            document.getElementById('detail-img').src = card.querySelector('img').src;
            document.getElementById('detail-price').innerText = card.querySelector('.price').innerText;
            document.getElementById('detail-desc').innerText = especificaciones[titulo] || "Sin descripción.";
            
            document.getElementById('product-modal').style.display = "block";
        };
    });

    document.querySelectorAll('.btn-add').forEach(btn => {
        btn.onclick = (e) => {
            const card = e.target.closest('.card');
            carrito.push({
                nombre: card.querySelector('h3').innerText,
                precio: parseFloat(card.querySelector('.price').innerText.replace('$', ''))
            });
            
           
            cartCount.innerText = carrito.length;
            cartCount.classList.add('bump');
            setTimeout(() => cartCount.classList.remove('bump'), 300);

            
            btn.innerText = "¡Agregado!";
            setTimeout(() => btn.innerText = "Añadir al carrito", 1000);
        };
    });


    document.getElementById('open-cart').onclick = () => {
        const cartList = document.getElementById('cart-items-list');
        const totalPrice = document.getElementById('total-price');
        cartList.innerHTML = "";
        let total = 0;

        if(carrito.length === 0) {
            cartList.innerHTML = "<p style='text-align:center; padding:20px;'>Tu carrito está vacío.</p>";
        } else {
            carrito.forEach(item => {
                total += item.precio;
                cartList.innerHTML += `<div class="cart-item-row"><span>${item.nombre}</span><span>$${item.precio.toFixed(2)}</span></div>`;
            });
        }
        totalPrice.innerText = `$${total.toFixed(2)}`;
        document.getElementById('cart-modal').style.display = "block";
    };

    document.getElementById('close-cart').onclick = () => document.getElementById('cart-modal').style.display = "none";
    document.getElementById('close-product').onclick = () => document.getElementById('product-modal').style.display = "none";

    window.onclick = (e) => {
        if (e.target.className === 'modal') {
            document.getElementById('cart-modal').style.display = "none";
            document.getElementById('product-modal').style.display = "none";
        }
    };
});