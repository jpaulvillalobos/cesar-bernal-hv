/**
 * LOBOLINK CAREER STUDIO - PORTFOLIO ENGINE (EDICIÓN MULTI-IDIOMA DEFINTIVA)
 * Controlador asíncrono polimórfico para la Terminal de Proyectos de Cesar Bernal.
 */

document.addEventListener("DOMContentLoaded", () => {
    /**
     * DETECCIÓN INFAVIBLE DE IDIOMA BASADA EN EL DOM:
     * En lugar de leer la URL que puede variar según el servidor, el script lee directamente 
     * el atributo 'lang' de la etiqueta <html> del archivo que lo mandó a llamar.
     */
    const htmlLanguage = document.documentElement.lang.toLowerCase();
    
    let finalUrl = "data/portafolio.json"; // Ruta por defecto (Español)
    
    if (htmlLanguage === "en" || window.location.pathname.toLowerCase().includes("en")) {
        finalUrl = "data/portafolio-en.json"; // Cambia al repositorio en Inglés
    }
    
    // Inicializar la petición con la ruta correcta determinada por el entorno
    fetchPortfolioData(finalUrl);
});

/**
 * Petición asíncrona de la matriz de proyectos seleccionada
 */
async function fetchPortfolioData(url) {
    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`Código HTTP: ${response.status}. No se encontró el repositorio JSON correspondiente.`);
        }
        
        const projectsData = await response.json();
        
        // Renderizar la grilla extendida pasándole el origen de los datos
        renderProjectsGrid(projectsData);
        
        // Disparar hilos visuales para las tarjetas inyectadas
        initializeProjectAnimations();
        
    } catch (error) {
        console.error("❌ [PORTFOLIO ENGINE FAILURE]: ", error.message);
        
        const gridContainer = document.getElementById("portfolio-grid");
        if (gridContainer) {
            gridContainer.innerHTML = `
                <div class="mono-text" style="color: #ff3333; grid-column: 1 / -1; padding: 2rem; border: 1px dashed #ff3333; background: rgba(255,0,0,0.05);">
                    [CRITICAL_FAILURE]::FALLO_AL_MONTAR_REPOSITORIO <br>
                    Detalle del sistema: ${error.message}
                </div>
            `;
        }
    }
}

/**
 * Procesa la inyección masiva en la grilla aprovechando las clases nativas del CSS
 */
function renderProjectsGrid(projects) {
    const gridContainer = document.getElementById("portfolio-grid");
    if (!gridContainer) return;
    
    // Detección interna para las etiquetas fijas de las tarjetas
    const htmlLanguage = document.documentElement.lang.toLowerCase();
    const isEnglish = (htmlLanguage === "en" || window.location.pathname.toLowerCase().includes("en"));
    
    const logImpactLabel = isEnglish ? "// LOG_IMPACT:" : "// LOG_DE_IMPACTO:";
    
    let htmlBuffer = "";
    
    projects.forEach(project => {
        // Mapear los tags tecnológicos convirtiéndolos en píldoras de diseño
        const tagsHTML = project.tags.map(tag => `<span class="skill-tag">${tag}</span>`).join("");
        
        // Inyectar la tarjeta adaptando las clases del CSS global para mantener herencia estética exacta
        htmlBuffer += `
            <div class="skill-module-card reveal-ready" style="display: flex; flex-direction: column; justify-content: space-between; height: 100%;">
                <div>
                    <div style="width: 100%; height: 160px; overflow: hidden; border-radius: 8px; margin-bottom: 1.5rem; border: 1px solid rgba(255,255,255,0.05); background: #060b11;">
                        <img src="${project.imagen_url}" alt="${project.titulo}" style="width: 100%; height: 100%; object-fit: cover; opacity: 0.75; transition: opacity 0.3s;" onerror="this.style.display='none'; this.parentNode.innerHTML='<div class=\\'mono-text\\' style=\\'display:flex;align-items:center;justify-content:center;height:100%;color:var(--text-muted);font-size:0.8rem;\\'>[IMAGE_OFFLINE_SOURCE]</div>'">
                    </div>
                    
                    <div class="skill-card-header" style="margin-bottom: 1rem;">
                        <i class="${project.icono}" style="color: var(--accent-green); font-size: 1.5rem; text-shadow: 0 0 10px var(--accent-green-glow);"></i>
                        <h3 style="font-family: var(--font-tech); font-size: 1.15rem; color: var(--text-main); margin-top: 0.2rem;">${project.titulo}</h3>
                    </div>
                    
                    <p style="font-family: var(--font-body); font-size: 0.85rem; color: var(--text-muted); line-height: 1.6; margin-bottom: 1.5rem; text-align: left;">
                        ${project.descripcion}
                    </p>
                </div>
                
                <div>
                    <div style="border-top: 1px solid rgba(255,255,255,0.05); padding-top: 1rem; margin-bottom: 1rem; text-align: left;">
                        <div class="mono-text" style="font-size: 0.7rem; color: #00ffcc; margin-bottom: 0.3rem;">${logImpactLabel}</div>
                        <div style="font-size: 0.8rem; font-family: var(--font-body); color: var(--text-main); font-weight: 500;">
                            ${Object.values(project.metricas)[0]}
                        </div>
                    </div>
                    
                    <div class="skills-tags-container" style="justify-content: flex-start; gap: 6px;">
                        ${tagsHTML}
                    </div>
                </div>
            </div>
        `;
    });
    
    gridContainer.innerHTML = htmlBuffer;
}

/**
 * Implementación de IntersectionObserver para animaciones fluidas de aparición en pantalla
 */
function initializeProjectAnimations() {
    const cards = document.querySelectorAll(".reveal-ready");
    if (!cards.length) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("reveal-active");
            }
        });
    }, { rootMargin: "0px 0px -20px 0px", threshold: 0.05 });
    
    cards.forEach(card => observer.observe(card));
}