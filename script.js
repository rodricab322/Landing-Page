document.addEventListener('DOMContentLoaded', () => {

    // 1. INTERSECTION OBSERVER FOR SCROLL ANIMATIONS
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Activa cuando el 15% del elemento es visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Dejamos de observar una vez que se animó para que no se repita
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.section-animate');
    animatedElements.forEach(el => observer.observe(el));

    // 2. FORM VALIDATION & SUBMISSION SIMULATION
    const orderForm = document.getElementById('orderForm');

    if (orderForm) {
        orderForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Recoger datos
            const formData = new FormData(orderForm);
            const data = Object.fromEntries(formData);

            const submitBtn = orderForm.querySelector('.btn-submit');
            const originalText = submitBtn.textContent;

            // Número de WhatsApp de la tienda (Incluye código de país sin el símbolo +)
            const phoneNumber = "51975119584"; // <-- ¡CAMBIA ESTE NÚMERO POR EL TUYO!

            // Crear el mensaje formateado
            const mensajeOriginal = data.mensaje ? `\n\n*Mensaje extra:* ${data.mensaje}` : '';
            const whatsappText = `¡Hola CheBR! ⚽🎁\n\nQuiero hacer un pedido especial por el Día del Padre:\n*Nombre:* ${data.nombre}\n*Modelo elegido:* ${data.modelo}\n*Correo:* ${data.correo}${mensajeOriginal}\n\n¡Quedo atento(a) para finalizar la compra!`;

            // Codificar el texto para la URL
            const encodedText = encodeURIComponent(whatsappText);

            // Construir la URL de WhatsApp
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedText}`;

            // Mostrar el modal de éxito
            const modal = document.getElementById('successModal');
            if (modal) {
                modal.classList.add('show');
            }

            submitBtn.textContent = '¡Procesando...!';
            submitBtn.disabled = true;

            // Esperar 2.5 segundos para que lean el modal, luego redirigir y limpiar
            setTimeout(() => {
                // Abrir WhatsApp en una nueva pestaña
                window.open(whatsappUrl, '_blank');

                // Ocultar modal
                if (modal) {
                    modal.classList.remove('show');
                }

                // Resetear el formulario
                orderForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2500);
        });
    }

    // 3. SMOOTH SCROLLING PARA ENLACES INTERNOS
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

});
