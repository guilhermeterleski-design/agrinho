// DATA MANAGEMENT - Conteúdo dinâmico
const solucoesData = [
    { titulo: "Agricultura de Precisão", desc: "Uso de drones e sensores para otimizar insumos." },
    { titulo: "Recuperação de Solo", desc: "Técnicas biológicas para restaurar áreas degradadas." },
    { titulo: "Gestão Hídrica", desc: "Sistemas inteligentes de irrigação com desperdício zero." }
];

const faqData = [
    { q: "Como o Agro contribui para o clima?", a: "Através do plantio direto e integração lavoura-pecuária-floresta." },
    { q: "O que é tecnologia verde?", a: "São inovações que aumentam a produtividade reduzindo o impacto ambiental." }
];

// RENDERIZADORES
function init() {
    const cardContainer = document.getElementById('cards-container');
    solucoesData.forEach(item => {
        cardContainer.innerHTML += `
            <article class="card scroll-reveal">
                <h3>${item.titulo}</h3>
                <p>${item.desc}</p>
            </article>
        `;
    });

    const faqContainer = document.getElementById('faq-container');
    faqData.forEach((item, index) => {
        faqContainer.innerHTML += `
            <div class="accordion-item">
                <button class="accordion-header" aria-expanded="false" onclick="toggleAccordion(this)">
                    ${item.q}
                </button>
                <div class="accordion-content">
                    <p style="padding-bottom: 1rem;">${item.a}</p>
                </div>
            </div>
        `;
    });
    
    setupScrollReveal();
}

// ACESSIBILIDADE: CONTROLE DE FONTE
let currentFontSize = 100;
function changeFontSize(action) {
    currentFontSize += (action === 'increase' ? 10 : -10);
    document.documentElement.style.fontSize = `${currentFontSize}%`;
}

// ACESSIBILIDADE: ALTO CONTRASTE
function toggleContrast() {
    document.body.classList.toggle('high-contrast');
}

// COMPONENTE: ACORDEÃO
function toggleAccordion(btn) {
    const content = btn.nextElementSibling;
    const isExpanded = btn.getAttribute('aria-expanded') === 'true';
    
    btn.setAttribute('aria-expanded', !isExpanded);
    content.style.maxHeight = isExpanded ? '0' : content.scrollHeight + 'px';
}

// COMPONENTE: CARROSSEL SIMPLES
let currentSlide = 0;
document.querySelector('.next')?.addEventListener('click', () => {
    const track = document.getElementById('carousel-track');
    const slides = document.querySelectorAll('.slide');
    currentSlide = (currentSlide + 1) % slides.length;
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
});

// COMPONENTE: SCROLL REVEAL
function setupScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.scroll-reveal').forEach(el => {
        el.classList.add('reveal-hidden');
        observer.observe(el);
    });
}

window.onload = init;
