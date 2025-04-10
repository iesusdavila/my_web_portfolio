import { initParticles } from './particles.js';
import { initAnimations } from './animations.js';

// Cargar datos del JSON
async function loadPortfolioData() {
    try {
        const response = await fetch('./data/portfolio.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error loading portfolio data:', error);
        return null;
    }
}

// Theme toggle functionality
function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');

    // Set initial theme to dark by default
    document.body.classList.add('dark-theme');
    document.body.classList.remove('light-theme');
    themeToggle.querySelector('i').textContent = 'dark_mode';

    themeToggle.addEventListener('click', () => {
        if (document.body.classList.contains('dark-theme')) {
            document.body.classList.remove('dark-theme');
            document.body.classList.add('light-theme');
            themeToggle.querySelector('i').textContent = 'light_mode';
        } else {
            document.body.classList.remove('light-theme');
            document.body.classList.add('dark-theme');
            themeToggle.querySelector('i').textContent = 'dark_mode';
        }
    });
}

// Mobile menu functionality
function initMobileMenu() {
    const hamburger = document.querySelector('.nav__hamburger');
    const navLinks = document.querySelector('.nav__links');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    document.querySelectorAll('.nav__link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}

function showSection(targetId) {
    // Ocultar todas las secciones
    document.querySelectorAll('section').forEach(section => {
        section.classList.remove('active');
    });

    // Mostrar la sección seleccionada
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
        targetSection.classList.add('active');
        window.scrollTo(0, 0);
    }
}

// Navigation SPA
function initNavigation() {
    document.querySelectorAll('.view-all-btn, .nav__link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            showSection(targetId);
        });
    });
}

function renderTechStack(technologies) {
    const container = document.getElementById('tech-stack');
    if (!container || !technologies) return;

    container.innerHTML = `
        <h2 class="section__title" style="margin-bottom: 3rem;">Main Technologies</h2>
        <div class="tech-grid">
            ${technologies.map(tech => `
                <div class="tech-item">
                    <img src="${tech.image}" alt="${tech.name}" class="tech-logo">
                    <span class="tech-name">${tech.name}</span>
                </div>
            `).join('')}
        </div>
    `;
}

