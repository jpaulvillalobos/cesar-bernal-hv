/**
 * LOBOLINK CAREER STUDIO - CORE ENGINE (PLAN EVOLUCIÓN)
 * Versión de diagnóstico corregida 100% libre de errores sintácticos.
 */

document.addEventListener("DOMContentLoaded", () => {
    // Ruta de acceso al archivo local de datos
    const DATA_URL = "data/data.json";
    fetchCyberData(DATA_URL);
});

async function fetchCyberData(url) {
    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`Código HTTP: ${response.status}. Asegúrate de usar un servidor local.`);
        }
        
        const data = await response.json();
        
        // Inyección de componentes
        if (data.informacion_personal) {
            renderProfileInfo(data.informacion_personal, data.perfil_profesional);
        }
        if (data.experiencia_laboral) {
            renderExperience(data.experiencia_laboral);
        }
        if (data.habilidades_modulares) {
            renderSkills(data.habilidades_modulares);
        }
        if (data.educacion_formal || data.certificaciones_cursos) {
            renderEducation(data.educacion_formal, data.certificaciones_cursos);
        }
        
        // Efectos dinámicos
        initializeCyberAnimations();
        initializeScrollSpy();
        
    } catch (error) {
        console.error("Error en la matriz LoboLink: ", error.message);
        
        // CORRECCIÓN LÍNEA 55: Sintaxis limpia usando '=' en lugar de ':'
        const debugBanner = document.getElementById("client-name");
        if (debugBanner) {
            debugBanner.style.color = "#ff6600";
            debugBanner.innerText = "ERROR_DE_SISTEMA";
        }
        
        const summaryBanner = document.getElementById("client-summary");
        if (summaryBanner) {
            summaryBanner.innerHTML = `<span style="color: #ff3333; font-family: monospace;">Fallo: ${error.message}</span>`;
        }
    }
}

function renderProfileInfo(personal, perfilProfesional) {
    const elName = document.getElementById("client-name");
    if (elName) elName.textContent = personal.nombre_completo;

    const elTitle = document.getElementById("client-title");
    if (elTitle) elTitle.textContent = personal.titular_profesional;

    const elSummary = document.getElementById("client-summary");
    if (elSummary) elSummary.textContent = perfilProfesional;

    const elEmail = document.getElementById("client-email");
    if (elEmail) elEmail.textContent = personal.email;

    // CONTROL INTELIGENTE MULTI-IDIOMA PARA EL TELÉFONO:
    // Mapea 'telefono' (Json ES) o 'telephone' si se cambiara en el futuro de forma nativa
    const elPhone = document.getElementById("client-phone");
    if (elPhone) elPhone.textContent = personal.telefono || personal.telephone || "N/A";

    const elLocation = document.getElementById("client-location");
    if (elLocation) elLocation.textContent = personal.ubicacion || personal.location;

    // Actualización de hipervínculos de telecomunicación
    const linkedinLink = document.getElementById("client-linkedin");
    if (linkedinLink) linkedinLink.href = personal.linkedin;

    const githubLink = document.getElementById("client-github");
    if (githubLink) githubLink.href = personal.github;

    const whatsappLink = document.getElementById("whatsapp-top-link");
    // Solo reescribe el href de WhatsApp si no estamos en la página index-en.html
    // Esto evita que destruya el enlace estático hacia 'portafolio-en.html' que pusimos en el header inglés
    if (whatsappLink && !window.location.pathname.includes("index-en.html")) {
        whatsappLink.href = personal.whatsapp_url;
    }
}

function renderExperience(experiencias) {
    const container = document.getElementById("experience-timeline");
    if (!container) return;
    
    let htmlBuffer = "";
    experiencias.forEach(exp => {
        const funcionesHTML = exp.funciones.map(func => `<li>${func}</li>`).join("");
        htmlBuffer += `
            <div class="timeline-item-cyber reveal-ready">
                <div class="timeline-node"></div>
                <div class="timeline-header-block">
                    <div>
                        <h3 class="company-tech">${exp.empresa}</h3>
                        <span class="role-tech">${exp.cargo}</span>
                    </div>
                    <span class="period-badge-cyber">${exp.periodo}</span>
                </div>
                <div class="timeline-body-cyber">
                    <ul>${funcionesHTML}</ul>
                </div>
            </div>`;
    });
    container.innerHTML = htmlBuffer;
}

function renderSkills(habilidades) {
    const container = document.getElementById("skills-grid");
    if (!container) return;
    
    let htmlBuffer = "";
    habilidades.forEach(block => {
        const tagsHTML = block.tecnologias.map(tech => `<span class="skill-tag">${tech}</span>`).join("");
        htmlBuffer += `
            <div class="skill-module-card reveal-ready">
                <div class="skill-card-header">
                    <i class="${block.icono}"></i>
                    <h3>${block.categoria}</h3>
                </div>
                <div class="skills-tags-container">${tagsHTML}</div>
            </div>`;
    });
    container.innerHTML = htmlBuffer;
}

function renderEducation(educacion, certificaciones) {
    const eduContainer = document.getElementById("education-container");
    if (eduContainer && educacion) {
        eduContainer.innerHTML = educacion.map(edu => `
            <div class="education-card-cyber reveal-ready">
                <div class="edu-year">${edu.año}</div>
                <div class="edu-title">${edu.titulo}</div>
                <div class="edu-institution">${edu.institucion}</div>
            </div>`).join("");
    }
    
    const certContainer = document.getElementById("certifications-container");
    if (certContainer && certificaciones) {
        certContainer.innerHTML = certificaciones.map(cert => `
            <div class="education-card-cyber reveal-ready">
                <div class="edu-year">${cert.año}</div>
                <div class="edu-title">${cert.curso}</div>
                <div class="edu-institution">${cert.institucion}</div>
            </div>`).join("");
    }
}

function initializeCyberAnimations() {
    const elements = document.querySelectorAll(".reveal-ready");
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("reveal-active");
            }
        });
    }, { rootMargin: "0px 0px -40px 0px", threshold: 0.05 });
    
    elements.forEach(el => observer.observe(el));
}

function initializeScrollSpy() {
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-link");
    if (!sections.length || !navLinks.length) return;
    
    window.addEventListener("scroll", () => {
        let current = "";
        const scrollPos = window.scrollY + 200;
        
        sections.forEach(section => {
            if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
                current = section.getAttribute("id");
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${current}`) {
                link.classList.add("active");
            }
        });
    }, { passive: true });
}