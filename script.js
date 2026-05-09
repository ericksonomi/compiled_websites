// ========================================
// FORM HANDLING
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    const registrationForm = document.getElementById('registrationForm');
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');
    const errorText = document.getElementById('errorText');

    if (registrationForm) {
        registrationForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            if (errorMessage) {
                errorMessage.style.display = 'none';
            }

            // Collect form data
            const formData = new FormData(this);
            const registroData = {
                nombre_completo: formData.get('nombre'),
                telefono_whatsapp: formData.get('telefono'),
                correo_electronico: formData.get('email'),
                empresa_marca: formData.get('empresa') || '',
                ciudad: formData.get('ciudad'),
                tipo_participante: formData.get('tipo'),
                interes_invertir: Boolean(formData.get('interes_invertir')),
                interes_comprar_villa: Boolean(formData.get('interes_comprar_villa')),
                interes_comprar_lote: Boolean(formData.get('interes_comprar_lote')),
                interes_conocer_proyectos: Boolean(formData.get('interes_conocer_proyectos')),
                interes_networking: Boolean(formData.get('interes_networking')),
                interes_participar_broker: Boolean(formData.get('interes_participar_broker')),
                interes_conocer_sponsors: Boolean(formData.get('interes_conocer_sponsors')),
                interes_participar_premios: Boolean(formData.get('interes_participar_premios')),
                dias_asistencia: formData.get('dias'),
                comentario_adicional: formData.get('comentario') || ''
            };

            try {
                const response = await fetch('https://dev-sorteosys.onrender.com/crm/registro_fede', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(registroData)
                });

                if (!response.ok) {
                    const errorBody = await response.text();
                    throw new Error(`Error ${response.status}: ${errorBody}`);
                }

                // Show success message
                this.style.display = 'none';
                if (successMessage) {
                    successMessage.style.display = 'block';
                }

                // Reset form
                setTimeout(() => {
                    this.reset();
                    this.style.display = 'block';
                    if (successMessage) {
                        successMessage.style.display = 'none';
                    }
                    
                    // Scroll to top
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }, 3000);
            } catch (error) {
                console.error('Error:', error);
                if (errorText) {
                    errorText.textContent = 'No se pudo completar tu registro. Por favor vuelve a intentarlo en unos segundos.';
                }
                if (errorMessage) {
                    errorMessage.style.display = 'block';
                }
            }
        });
    }
});

// ========================================
// FAQ ACCORDION
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        if (question) {
            question.addEventListener('click', function() {
                // Close other items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });

                // Toggle current item
                item.classList.toggle('active');
            });
        }
    });
});

// ========================================
// SMOOTH SCROLLING
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========================================
// NAVBAR SCROLL EFFECT
// ========================================
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        navbar.style.boxShadow = '0 4px 30px rgba(0, 35, 73, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 20px rgba(0, 35, 73, 0.08)';
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// ========================================
// MODAL FUNCTIONS
// ========================================
function openModal() {
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.classList.add('active');
    }
}

function closeModal() {
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const modal = document.getElementById('successModal');
    if (event.target === modal) {
        closeModal();
    }
});

// ========================================
// ANIMATION ON SCROLL
// ========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0px)';
        }
    });
}, observerOptions);

document.querySelectorAll('.activity-card, .about-card, .award-card, .contact-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ========================================
// FORM VALIDATION
// ========================================
const inputs = document.querySelectorAll('input, select, textarea');
inputs.forEach(input => {
    input.addEventListener('invalid', function(e) {
        e.preventDefault();
        this.style.borderColor = '#FF6B6B';
    });

    input.addEventListener('input', function() {
        if (this.validity.valid) {
            this.style.borderColor = 'rgba(0, 175, 173, 0.2)';
        }
    });
});

// ========================================
// WHATSAPP BUTTON FUNCTIONALITY
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    const whatsappButton = document.querySelector('.whatsapp-button');
    
    if (whatsappButton) {
        // Add hover animation
        whatsappButton.addEventListener('mouseenter', function() {
            this.style.animation = 'pulse 1s infinite';
        });
        
        whatsappButton.addEventListener('mouseleave', function() {
            this.style.animation = 'none';
        });
    }
});

// ========================================
// BUTTON ACTIONS
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    // Botón "Consulta cómo participar"
    const consultaButtons = document.querySelectorAll('.awards-cta .btn-primary');
    consultaButtons.forEach(btn => {
        if (btn && btn.textContent.includes('Consulta')) {
            btn.addEventListener('click', function() {
                const message = "Hola, deseo conocer cómo puedo participar en los premios del Festival Inmobiliario de Las Terrenas.";
                window.open(`https://wa.me/18299081444?text=${encodeURIComponent(message)}`);
            });
        }
    });

    // Botón "Cómo llegar"
    const mapButton = document.querySelector('.location-detail .btn-primary');
    if (mapButton) {
        mapButton.addEventListener('click', function() {
            window.open('https://maps.google.com/?q=FEDE+Real+Estate+Las+Terrenas+Samaná');
        });
    }
});

// ========================================
// MOBILE MENU (si lo necesitas en futuras mejoras)
// ========================================
function toggleMobileMenu() {
    const menu = document.querySelector('.navbar-menu');
    if (menu) {
        menu.classList.toggle('active');
    }
}

// ========================================
// HELPER FUNCTION: Track registrations locally
// ========================================
function saveRegistrationLocally(data) {
    let registrations = JSON.parse(localStorage.getItem('festivalRegistrations')) || [];
    registrations.push(data);
    localStorage.setItem('festivalRegistrations', JSON.stringify(registrations));
}

// ========================================
// DYNAMIC CONTENT LOADER (si necesitas actualizar sponsors después)
// ========================================
function loadSponsors() {
    // Este endpoint podría conectarse a una API real en el futuro
    console.log('Sponsors loaded');
}

// ========================================
// ANIMATIONS & EFFECTS
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    // Add pulse animation for WhatsApp button
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0% {
                box-shadow: 0 8px 25px rgba(0, 175, 173, 0.35);
            }
            50% {
                box-shadow: 0 12px 35px rgba(0, 175, 173, 0.5);
            }
            100% {
                box-shadow: 0 8px 25px rgba(0, 175, 173, 0.35);
            }
        }
    `;
    document.head.appendChild(style);
});

// ========================================
// LAZY LOAD IMAGES (optional performance)
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
});

console.log('FEDE Festival - Script loaded successfully');