// Renderizar proyectos destacados
function renderFeaturedProjects(projects) {
    const container = document.getElementById('featured-projects');
    if (!container || !projects?.featured) return;

    const featuredProjects = projects.featured.slice(0, 3);
    const showViewAllButton = projects.featured.length > 3 || (projects.all && projects.all.length > 0);

    container.innerHTML = `
        <h3 style="margin-bottom: 1rem;">Best Projects</h3>
        <div class="grid">
            ${featuredProjects.map(project => `
                <div class="card">
                    <img src="${project.image || '/images/default-project.jpg'}" alt="${project.title}" class="card__image">
                    <div class="card__content">
                        <h3>${project.title}</h3>
                        <p>${project.description}</p>
                        <div class="card__links">
                            ${project.links.github ? `
                                <a href="${project.links.github}" target="_blank" class="btn btn--secondary">
                                    <i class="fab fa-github"></i> GitHub
                                </a>
                            ` : ''}
                            ${project.links.demo ? `
                                <a href="${project.links.demo}" target="_blank" class="btn btn--secondary">
                                    <i class="fas fa-external-link-alt"></i> Demo
                                </a>
                            ` : ''}
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
        ${showViewAllButton ? `
            <a href="#projects" class="btn btn--primary view-all-btn">Ver todos los proyectos</a>
        ` : ''}
    `;
}

// Renderizar investigaciones destacadas
function renderFeaturedResearch(research) {
    const container = document.getElementById('featured-research');
    if (!container || !research?.featured) return;

    const featuredResearch = research.featured.slice(0, 4);
    const showViewAllButton = research.featured.length > 4 || (research.all && research.all.length > 0);

    container.innerHTML = `
        <h3 style="margin-bottom: 1rem;">Best Papers</h3>
        <div class="grid">
            ${featuredResearch.map(paper => `
                <div class="card">
                    <img src="${paper.image || '/images/default-research.jpg'}" alt="${paper.title}" class="card__image">
                    <div class="card__content">
                        <h3>${paper.title}</h3>
                        <p>${paper.description || `Publicado en ${paper.journal}, ${paper.year}`}</p>
                        <div class="card__links">
                            ${paper.links.ieee ? `
                                <a href="${paper.links.ieee}" target="_blank" class="btn btn--secondary">
                                    <i class="fas fa-book"></i> IEEE
                                </a>
                            ` : ''}
                            ${paper.links.github ? `
                                <a href="${paper.links.github}" target="_blank" class="btn btn--secondary">
                                    <i class="fab fa-github"></i> GitHub
                                </a>
                            ` : ''}
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
        ${showViewAllButton ? `
            <a href="#research" class="btn btn--primary view-all-btn">See all papers</a>
        ` : ''}
    `;
}

// Renderizar todos los proyectos
function renderAllProjects(projects) {
    const container = document.querySelector('.projects__grid');
    if (!container || !projects?.all) return;

    container.innerHTML = [...(projects.featured || []), ...(projects.all || [])].map(project => `
        <div class="project-card">
            <img src="${project.image || '/images/default-project.jpg'}" alt="${project.title}" class="project-card__image">
            <div class="project-card__content">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="card__links">
                    ${project.links.github ? `
                        <a href="${project.links.github}" target="_blank" class="btn btn--secondary">
                            <i class="fab fa-github"></i> GitHub
                        </a>
                    ` : ''}
                    ${project.links.demo ? `
                        <a href="${project.links.demo}" target="_blank" class="btn btn--secondary">
                            <i class="fas fa-external-link-alt"></i> Demo
                        </a>
                    ` : ''}
                </div>
            </div>
        </div>
    `).join('');
}

// Renderizar todas las investigaciones
function renderAllResearch(research) {
    const container = document.querySelector('.research__grid');
    if (!container || !research?.all) return;

    container.innerHTML = [...(research.featured || []), ...(research.all || [])].map(paper => `
        <div class="research-card">
            <img src="${paper.image || '/images/default-research.jpg'}" alt="${paper.title}" class="research-card__image">
            <div class="research-card__content">
                <h3>${paper.title}</h3>
                <p>${paper.journal} (${paper.year})</p>
                <div class="card__links">
                    ${paper.links.ieee ? `
                        <a href="${paper.links.ieee}" target="_blank" class="btn btn--secondary">
                            <i class="fas fa-book"></i> IEEE
                        </a>
                    ` : ''}
                    ${paper.links.github ? `
                        <a href="${paper.links.github}" target="_blank" class="btn btn--secondary">
                            <i class="fab fa-github"></i> GitHub
                        </a>
                    ` : ''}
                </div>
            </div>
        </div>
    `).join('');
}

// Renderizar CV
function renderCV(cvData) {
    const cvContent = document.querySelector('.cv__content');
    if (!cvContent || !cvData) return;

    cvContent.innerHTML = `
        <div class="cv__section">
            <h3>Experience</h3>
            ${cvData.experience.map(exp => `
                <div class="cv__item">
                    <h4>${exp.position}</h4>
                    <p>${exp.company}</p>
                    <p>${exp.period}</p>
                    <p>${exp.description}</p>
                </div>
            `).join('')}
        </div>
        <div class="cv__section">
            <h3>Education</h3>
            ${cvData.education.map(edu => `
                <div class="cv__item">
                    <h4>${edu.degree}</h4>
                    <p>${edu.institution}</p>
                    <p>${edu.year}</p>
                    <p>${edu.description || ''}</p>
                </div>
            `).join('')}
        </div>
    `;
}

// Renderizar premios destacados
function renderFeaturedAwards(awards) {
    const container = document.getElementById('featured-awards');
    if (!container || !awards?.featured) return;

    const featuredAwards = awards.featured.slice(0, 4);
    const showViewAllButton = awards.featured.length > 4 ||
                            (awards.prizes && awards.prizes.length > 0) ||
                            (awards.certifications && awards.certifications.length > 0);

    container.innerHTML = `
        <h3 style="margin-bottom: 1rem;">Awards</h3>
        <div class="grid">
            ${featuredAwards.map(award => `
                <div class="card">
                    <h3>${award.title}</h3>
                    <p>${award.organization}</p>
                    <p>${award.year}</p>
                </div>
            `).join('')}
        </div>
        ${showViewAllButton ? `
            <a href="#awards" class="btn btn--primary view-all-btn">Ver todos los premios</a>
        ` : ''}
    `;
}

// Renderizar todos los premios y certificaciones
function renderAwards(awards) {
    const prizesContainer = document.querySelector('.awards__prizes');
    const certificationsContainer = document.querySelector('.awards__certifications');
    if (!prizesContainer || !certificationsContainer || !awards) return;

    // Renderizar premios
    prizesContainer.innerHTML = `
        <h3>Premios</h3>
        ${awards.prizes.map(prize => `
            <div class="award-card">
                <h4>${prize.title}</h4>
                <p>${prize.organization}</p>
                <p>${prize.year}</p>
            </div>
        `).join('')}
    `;

    // Renderizar certificaciones
    certificationsContainer.innerHTML = `
        <h3>Certificaciones</h3>
        ${awards.certifications.map(cert => `
            <div class="award-card">
                <h4>${cert.name}</h4>
                <p>${cert.issuer}</p>
                <p>${cert.date}</p>
                ${cert.link ? `<a href="${cert.link}" target="_blank" class="btn btn--secondary">Ver Credencial</a>` : ''}
            </div>
        `).join('')}
    `;
}

// Inicialización
document.addEventListener('DOMContentLoaded', async () => {
    // Inicializar efectos visuales
    initParticles();
    initAnimations();
    initMobileMenu();
    initThemeToggle();

    // Show home section by default
    showSection('home');

    // Cargar y renderizar datos
    const portfolioData = await loadPortfolioData();
    if (portfolioData) {
        renderTechStack(portfolioData.personal.technologies);

        // Renderizar secciones destacadas
        renderFeaturedProjects(portfolioData.projects);
        renderFeaturedResearch(portfolioData.research);
        renderFeaturedAwards(portfolioData.awards);

        // Renderizar secciones completas
        renderAllProjects(portfolioData.projects);
        renderAllResearch(portfolioData.research);
        renderCV(portfolioData.cv);
        renderAwards(portfolioData.awards);
    }

    initNavigation();

    // Event listener para botón de descarga CV
    const downloadButton = document.getElementById('downloadCV');
    if (downloadButton && portfolioData?.cv?.pdfUrl) {
        downloadButton.addEventListener('click', () => {
            window.open(portfolioData.cv.pdfUrl, '_blank');
        });
    }
});