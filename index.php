<?php
// Yeib Tools - Portal Satélite de Micro-Herramientas Gratuitas
// Arquitectura: PHP Puro, Cero Base de Datos, Cero Frameworks (Ultra Veloz)
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0">
    <title>Yeib Tools | Micro-Herramientas Gratuitas & Análisis Forense Local</title>
    <meta name="description" content="Suite ultraliviana de micro-herramientas gratuitas. Transcriptor de YouTube, Lector Forense de Metadatos (Imágenes y PDF), Generador de QR y WhatsApp sin almacenamiento en servidor.">
    <meta name="author" content="Yeib">
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://tools.yeib.cl/">
    <meta property="og:title" content="Yeib Tools | Micro-Herramientas Gratuitas sin Rastreo">
    <meta property="og:description" content="Transcripción de videos, lectura de metadatos forenses en cliente y herramientas de productividad sin subir archivos al servidor.">

    <!-- Fonts Google -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700;800;900&display=swap" rel="stylesheet">

    <!-- Stylesheet -->
    <link rel="stylesheet" href="assets/css/style.css">

    <!-- Favicon SVG Yeib -->
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 32 32%22 fill=%22none%22><linearGradient id=%22yeibGrad%22 x1=%220%25%22 y1=%220%25%22 x2=%22100%25%22 y2=%22100%25%22><stop offset=%220%25%22 stop-color=%22%230d9488%22 /><stop offset=%22100%25%22 stop-color=%22%236366f1%22 /></linearGradient><path d=%22M4 24C9 24 11 12 16 12C21 12 23 6 28 6%22 stroke=%22url(%23yeibGrad)%22 stroke-width=%223.5%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22/><circle cx=%2216%22 cy=%2212%22 r=%223%22 fill=%22%230d9488%22 stroke=%22%23ffffff%22 stroke-width=%222%22/><circle cx=%2228%22 cy=%226%22 r=%223%22 fill=%22%236366f1%22 stroke=%22%23ffffff%22 stroke-width=%222%22/></svg>">
</head>
<body>

    <!-- HEADER PRINCIPAL CON LOGO OFICIAL YEIB -->
    <header class="header">
        <div class="header-inner">
            <a href="/" class="header-brand">
                <div class="logo-wrapper">
                    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <linearGradient id="yeibLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stop-color="#0d9488" />
                                <stop offset="100%" stop-color="#6366f1" />
                            </linearGradient>
                        </defs>
                        <path d="M4 24C9 24 11 12 16 12C21 12 23 6 28 6" stroke="url(#yeibLogoGrad)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                        <circle cx="16" cy="12" r="2.5" fill="#0d9488" stroke="#ffffff" stroke-width="1.5"/>
                        <circle cx="28" cy="6" r="2.5" fill="#6366f1" stroke="#ffffff" stroke-width="1.5"/>
                        <path d="M16 12V24" stroke="#0d9488" stroke-width="1" stroke-dasharray="2 2" stroke-linecap="round"/>
                        <path d="M28 6V24" stroke="#6366f1" stroke-width="1" stroke-dasharray="2 2" stroke-linecap="round"/>
                        <path d="M4 24H28" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round"/>
                    </svg>
                </div>
                <div>
                    <h1 class="brand-title">Yeib <span class="cyan">Tools</span></h1>
                    <p class="brand-subtitle">Suite de Micro-Herramientas Gratuitas & Análisis Forense Local</p>
                </div>
            </a>

            <div class="header-status">
                <div class="privacy-pill">
                    <span class="privacy-dot"></span>
                    <span>100% Privacidad Garantizada</span>
                </div>
            </div>
        </div>
    </header>

    <!-- CONTENIDO PRINCIPAL CON SIDEBAR LATERAL -->
    <main class="main-layout">

        <!-- SECCIÓN DE HERRAMIENTAS -->
        <section class="tools-container">

            <!-- TABS DE NAVEGACIÓN -->
            <div class="tabs-wrapper">
                <button class="tab-btn active" onclick="switchTool('youtube', this)">
                    <span>📺</span> Transcriptor YouTube
                </button>
                <button class="tab-btn" onclick="switchTool('metadata', this)">
                    <span>🕵️‍♂️</span> Metadatos Forenses
                </button>
                <button class="tab-btn" onclick="switchTool('qr', this)">
                    <span>📱</span> Generador QR
                </button>
                <button class="tab-btn" onclick="switchTool('whatsapp', this)">
                    <span>💬</span> Link WhatsApp
                </button>
                <button class="tab-btn" onclick="switchTool('cleaner', this)">
                    <span>📝</span> Limpiador de Texto
                </button>
            </div>

            <!-- PANEL 1: TRANSCRIPTOR DE YOUTUBE -->
            <div id="panel-youtube" class="tool-panel active">
                <div class="panel-header">
                    <h2 class="panel-title"><span>📺</span> Transcriptor de YouTube</h2>
                    <p class="panel-subtitle">Extrae el texto completo y subtítulos con marcas de tiempo usando proxy SOCKS5.</p>
                </div>

                <div class="form-group">
                    <label class="form-label">Ingresa la URL o ID del Video de YouTube</label>
                    <input type="text" id="yt-input" class="form-control" placeholder="Ej: https://www.youtube.com/watch?v=jNQXAC9IVRw">
                </div>

                <button onclick="fetchTranscript()" class="btn-action">
                    ⚡ Obteniendo Transcripción
                </button>

                <div id="yt-status" class="mt-4 hidden"></div>

                <div id="yt-result" class="hidden">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 1.25rem; flex-wrap: wrap; gap: 0.5rem;">
                        <span id="yt-meta-info" style="font-size: 0.75rem; font-weight: 800; color: var(--primary-cyan);"></span>
                        <div style="display: flex; gap: 0.4rem; flex-wrap: wrap;">
                            <button onclick="copyYtText('full')" class="btn-action btn-secondary" style="padding: 0.4rem 0.8rem; font-size: 0.7rem;">📋 Copiar con Tiempos</button>
                            <button onclick="copyYtText('plain')" class="btn-action btn-secondary" style="padding: 0.4rem 0.8rem; font-size: 0.7rem;">📄 Copiar Solo Texto</button>
                            <button onclick="downloadYtText()" class="btn-action btn-secondary" style="padding: 0.4rem 0.8rem; font-size: 0.7rem;">📥 Descargar .TXT</button>
                        </div>
                    </div>
                    <div id="yt-raw-text" class="result-box"></div>
                </div>
            </div>

            <!-- PANEL 2: METADATOS FORENSES (IMÁGENES Y PDF) -->
            <div id="panel-metadata" class="tool-panel">
                <div class="panel-header">
                    <h2 class="panel-title"><span>🕵️‍♂️</span> Lector de Metadatos Forenses (EXIF & PDF)</h2>
                    <p class="panel-subtitle">Inspecciona autor, software, modelo de cámara, fechas e información oculta de tus archivos.</p>
                </div>

                <div class="dropzone" id="metadata-dropzone">
                    <div class="dropzone-icon">📁</div>
                    <h3 style="font-size: 1.05rem; font-weight: 800; margin-bottom: 0.4rem;">Arrastra tu archivo aquí o haz clic para seleccionar</h3>
                    <p style="font-size: 0.775rem; color: var(--text-muted);">Soporta imágenes (JPG, PNG, WEBP) y documentos PDF.</p>
                    <input type="file" id="metadata-file-input" style="display: none;" accept="image/*,application/pdf">
                </div>

                <div style="margin-top: 1rem; background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3); padding: 0.75rem; border-radius: var(--radius-md); font-size: 0.75rem; color: var(--accent-emerald); font-weight: 700;">
                    🔒 <strong>Seguridad Extrema:</strong> El archivo se lee localmente desde la memoria de tu dispositivo. <u>Ningún byte se envía a nuestro servidor</u>.
                </div>

                <div id="metadata-result" class="hidden" style="margin-top: 1.25rem;">
                    <h4 id="metadata-filename" style="font-size: 0.85rem; font-weight: 800; color: var(--primary-teal);"></h4>
                    <div id="metadata-output" class="result-box"></div>
                </div>
            </div>

            <!-- PANEL 3: GENERADOR QR -->
            <div id="panel-qr" class="tool-panel">
                <div class="panel-header">
                    <h2 class="panel-title"><span>📱</span> Generador de Código QR</h2>
                    <p class="panel-subtitle">Genera códigos QR de alta resolución instantáneamente en tu navegador sin guardar datos.</p>
                </div>

                <div class="form-group">
                    <label class="form-label">Texto o URL a Codificar</label>
                    <input type="text" id="qr-text-input" class="form-control" placeholder="Ej: https://tools.yeib.cl/">
                </div>

                <button onclick="generateQrCode()" class="btn-action">
                    🎨 Generar Código QR
                </button>

                <div id="qr-output-container" style="text-align: center; margin-top: 1.75rem;"></div>
            </div>

            <!-- PANEL 4: WHATSAPP LINK -->
            <div id="panel-whatsapp" class="tool-panel">
                <div class="panel-header">
                    <h2 class="panel-title"><span>💬</span> Generador de Enlaces de WhatsApp</h2>
                    <p class="panel-subtitle">Crea un enlace directo para iniciar chats de WhatsApp sin necesidad de guardar contactos.</p>
                </div>

                <div class="form-group">
                    <label class="form-label">Número de Teléfono (con código de país sin +)</label>
                    <input type="text" id="wa-phone" class="form-control" placeholder="Ej: 56912345678">
                </div>

                <div class="form-group">
                    <label class="form-label">Mensaje Pre-llenado (Opcional)</label>
                    <textarea id="wa-message" class="form-control" placeholder="Ej: Hola, vi tu anuncio en internet y quiero cotizar..."></textarea>
                </div>

                <button onclick="generateWhatsappLink()" class="btn-action">
                    🔗 Crear Enlace Directo
                </button>

                <div id="wa-result" class="hidden" style="margin-top: 1.25rem;">
                    <label class="form-label">Tu Enlace Generado:</label>
                    <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
                        <input type="text" id="wa-generated-link" class="form-control" style="flex: 1; min-width: 200px;" readonly>
                        <button onclick="copyWaLink()" class="btn-action btn-secondary">Copiar</button>
                        <a id="wa-test-btn" href="#" target="_blank" class="btn-action">Probar Chat</a>
                    </div>
                </div>
            </div>

            <!-- PANEL 5: LIMPIADOR DE TEXTO -->
            <div id="panel-cleaner" class="tool-panel">
                <div class="panel-header">
                    <h2 class="panel-title"><span>📝</span> Limpiador y Formateador de Texto</h2>
                    <p class="panel-subtitle">Normaliza, convierte a mayúsculas/minúsculas y elimina espacios sobrantes instantáneamente.</p>
                </div>

                <div class="form-group">
                    <label class="form-label">Ingresa tu Texto</label>
                    <textarea id="cleaner-input" class="form-control" placeholder="Pega tu texto aquí..." oninput="updateTextStats()"></textarea>
                </div>

                <div style="display: flex; gap: 0.4rem; flex-wrap: wrap; margin-bottom: 1rem;">
                    <button onclick="processText('upper')" class="btn-action btn-secondary">MAYÚSCULAS</button>
                    <button onclick="processText('lower')" class="btn-action btn-secondary">minúsculas</button>
                    <button onclick="processText('title')" class="btn-action btn-secondary">Modo Título</button>
                    <button onclick="processText('spaces')" class="btn-action btn-secondary">Quitar Dobles Espacios</button>
                    <button onclick="processText('newlines')" class="btn-action btn-secondary">Quitar Saltos de Línea</button>
                    <button onclick="copyCleanerText()" class="btn-action">📋 Copiar Texto</button>
                </div>

                <div style="display: flex; gap: 1.25rem; font-size: 0.775rem; color: var(--text-muted); font-weight: 800; flex-wrap: wrap;">
                    <span>Caracteres: <strong id="text-stat-chars" style="color: var(--primary-teal);">0</strong></span>
                    <span>Palabras: <strong id="text-stat-words" style="color: var(--primary-cyan);">0</strong></span>
                    <span>Líneas: <strong id="text-stat-lines" style="color: var(--primary-indigo);">0</strong></span>
                </div>
            </div>

        </section>


        <!-- SIDEBAR LATERAL PUBLICITARIO & ECOSISTEMA -->
        <aside class="sidebar">

            <!-- WIDGET 1: ECOSISTEMA YEIB -->
            <div class="sidebar-widget">
                <h3 class="widget-title"><span>🌐</span> Ecosistema Yeib</h3>
                <div style="display: flex; flex-direction: column; gap: 0.65rem;">
                    
                    <a href="https://indicadores.yeib.cl" target="_blank" class="eco-card">
                        <div class="eco-card-title">📈 Indicadores y Datos</div>
                        <div class="eco-card-desc">Indicadores económicos en tiempo real (UF, Dólar) y Kit del Emprendedor.</div>
                    </a>

                    <a href="https://lotocgr.yeib.cl" target="_blank" class="eco-card">
                        <div class="eco-card-title">🎯 LotoCgr Data</div>
                        <div class="eco-card-desc">Minería forense de datos e inercia posicional para Loto y Kino.</div>
                    </a>

                </div>
            </div>

            <!-- WIDGET 2: ESPACIO PUBLICITARIO EXTERNO FUTURO -->
            <div class="sidebar-widget">
                <h3 class="widget-title"><span>📢</span> Publicidad / Sponsors</h3>
                <div class="ad-box">
                    <span>Espacio disponible para Anuncios de Terceros</span>
                </div>
            </div>

            <!-- WIDGET 3: GARANTÍA DE PRIVACIDAD ABSOLUTA -->
            <div class="sidebar-widget" style="background: rgba(13, 148, 136, 0.05); border-color: rgba(13, 148, 136, 0.3);">
                <h3 class="widget-title" style="color: var(--primary-teal);"><span>🛡️</span> Privacidad Absoluta</h3>
                <p style="font-size: 0.725rem; color: var(--text-muted); line-height: 1.45;">
                    En Yeib no almacenamos ni registramos tus archivos o datos. Todo se procesa localmente en tu propio dispositivo para tu total tranquilidad.
                </p>
            </div>

        </aside>

    </main>

    <!-- FOOTER -->
    <footer class="footer">
        <div class="footer-privacy-box">
            <strong>🔒 Declaración de Privacidad:</strong> No guardamos tus búsquedas, no guardamos tus archivos y no usamos cookies de seguimiento publicitario. Todo se procesa localmente en tu propio dispositivo.
        </div>
        <p>© <?php echo date('Y'); ?> <strong>Yeib Tools</strong> — Desarrollado con PHP Puro & Vanilla JS para la máxima velocidad.</p>
    </footer>

    <!-- POWERBAR INFERIOR FLOTANTE (ESTILO FREEBLIOTECA) -->
    <div id="powerbar-bottom" class="powerbar-bottom">
        <div class="powerbar-bottom-info">
            <span class="powerbar-bottom-badge">❤️ APORTAR</span>
            <span>¿Te sirvió alguna herramienta? Tu donación ayuda a mantener la infraestructura libre.</span>
        </div>
        <div class="powerbar-bottom-actions">
            <a href="https://link.mercadopago.cl/yeib" target="_blank" class="btn-donate btn-mp">
                <span>Mercado Pago</span>
            </a>
            <a href="https://paypal.me/yeib22" target="_blank" class="btn-donate btn-pp">
                <span>PayPal</span>
            </a>
            <button onclick="closePowerbar()" class="powerbar-close-btn" title="Cerrar barra">✕</button>
        </div>
    </div>

    <!-- LIBRERÍAS Y SCRIPTS CLIENTE -->
    <script src="assets/js/qrcode.min.js"></script>
    <script src="assets/js/tools.js"></script>
    <script>
        function closePowerbar() {
            const bar = document.getElementById('powerbar-bottom');
            if (bar) bar.classList.add('closed');
        }
    </script>
</body>
</html>
