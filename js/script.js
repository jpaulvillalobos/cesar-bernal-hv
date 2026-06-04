/**
 * LOBOLINK CAREER STUDIO - CORE ENGINE (EDICIÓN MULTI-IDIOMA BLINDADA)
 * Versión de diagnóstico y producción 100% libre de bloqueos de DOM.
 */

document.addEventListener("DOMContentLoaded", () => {
    /**
     * DETECCIÓN DINÁMICA DE IDIOMA ULTRA-COMPATIBLE:
     * Funciona tanto en servidores locales (Live Server) como abriendo el archivo directamente.
     */
    let dataUrl = "data/data.json";
    const currentPath = window.location.pathname.toLowerCase();
    
    if (currentPath.includes("index-en.html") || currentPath.includes("index-en")) {
        dataUrl = "data/data-en.json";
    }
    
    // Inicializar el motor de datos
    fetchCyberData(dataUrl);
});

async function fetchCyberData(url) {
    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`Código HTTP: ${response.status}. Verifica que el archivo JSON exista en la ruta correcta.`);
        }
        
        const data = await response.json();
        
        // Inyección controlada y segura de componentes (Cero bloqueos)
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
        
        // Inicialización de efectos visuales de la terminal
        initializeCyberAnimations();
        initializeScrollSpy();
        
    } catch (error) {
        console.error("❌ [LOBOLINK CORE ERROR]: ", error.message);
        
        const debugBanner = document.getElementById("client-name");
        if (debugBanner) {
            debugBanner.style.color = "#ff3333";
            debugBanner.innerText = "CRITICAL_ERROR";
        }
        
        const summaryBanner = document.getElementById("client-summary");
        if (summaryBanner) {
            summaryBanner.innerHTML = `<span style="color: #ff3333; font-family: monospace;">Fallo de enlace a matriz: ${error.message}</span>`;
        }
    }
}

function renderProfileInfo(personal, perfilProfesional) {
    // 1. Textos principales del perfil
    const elName = document.getElementById("client-name");
    if (elName) elName.textContent = personal.nombre_completo;

    const elTitle = document.getElementById("client-title");
    if (elTitle) elTitle.textContent = personal.titular_profesional;

    const elSummary = document.getElementById("client-summary");
    if (elSummary) elSummary.textContent = perfilProfesional;

    // 2. Bloque de contacto lateral/inferior
    const elEmail = document.getElementById("client-email");
    if (elEmail) elEmail.textContent = personal.email;

    const elPhone = document.getElementById("client-phone");
    if (elPhone) elPhone.textContent = personal.telefono || personal.telephone || "N/A";

    const elLocation = document.getElementById("client-location");
    if (elLocation) elLocation.textContent = personal.ubicacion || personal.location;

    // 3. Hub de Redes Sociales (Asegura que se carguen siempre sin importar errores externos)
    const linkedinLink = document.getElementById("client-linkedin");
    if (linkedinLink && personal.linkedin) linkedinLink.href = personal.linkedin;

    const githubLink = document.getElementById("client-github");
    if (githubLink && personal.github) githubLink.href = personal.github;

    /**
     * PROTECCIÓN DE BOTÓN SUPERIOR:
     * Si usas el ID viejo o el nuevo, el JS valida su existencia antes de intentar escribir en él.
     * Si no lo encuentra, continúa ejecutando el resto de iconos sin colapsar.
     */
    const whatsappLink = document.getElementById("whatsapp-top-link");
    if (whatsappLink && personal.whatsapp_url) {
        if (!window.location.pathname.toLowerCase().includes("index-en")) {
            whatsappLink.href = personal.whatsapp_url;
        }
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
                <div class="edu-year">${edu.año || edu.year}</div>
                <div class="edu-title">${edu.titulo || edu.title}</div>
                <div class="edu-institution">${edu.institucion || edu.institution}</div>
            </div>`).join("");
    }
    
    const certContainer = document.getElementById("certifications-container");
    if (certContainer && certificaciones) {
        certContainer.innerHTML = certificaciones.map(cert => `
            <div class="education-card-cyber reveal-ready">
                <div class="edu-year">${cert.año || cert.year}</div>
                <div class="edu-title">${cert.curso || cert.course}</div>
                <div class="edu-institution">${cert.institucion || cert.institution}</div>
            </div>`).join("");
    }
}

function initializeCyberAnimations() {
    const elements = document.querySelectorAll(".reveal-ready");
    if (!elements.length) return;
    
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