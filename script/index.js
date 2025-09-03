// Damiano Apartment - JavaScript Functions
// Gestisce tutte le funzioni interattive del sito

let currentIndex = 0;
const images = [
    "img/gallery/image00008.jpg",
    "img/gallery/image00009.jpg",
    "img/gallery/image00010.jpg",
    "img/gallery/image00011.jpg",
    "img/gallery/image00012.jpg",
    "img/gallery/image00013.jpg",
    "img/gallery/image000014.jpg",
];

// Inizializzazione al caricamento della pagina
document.addEventListener('DOMContentLoaded', function() {
    // Inizializza AOS (Animate On Scroll)
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });
    
    // Inizializza navbar scroll effect
    initNavbarScrollEffect();
    
    // Inizializza smooth scrolling per i link interni
    initSmoothScrolling();
    
    // Inizializza il lightbox
    initLightbox();
});

// === NAVBAR FUNCTIONS ===

/**
 * Toggle del menu mobile
 */
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    mobileMenu.classList.toggle('hidden');
}

/**
 * Effetto navbar al scroll
 */
function initNavbarScrollEffect() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('shadow-lg');
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            navbar.classList.remove('shadow-lg');
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        }
    });
}

/**
 * Inizializza smooth scrolling per tutti i link interni
 */
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// === GALLERY FUNCTIONS ===

/**
 * Inizializza il sistema lightbox per la galleria
 */
function initLightbox() {
    // Crea il lightbox se non esiste
    if (!document.getElementById('lightboxModal')) {
        const lightboxHTML = `
            <div id="lightboxModal" class="hidden fixed inset-0 z-50 flex items-center justify-center bg-black/75 animate-fadeIn">
                <span class="absolute top-4 right-9 text-white text-4xl font-bold cursor-pointer z-[1001] hover:text-gray-300 transition-colors" onclick="closeLightbox()">&times;</span>
                <button class="absolute left-0 top-1/2 -translate-y-1/2 bg-black/75 bg-opacity-50 text-white text-3xl px-2.5 py-2.5 cursor-pointer border-none hover:bg-black/50 rounded z-[1001]" onclick="prevImage()">&lt;</button>
                <div class="relative max-w-[90%] max-h-[90%] flex justify-center items-center">
                    <img id="lightboxImage" src="" alt="" class="max-w-full max-h-[80vh] rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] object-contain">
                </div>
                <button class="absolute right-0 top-1/2 -translate-y-1/2 bg-black/75 bg-opacity-50 text-white text-3xl px-2.5 py-2.5 cursor-pointer border-none hover:bg-black/50 rounded" onclick="nextImage()">&gt;</button>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', lightboxHTML);
    }
}

/**
 * Apre il lightbox con l'immagine specificata
 * @param {number} index - numero di immagine da mostrare
 */
function openLightbox(index) {
    currentIndex = index;
    showImage();
    const lightbox = document.getElementById('lightboxModal');
    lightbox.classList.remove('hidden');
    lightbox.classList.add('flex');
    document.body.style.overflow = 'hidden';
}

function showImage() {
    const lightboxImage = document.getElementById('lightboxImage');
    lightboxImage.src = images[currentIndex];
    lightboxImage.alt = `Immagine ${currentIndex + 1}`;
}

function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage();
}

function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    showImage();
}

/**
 * Chiude il lightbox
 */
function closeLightbox() {
    const lightbox = document.getElementById('lightboxModal');
    lightbox.classList.add('hidden');
    lightbox.classList.remove('flex');
    document.body.style.overflow = 'auto'; // Ripristina scroll del body
}

/**
 * Chiude il lightbox quando si clicca fuori dall'immagine
 */
document.addEventListener('click', function(e) {
    const lightbox = document.getElementById('lightboxModal');
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// === BOOKING FUNCTIONS ===

/**
 * Apre la pagina Booking.com (da sostituire con URL reale)
 */
function openBooking() {
    // In un'implementazione reale, sostituire con il link effettivo della proprietà
    const bookingUrl = 'https://www.booking.com';
    
    window.open(bookingUrl, '_blank');
}

/**
 * Apre la pagina Airbnb (da sostituire con URL reale)
 */
function openAirbnb() {
    // In un'implementazione reale, sostituire con il link effettivo della proprietà
    const airbnbUrl = 'https://www.airbnb.it';
    
    window.open(airbnbUrl, '_blank');
}

/**
 * Apre il form di richiesta preventivo via email
 */
function requestQuoteMail() {
    const email = 'damiano.apartment@gmail.com';
    const subject = 'Richiesta Preventivo - Damiano Apartment';
    const body = `Gentile Staff del Damiano Apartment,

sono interessato/a a prenotare il vostro appartamento e vorrei ricevere un preventivo personalizzato.

Dettagli del soggiorno:
- Date di arrivo: [Inserire data]
- Date di partenza: [Inserire data]
- Numero di ospiti: [Inserire numero]
- Esigenze particolari: [Inserire eventuali richieste]

Grazie per la vostra disponibilità.

Cordiali saluti`;

    const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoUrl;
}

/**
 * Apre il form di richiesta preventivo via telefono
 */
function requestQuotePhone() {
    const phone = '+393534884032';
    
    const phoneUrl = `tel:${phone}`;
    
    window.location.href = phoneUrl;
}

// === UTILITY FUNCTIONS ===



/**
 * Gestisce i tasti di scorciatoia
 */
document.addEventListener('keydown', function(e) {
    // Chiudi lightbox con ESC
    if (e.key === 'Escape') {
        const lightbox = document.getElementById('lightboxModal');
        if (lightbox && lightbox.style.display === 'block') {
            closeLightbox();
        }
    }
});

/**
 * Lazy loading per le immagini (ottimizzazione performance)
 */
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// === PERFORMANCE MONITORING ===

/**
 * Monitora le performance della pagina
 */
function monitorPerformance() {
    window.addEventListener('load', () => {
        // Misura il tempo di caricamento
        const loadTime = performance.now(); 
        console.log(`Page load time: ${loadTime}ms`);
        
        // Monitora Core Web Vitals se supportato
        if ('web-vital' in window) {
            // Implementa qui il monitoraggio dei Core Web Vitals
        }
    });
}

// Inizializza il monitoraggio delle performance
monitorPerformance();