<?php
// Yeib Tools - Portal Satélite de Micro-Herramientas Gratuitas
// Arquitectura: PHP Puro, Cero Base de Datos, Cero Frameworks (Ultra Veloz)
$version = time();
?>
<!DOCTYPE html>
<html lang="es" class="h-full dark scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
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
    <link href="https://fonts.googleapis.com/css2?family=Luxurious+Script&family=Outfit:wght@300;400;600;700;800;900&display=swap" rel="stylesheet">

    <!-- Tailwind CSS, Alpine.js & PDF-Lib Client Engine -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/pdf-lib@1.17.1/dist/pdf-lib.min.js"></script>
    <script>
        tailwind.config = {
            darkMode: 'class',
            theme: {
                extend: {
                    fontFamily: { 
                        sans: ['Outfit', 'sans-serif'],
                        signature: ['Luxurious Script', 'cursive']
                    },
                    colors: { 'yeib-teal': '#0d9488' }
                }
            }
        }

        // Theme Manager Engine
        function applyTheme(theme) {
            var html = document.documentElement;
            var btn = document.getElementById('theme-toggle-btn');
            if (theme === 'light') {
                html.classList.remove('dark');
                localStorage.setItem('yeib_tools_theme', 'light');
                if (btn) btn.innerText = '☀️';
            } else {
                html.classList.add('dark');
                localStorage.setItem('yeib_tools_theme', 'dark');
                if (btn) btn.innerText = '🌙';
            }
        }

        // Theme Initialization inline to prevent FOUC
        (function() {
            var savedTheme = localStorage.getItem('yeib_tools_theme') || 'dark';
            if (savedTheme === 'light') {
                document.documentElement.classList.remove('dark');
            } else {
                document.documentElement.classList.add('dark');
            }
        })();

        document.addEventListener('DOMContentLoaded', function() {
            var savedTheme = localStorage.getItem('yeib_tools_theme') || 'dark';
            applyTheme(savedTheme);
        });

        function toggleTheme() {
            var isDark = document.documentElement.classList.contains('dark');
            applyTheme(isDark ? 'light' : 'dark');
        }

        // Tab Switcher Engine
        function switchTool(toolId) {
            if (!toolId) return;

            // Hide all panels
            var panels = document.querySelectorAll('.tool-panel');
            for (var i = 0; i < panels.length; i++) {
                panels[i].classList.add('hidden');
                panels[i].style.display = 'none';
            }

            // Show target panel
            var targetPanel = document.getElementById('panel-' + toolId);
            if (targetPanel) {
                targetPanel.classList.remove('hidden');
                targetPanel.style.display = 'block';
            }

            // Tab button styles with vibrant active gradient in both modes
            var activeClass = "tool-tab-btn px-4 py-3 bg-gradient-to-r from-teal-600 to-indigo-600 text-white border-transparent rounded-2xl text-[11px] font-black uppercase transition-all flex items-center justify-center gap-2 shadow-lg shadow-teal-500/20 cursor-pointer select-none";
            var inactiveClass = "tool-tab-btn px-4 py-3 bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 rounded-2xl text-[11px] font-black uppercase text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 hover:border-teal-500/50 transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer select-none";

            var buttons = document.querySelectorAll('.tool-tab-btn');
            for (var j = 0; j < buttons.length; j++) {
                buttons[j].className = inactiveClass;
            }

            var targetBtn = document.getElementById('btn-tab-' + toolId);
            if (targetBtn) {
                targetBtn.className = activeClass;
            }
        }
    </script>
    <style>
        [x-cloak] { display: none !important; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
    </style>

    <!-- Favicon SVG Yeib -->
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 32 32%22 fill=%22none%22><linearGradient id=%22yeibGrad%22 x1=%220%25%22 y1=%220%25%22 x2=%22100%25%22 y2=%22100%25%22><stop offset=%220%25%22 stop-color=%22%230d9488%22 /><stop offset=%22100%25%22 stop-color=%22%236366f1%22 /></linearGradient><path d=%22M4 24C9 24 11 12 16 12C21 12 23 6 28 6%22 stroke=%22url(%23yeibGrad)%22 stroke-width=%223.5%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22/><circle cx=%2216%22 cy=%2212%22 r=%223%22 fill=%22%230d9488%22 stroke=%22%23ffffff%22 stroke-width=%222%22/><circle cx=%2228%22 cy=%226%22 r=%223%22 fill=%22%236366f1%22 stroke=%22%23ffffff%22 stroke-width=%222%22/></svg>">
</head>
<body class="h-full font-sans antialiased text-slate-800 dark:text-slate-200 bg-gradient-to-br from-slate-100 via-teal-50/20 to-indigo-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 selection:bg-teal-500 selection:text-white flex flex-col min-h-screen transition-colors duration-300">

    <!-- NAVBAR STICKY -->
    <nav class="bg-white/90 dark:bg-slate-800/95 border-b border-slate-200/80 dark:border-teal-900/50 sticky top-0 z-[60] backdrop-blur-lg transition-colors duration-300 shadow-sm">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-16">
                <!-- Logo & Title -->
                <a href="/" class="flex items-center gap-3 group">
                    <div class="relative w-10 h-10 flex items-center justify-center bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700/50 rounded-xl shadow-md group-hover:scale-105 transition-all duration-300">
                        <svg class="h-6 w-6" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                                <linearGradient id="yeibLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stop-color="#0d9488" />
                                    <stop offset="100%" stop-color="#6366f1" />
                                </linearGradient>
                            </defs>
                            <path d="M4 24C9 24 11 12 16 12C21 12 23 6 28 6" stroke="url(#yeibLogoGrad)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                            <circle cx="16" cy="12" r="2.5" fill="#0d9488" stroke="currentColor" stroke-width="1.5"/>
                            <circle cx="28" cy="6" r="2.5" fill="#6366f1" stroke="currentColor" stroke-width="1.5"/>
                            <path d="M16 12V24" stroke="#0d9488" stroke-width="1" stroke-dasharray="2 2" stroke-linecap="round"/>
                            <path d="M28 6V24" stroke="#6366f1" stroke-width="1" stroke-dasharray="2 2" stroke-linecap="round"/>
                            <path d="M4 24H28" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                        </svg>
                    </div>
                    <span class="text-xl font-black tracking-tighter text-yeib-teal uppercase">Yeib <span class="text-slate-900 dark:text-white font-light normal-case">Tools</span></span>
                </a>
                
                <!-- Right Side Actions: Theme Toggle, Language Selector & Donate Dropdown -->
                <div class="flex items-center gap-3">
                    <!-- Botón de Modo Claro / Oscuro -->
                    <button type="button" onclick="toggleTheme()" id="theme-toggle-btn" class="p-2 bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700/80 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-xl text-xs transition-all shadow-inner cursor-pointer" title="Cambiar Tema">
                        🌙
                    </button>

                    <!-- Selector de Idioma Dual (ES / EN) -->
                    <div class="flex items-center bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700/80 rounded-xl p-0.5 shadow-inner">
                        <button type="button" onclick="setLanguage('es')" id="lang-btn-es" class="px-2.5 py-1 bg-yeib-teal text-white rounded-lg text-[10px] font-black uppercase transition-all shadow-sm cursor-pointer">
                            ES
                        </button>
                        <button type="button" onclick="setLanguage('en')" id="lang-btn-en" class="px-2.5 py-1 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-lg text-[10px] font-black uppercase transition-all cursor-pointer">
                            EN
                        </button>
                    </div>

                    <!-- Donate Dropdown (Alpine.js) -->
                    <div x-data="{ open: false }" class="relative">
                        <button type="button" @click="open = !open" class="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-600 to-indigo-600 hover:from-teal-500 hover:to-indigo-500 text-white text-[10px] font-black uppercase rounded-xl active:scale-95 transition-all shadow-lg shadow-teal-600/20 cursor-pointer">
                            ❤️ <span class="hidden sm:inline" data-i18n="donate">Donar</span>
                        </button>
                        <div x-show="open" x-cloak @click.away="open = false" x-transition class="absolute top-full mt-3 right-0 w-52 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 p-2 z-[110]">
                            <a href="https://link.mercadopago.cl/yeib" target="_blank" class="flex items-center justify-between p-3 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl text-[10px] font-black uppercase text-slate-800 dark:text-white transition-all">
                                <span>Mercado Pago</span>
                                <span class="bg-sky-500 text-white text-[8px] px-2 py-0.5 rounded font-black">MP</span>
                            </a>
                            <a href="https://paypal.me/yeib22" target="_blank" class="flex items-center justify-between p-3 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl text-[10px] font-black uppercase text-slate-800 dark:text-white transition-all mt-1">
                                <span>PayPal</span>
                                <span class="bg-indigo-600 text-white text-[8px] px-2 py-0.5 rounded font-black">PP</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>

    <!-- MAIN CONTAINER -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full relative z-10">
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            <!-- LEFT AREA: TOOLS GRID & ACTIVE PANEL (3 COLS) -->
            <div class="lg:col-span-3 space-y-6">
                
                <!-- TOOL TABS GRID (5 COLS DESKTOP, ORDERED, NO HORIZONTAL SCROLL) -->
                <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 relative z-20">
                    <button type="button" id="btn-tab-youtube" onclick="switchTool('youtube')" class="tool-tab-btn px-4 py-3 bg-gradient-to-r from-teal-600 to-indigo-600 text-white border-transparent rounded-2xl text-[11px] font-black uppercase transition-all flex items-center justify-center gap-2 shadow-lg shadow-teal-500/20 cursor-pointer select-none">
                        <span>📺</span> <span class="truncate pointer-events-none" data-i18n="tab_youtube">Transcriptor</span>
                    </button>
                    <button type="button" id="btn-tab-metadata" onclick="switchTool('metadata')" class="tool-tab-btn px-4 py-3 bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 rounded-2xl text-[11px] font-black uppercase text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 hover:border-teal-500/50 transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer select-none">
                        <span>🕵️‍♂️</span> <span class="truncate pointer-events-none" data-i18n="tab_metadata">Metadatos</span>
                    </button>
                    <button type="button" id="btn-tab-qr" onclick="switchTool('qr')" class="tool-tab-btn px-4 py-3 bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 rounded-2xl text-[11px] font-black uppercase text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 hover:border-teal-500/50 transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer select-none">
                        <span>📱</span> <span class="truncate pointer-events-none" data-i18n="tab_qr">Código QR</span>
                    </button>
                    <button type="button" id="btn-tab-whatsapp" onclick="switchTool('whatsapp')" class="tool-tab-btn px-4 py-3 bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 rounded-2xl text-[11px] font-black uppercase text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 hover:border-teal-500/50 transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer select-none">
                        <span>💬</span> <span class="truncate pointer-events-none" data-i18n="tab_whatsapp">WhatsApp</span>
                    </button>
                    <button type="button" id="btn-tab-cleaner" onclick="switchTool('cleaner')" class="tool-tab-btn px-4 py-3 bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 rounded-2xl text-[11px] font-black uppercase text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 hover:border-teal-500/50 transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer select-none">
                        <span>📝</span> <span class="truncate pointer-events-none" data-i18n="tab_cleaner">Limpiador</span>
                    </button>
                </div>

                <!-- PANEL 1: TRANSCRIPTOR YOUTUBE -->
                <div id="panel-youtube" class="tool-panel bg-white/95 dark:bg-slate-800/90 backdrop-blur-lg p-8 rounded-[2.5rem] border border-slate-200/80 dark:border-slate-700/70 shadow-xl space-y-6 transition-colors">
                    <div class="border-b border-slate-200 dark:border-slate-700/60 pb-4">
                        <h2 class="text-2xl font-black uppercase tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
                            <span class="p-2 rounded-xl bg-teal-500/10 text-yeib-teal text-xl">📺</span> <span data-i18n="yt_title">Transcriptor de YouTube</span>
                        </h2>
                        <p class="text-slate-500 dark:text-slate-400 text-xs font-semibold mt-1" data-i18n="yt_subtitle">Extrae transcripciones completas con marcas de tiempo usando proxy SOCKS5.</p>
                    </div>

                    <div class="space-y-2">
                        <label class="block text-[10px] font-black uppercase text-slate-500 dark:text-slate-400 tracking-wider" data-i18n="yt_label">Ingresa la URL o ID del Video</label>
                        <input type="text" id="yt-input" data-i18n="yt_placeholder" placeholder="Ej: https://www.youtube.com/watch?v=jNQXAC9IVRw" class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-2xl px-5 py-3.5 text-slate-900 dark:text-white font-medium text-sm focus:ring-2 focus:ring-yeib-teal focus:outline-none transition-all" />
                    </div>

                    <button type="button" onclick="fetchTranscript()" class="px-6 py-3.5 bg-gradient-to-r from-teal-600 to-indigo-600 hover:from-teal-500 hover:to-indigo-500 text-white font-black text-xs uppercase rounded-2xl transition-all shadow-lg shadow-teal-600/20 active:scale-95 cursor-pointer" data-i18n="yt_btn">⚡ Obtener Transcripción</button>

                    <div id="yt-status" class="hidden"></div>

                    <div id="yt-result" class="hidden space-y-4 pt-2">
                        <div class="flex flex-wrap justify-between items-center gap-3 bg-slate-100 dark:bg-slate-900/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700/50">
                            <span id="yt-meta-info" class="text-xs font-black text-yeib-teal uppercase"></span>
                            <div class="flex flex-wrap gap-2">
                                <button type="button" onclick="copyYtText('full')" class="px-3 py-1.5 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-white text-[10px] font-black uppercase rounded-xl transition-all cursor-pointer" data-i18n="yt_copy_full">📋 Con Tiempos</button>
                                <button type="button" onclick="copyYtText('plain')" class="px-3 py-1.5 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-white text-[10px] font-black uppercase rounded-xl transition-all cursor-pointer" data-i18n="yt_copy_plain">📄 Solo Texto</button>
                                <button type="button" onclick="downloadYtText()" class="px-3 py-1.5 bg-yeib-teal text-white text-[10px] font-black uppercase rounded-xl transition-all cursor-pointer" data-i18n="yt_download">📥 Descargar .TXT</button>
                            </div>
                        </div>
                        <div id="yt-raw-text" class="bg-slate-100 dark:bg-slate-950 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 font-mono text-xs text-slate-800 dark:text-slate-300 max-h-96 overflow-y-auto whitespace-pre-wrap leading-relaxed"></div>
                    </div>
                </div>

                <!-- PANEL 2: METADATOS FORENSES & EDITOR -->
                <div id="panel-metadata" class="tool-panel hidden bg-white/95 dark:bg-slate-800/90 backdrop-blur-lg p-8 rounded-[2.5rem] border border-slate-200/80 dark:border-slate-700/70 shadow-xl space-y-6 transition-colors" style="display: none;">
                    <div class="border-b border-slate-200 dark:border-slate-700/60 pb-4">
                        <h2 class="text-2xl font-black uppercase tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
                            <span class="p-2 rounded-xl bg-teal-500/10 text-yeib-teal text-xl">🕵️‍♂️</span> <span data-i18n="meta_title">Lector y Editor Forense de Metadatos (EXIF & PDF)</span>
                        </h2>
                        <p class="text-slate-500 dark:text-slate-400 text-xs font-semibold mt-1" data-i18n="meta_subtitle">Inspecciona, modifica o borra datos ocultos (Autor, GPS, Software) 100% en tu navegador.</p>
                    </div>

                    <div class="border-2 border-dashed border-teal-500/30 hover:border-yeib-teal bg-slate-50 dark:bg-slate-900/40 rounded-3xl p-10 text-center cursor-pointer transition-all group" id="metadata-dropzone">
                        <div class="text-4xl mb-3 group-hover:scale-110 transition-transform">📁</div>
                        <h3 class="text-sm font-black uppercase text-slate-900 dark:text-white mb-1" data-i18n="meta_drop_title">Arrastra tu archivo aquí o haz clic para examinar</h3>
                        <p class="text-xs text-slate-500 dark:text-slate-400 font-medium" data-i18n="meta_drop_subtitle">Soporta imágenes (JPG, PNG, WEBP) y documentos PDF.</p>
                        <input type="file" id="metadata-file-input" class="hidden" accept="image/*,application/pdf">
                    </div>

                    <div class="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-2xl text-xs text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-2">
                        <span data-i18n="meta_security">🔒 <strong>Seguridad Extrema:</strong> El archivo se procesa localmente en la memoria RAM de tu dispositivo. Cero bytes subidos a la VPS.</span>
                    </div>

                    <!-- MUESTRA DE RESULTADOS & METADATOS EXTRAÍDOS -->
                    <div id="metadata-result" class="hidden space-y-4">
                        <h4 id="metadata-filename" class="text-xs font-black uppercase text-yeib-teal"></h4>
                        <div id="metadata-output" class="bg-slate-100 dark:bg-slate-950 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 font-mono text-xs text-slate-800 dark:text-slate-300 max-h-80 overflow-y-auto whitespace-pre-wrap leading-relaxed"></div>

                        <!-- PANEL DE EDICIÓN & SANITIZACIÓN CLIENT-SIDE -->
                        <div id="metadata-editor-box" class="hidden bg-slate-50 dark:bg-slate-900/80 p-6 rounded-3xl border border-slate-200 dark:border-slate-700/70 space-y-4">
                            <h3 class="text-sm font-black uppercase text-slate-900 dark:text-white tracking-wider flex items-center gap-2" data-i18n="meta_editor_title">
                                🛠️ Editor & Sanitizador de Metadatos
                            </h3>
                            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                <div>
                                    <label class="block text-[10px] font-black uppercase text-slate-500 dark:text-slate-400 mb-1" data-i18n="meta_author_label">Nombre de Autor</label>
                                    <input type="text" id="meta-input-author" placeholder="Ej: Yeib" class="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 dark:text-white focus:outline-none" />
                                </div>
                                <div>
                                    <label class="block text-[10px] font-black uppercase text-slate-500 dark:text-slate-400 mb-1" data-i18n="meta_title_label">Título del Documento</label>
                                    <input type="text" id="meta-input-title" placeholder="Ej: Documento Oficial" class="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 dark:text-white focus:outline-none" />
                                </div>
                                <div>
                                    <label class="block text-[10px] font-black uppercase text-slate-500 dark:text-slate-400 mb-1" data-i18n="meta_creator_label">Software / Creador</label>
                                    <input type="text" id="meta-input-creator" placeholder="Ej: Yeib Tools PDF Sanitizer" class="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 dark:text-white focus:outline-none" />
                                </div>
                            </div>

                            <div class="flex flex-wrap gap-3 pt-2">
                                <button type="button" onclick="sanitizePdfMetadata()" class="px-5 py-3 bg-rose-600 hover:bg-rose-500 text-white font-black text-xs uppercase rounded-xl transition-all shadow-md active:scale-95 cursor-pointer" data-i18n="meta_btn_sanitize">
                                    🧹 Borrar Todos los Metadatos Ocultos
                                </button>
                                <button type="button" onclick="savePdfMetadata()" class="px-5 py-3 bg-yeib-teal hover:bg-teal-600 text-white font-black text-xs uppercase rounded-xl transition-all shadow-md active:scale-95 cursor-pointer" data-i18n="meta_btn_save">
                                    💾 Guardar & Descargar PDF Sanitizado
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- PANEL 3: GENERADOR QR PERSONALIZADO CON LOGO YEIB -->
                <div id="panel-qr" class="tool-panel hidden bg-white/95 dark:bg-slate-800/90 backdrop-blur-lg p-8 rounded-[2.5rem] border border-slate-200/80 dark:border-slate-700/70 shadow-xl space-y-6 transition-colors" style="display: none;">
                    <div class="border-b border-slate-200 dark:border-slate-700/60 pb-4">
                        <h2 class="text-2xl font-black uppercase tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
                            <span class="p-2 rounded-xl bg-teal-500/10 text-yeib-teal text-xl">📱</span> <span data-i18n="qr_title">Generador de Código QR Personalizado</span>
                        </h2>
                        <p class="text-slate-500 dark:text-slate-400 text-xs font-semibold mt-1" data-i18n="qr_subtitle">Genera códigos QR de alta resolución con diseño de color y logo central de Yeib.</p>
                    </div>

                    <!-- Input de Texto / URL -->
                    <div class="space-y-2">
                        <label class="block text-[10px] font-black uppercase text-slate-500 dark:text-slate-400 tracking-wider" data-i18n="qr_label">Texto o URL a Codificar</label>
                        <input type="text" id="qr-text-input" placeholder="Ej: https://tools.yeib.cl/" class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-2xl px-5 py-3.5 text-slate-900 dark:text-white font-medium text-sm focus:ring-2 focus:ring-yeib-teal focus:outline-none transition-all" />
                    </div>

                    <!-- Opciones Visuales de Color y Fondo -->
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 dark:bg-slate-900/60 p-5 rounded-2xl border border-slate-200 dark:border-slate-700/60">
                        <div>
                            <label class="block text-[10px] font-black uppercase text-slate-500 dark:text-slate-400 tracking-wider mb-2" data-i18n="qr_color_label">Estilo de Color del QR</label>
                            <select id="qr-color-select" class="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-800 dark:text-white focus:outline-none cursor-pointer">
                                <option value="teal">✨ Gradiente Neón Yeib (Teal & Indigo)</option>
                                <option value="solid">Sólido Clásico (Negro / Blanco)</option>
                                <option value="indigo">Azul Índigo</option>
                                <option value="rose">Rosa Neón</option>
                                <option value="emerald">Verde Esmeralda</option>
                            </select>
                        </div>

                        <div>
                            <label class="block text-[10px] font-black uppercase text-slate-500 dark:text-slate-400 tracking-wider mb-2" data-i18n="qr_bg_label">Fondo</label>
                            <select id="qr-bg-select" class="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-800 dark:text-white focus:outline-none cursor-pointer">
                                <option value="light">Blanco Puro</option>
                                <option value="dark">Oscuro Elegante</option>
                                <option value="transparent">Transparente</option>
                            </select>
                        </div>
                    </div>

                    <!-- Checkbox de Marca Yeib en el centro -->
                    <div class="flex items-center gap-3 bg-teal-500/10 border border-teal-500/30 p-4 rounded-2xl">
                        <input type="checkbox" id="qr-logo-check" checked class="w-4 h-4 text-yeib-teal rounded border-slate-300 focus:ring-yeib-teal cursor-pointer">
                        <label for="qr-logo-check" class="text-xs font-bold text-teal-600 dark:text-teal-400 cursor-pointer select-none" data-i18n="qr_logo_option">
                            Incrustar Logo Oficial Yeib en el centro 🚀
                        </label>
                    </div>

                    <!-- Botón Generar -->
                    <button type="button" onclick="generateQrCode()" class="px-6 py-3.5 bg-gradient-to-r from-teal-600 to-indigo-600 hover:from-teal-500 hover:to-indigo-500 text-white font-black text-xs uppercase rounded-2xl transition-all shadow-lg shadow-teal-600/20 active:scale-95 cursor-pointer" data-i18n="qr_btn">🎨 Generar Código QR Personalizado</button>

                    <!-- Resultado Canvas / Descarga -->
                    <div id="qr-output-container" class="flex flex-col items-center justify-center pt-4"></div>
                </div>

                <!-- PANEL 4: WHATSAPP LINK -->
                <div id="panel-whatsapp" class="tool-panel hidden bg-white/95 dark:bg-slate-800/90 backdrop-blur-lg p-8 rounded-[2.5rem] border border-slate-200/80 dark:border-slate-700/70 shadow-xl space-y-6 transition-colors" style="display: none;">
                    <div class="border-b border-slate-200 dark:border-slate-700/60 pb-4">
                        <h2 class="text-2xl font-black uppercase tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
                            <span class="p-2 rounded-xl bg-teal-500/10 text-yeib-teal text-xl">💬</span> <span data-i18n="wa_title">Generador de Enlaces de WhatsApp</span>
                        </h2>
                        <p class="text-slate-500 dark:text-slate-400 text-xs font-semibold mt-1" data-i18n="wa_subtitle">Crea un enlace directo para iniciar chats sin guardar contactos.</p>
                    </div>

                    <div class="space-y-4">
                        <div>
                            <label class="block text-[10px] font-black uppercase text-slate-500 dark:text-slate-400 tracking-wider mb-2" data-i18n="wa_phone_label">Número de Teléfono (con código de país sin +)</label>
                            <input type="text" id="wa-phone" placeholder="Ej: 56912345678" class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-2xl px-5 py-3.5 text-slate-900 dark:text-white font-medium text-sm focus:ring-2 focus:ring-yeib-teal focus:outline-none transition-all" />
                        </div>

                        <div>
                            <label class="block text-[10px] font-black uppercase text-slate-500 dark:text-slate-400 tracking-wider mb-2" data-i18n="wa_msg_label">Mensaje Pre-llenado (Opcional)</label>
                            <textarea id="wa-message" placeholder="Ej: Hola, vi tu anuncio y quiero consultar..." class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-2xl px-5 py-3.5 text-slate-900 dark:text-white font-medium text-sm focus:ring-2 focus:ring-yeib-teal focus:outline-none transition-all h-24"></textarea>
                        </div>
                    </div>

                    <button type="button" onclick="generateWhatsappLink()" class="px-6 py-3.5 bg-gradient-to-r from-teal-600 to-indigo-600 hover:from-teal-500 hover:to-indigo-500 text-white font-black text-xs uppercase rounded-2xl transition-all shadow-lg shadow-teal-600/20 active:scale-95 cursor-pointer" data-i18n="wa_btn">🔗 Crear Enlace Directo</button>

                    <div id="wa-result" class="hidden space-y-3 pt-2">
                        <label class="block text-[10px] font-black uppercase text-slate-500 dark:text-slate-400 tracking-wider" data-i18n="wa_result_label">Tu Enlace Generado:</label>
                        <div class="flex flex-wrap gap-2">
                            <input type="text" id="wa-generated-link" readonly class="flex-1 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-2xl px-5 py-3 text-slate-900 dark:text-white font-mono text-xs focus:outline-none" />
                            <button type="button" onclick="copyWaLink()" class="px-4 py-3 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-white text-xs font-black uppercase rounded-2xl transition-all cursor-pointer" data-i18n="wa_copy">Copiar</button>
                            <a id="wa-test-btn" href="#" target="_blank" class="px-5 py-3 bg-yeib-teal hover:bg-teal-600 text-white text-xs font-black uppercase rounded-2xl transition-all flex items-center" data-i18n="wa_test">Probar Chat</a>
                        </div>
                    </div>
                </div>

                <!-- PANEL 5: LIMPIADOR DE TEXTO -->
                <div id="panel-cleaner" class="tool-panel hidden bg-white/95 dark:bg-slate-800/90 backdrop-blur-lg p-8 rounded-[2.5rem] border border-slate-200/80 dark:border-slate-700/70 shadow-xl space-y-6 transition-colors" style="display: none;">
                    <div class="border-b border-slate-200 dark:border-slate-700/60 pb-4">
                        <h2 class="text-2xl font-black uppercase tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
                            <span class="p-2 rounded-xl bg-teal-500/10 text-yeib-teal text-xl">📝</span> <span data-i18n="clean_title">Limpiador y Formateador de Texto</span>
                        </h2>
                        <p class="text-slate-500 dark:text-slate-400 text-xs font-semibold mt-1" data-i18n="clean_subtitle">Normaliza, convierte a mayúsculas/minúsculas y elimina espacios sobrantes instantáneamente.</p>
                    </div>

                    <div class="space-y-2">
                        <label class="block text-[10px] font-black uppercase text-slate-500 dark:text-slate-400 tracking-wider" data-i18n="clean_label">Ingresa tu Texto</label>
                        <textarea id="cleaner-input" oninput="updateTextStats()" data-i18n="clean_placeholder" placeholder="Pega tu texto aquí..." class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-2xl px-5 py-3.5 text-slate-900 dark:text-white font-medium text-sm focus:ring-2 focus:ring-yeib-teal focus:outline-none transition-all h-36"></textarea>
                    </div>

                    <div class="flex flex-wrap gap-2">
                        <button type="button" onclick="processText('upper')" class="px-4 py-2.5 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-650 text-slate-800 dark:text-white text-[10px] font-black uppercase rounded-xl transition-all cursor-pointer" data-i18n="clean_upper">MAYÚSCULAS</button>
                        <button type="button" onclick="processText('lower')" class="px-4 py-2.5 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-650 text-slate-800 dark:text-white text-[10px] font-black uppercase rounded-xl transition-all cursor-pointer" data-i18n="clean_lower">minúsculas</button>
                        <button type="button" onclick="processText('title')" class="px-4 py-2.5 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-650 text-slate-800 dark:text-white text-[10px] font-black uppercase rounded-xl transition-all cursor-pointer" data-i18n="clean_title_case">Modo Título</button>
                        <button type="button" onclick="processText('spaces')" class="px-4 py-2.5 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-650 text-slate-800 dark:text-white text-[10px] font-black uppercase rounded-xl transition-all cursor-pointer" data-i18n="clean_spaces">Sin Dobles Espacios</button>
                        <button type="button" onclick="processText('newlines')" class="px-4 py-2.5 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-650 text-slate-800 dark:text-white text-[10px] font-black uppercase rounded-xl transition-all cursor-pointer" data-i18n="clean_newlines">Sin Saltos de Línea</button>
                        <button type="button" onclick="copyCleanerText()" class="px-5 py-2.5 bg-yeib-teal text-white text-[10px] font-black uppercase rounded-xl transition-all cursor-pointer" data-i18n="clean_copy">📋 Copiar Texto</button>
                    </div>

                    <div class="flex items-center gap-6 text-xs text-slate-500 dark:text-slate-400 font-bold pt-2">
                        <span><span data-i18n="clean_chars">Caracteres:</span> <strong id="text-stat-chars" class="text-yeib-teal font-black">0</strong></span>
                        <span><span data-i18n="clean_words">Palabras:</span> <strong id="text-stat-words" class="text-indigo-500 dark:text-indigo-400 font-black">0</strong></span>
                        <span><span data-i18n="clean_lines">Líneas:</span> <strong id="text-stat-lines" class="text-emerald-500 dark:text-emerald-400 font-black">0</strong></span>
                    </div>
                </div>

            </div>

            <!-- RIGHT SIDEBAR (1 COL) -->
            <aside class="space-y-6">

                <!-- WIDGET 1: PUBLICIDAD EXTERNA / SPONSORS (ARRIBA) -->
                <div class="bg-white/95 dark:bg-slate-800/90 backdrop-blur-lg p-6 rounded-[2rem] border border-slate-200/80 dark:border-slate-700/60 shadow-xl space-y-3 transition-colors">
                    <h3 class="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <span>📢</span> <span data-i18n="ad_title">Publicidad / Sponsors</span>
                    </h3>
                    <div class="p-6 bg-slate-50 dark:bg-slate-900/40 border border-dashed border-slate-300 dark:border-slate-700 rounded-2xl text-center text-slate-500 dark:text-slate-400 text-xs font-bold leading-relaxed">
                        <span data-i18n="ad_text">¿Quieres anunciar tu marca aquí?</span> <br/>
                        <a href="mailto:yeib@pm.me" class="text-yeib-teal font-black hover:underline mt-1.5 inline-block" data-i18n="ad_link">Envía un correo a yeib@pm.me</a>
                    </div>
                </div>

                <!-- WIDGET 2: ECOSISTEMA YEIB (ABAJO) -->
                <div class="bg-white/95 dark:bg-slate-800/90 backdrop-blur-lg p-6 rounded-[2rem] border border-slate-200/80 dark:border-slate-700/60 shadow-xl space-y-4 transition-colors">
                    <h3 class="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <span>🌐</span> <span data-i18n="eco_title">Ecosistema Yeib</span>
                    </h3>
                    <div class="space-y-3">
                        <a href="https://indicadores.yeib.cl" target="_blank" class="block p-3.5 bg-slate-50 dark:bg-slate-900/60 hover:bg-slate-100 dark:hover:bg-slate-700/60 rounded-2xl border border-slate-200 dark:border-slate-700/50 transition-all group">
                            <div class="text-xs font-black uppercase text-yeib-teal group-hover:text-teal-600 dark:group-hover:text-teal-300 flex items-center justify-between">
                                <span>📈 Indicadores y Datos</span>
                                <span class="text-[9px] text-slate-400 font-normal">↗</span>
                            </div>
                            <div class="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed" data-i18n="eco_1_desc">Indicadores económicos en tiempo real y Kit del Emprendedor.</div>
                        </a>

                        <a href="https://freeblioteca.cl" target="_blank" class="block p-3.5 bg-slate-50 dark:bg-slate-900/60 hover:bg-slate-100 dark:hover:bg-slate-700/60 rounded-2xl border border-slate-200 dark:border-slate-700/50 transition-all group">
                            <div class="text-xs font-black uppercase text-amber-600 dark:text-amber-400 group-hover:text-amber-500 dark:group-hover:text-amber-300 flex items-center justify-between">
                                <span>📚 Freeblioteca</span>
                                <span class="text-[9px] text-slate-400 font-normal">↗</span>
                            </div>
                            <div class="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed" data-i18n="eco_2_desc">Biblioteca digital y tours 3D interactivos con acceso libre.</div>
                        </a>

                        <a href="https://yeib.cl" target="_blank" class="block p-3.5 bg-slate-50 dark:bg-slate-900/60 hover:bg-slate-100 dark:hover:bg-slate-700/60 rounded-2xl border border-slate-200 dark:border-slate-700/50 transition-all group">
                            <div class="text-xs font-black uppercase text-cyan-600 dark:text-cyan-400 group-hover:text-cyan-500 dark:group-hover:text-cyan-300 flex items-center justify-between">
                                <span>💻 Yeib Portfolio</span>
                                <span class="text-[9px] text-slate-400 font-normal">↗</span>
                            </div>
                            <div class="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed" data-i18n="eco_3_desc">Portal principal y proyectos del laboratorio de software Yeib.</div>
                        </a>

                        <a href="https://proteo.yeib.cl" target="_blank" class="block p-3.5 bg-slate-50 dark:bg-slate-900/60 hover:bg-slate-100 dark:hover:bg-slate-700/60 rounded-2xl border border-slate-200 dark:border-slate-700/50 transition-all group">
                            <div class="text-xs font-black uppercase text-indigo-600 dark:text-indigo-400 group-hover:text-indigo-500 dark:group-hover:text-indigo-300 flex items-center justify-between">
                                <span>🤖 Proteo AI</span>
                                <span class="text-[9px] text-slate-400 font-normal">↗</span>
                            </div>
                            <div class="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed" data-i18n="eco_4_desc">Sistema de inteligencia artificial y asistente avanzado.</div>
                        </a>

                        <a href="https://cronicon.cl" target="_blank" class="block p-3.5 bg-slate-50 dark:bg-slate-900/60 hover:bg-slate-100 dark:hover:bg-slate-700/60 rounded-2xl border border-slate-200 dark:border-slate-700/50 transition-all group">
                            <div class="text-xs font-black uppercase text-rose-600 dark:text-rose-400 group-hover:text-rose-500 dark:group-hover:text-rose-300 flex items-center justify-between">
                                <span>📜 Cronicón</span>
                                <span class="text-[9px] text-slate-400 font-normal">↗</span>
                            </div>
                            <div class="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed" data-i18n="eco_5_desc">Diario histórico y crónicas del patrimonio nacional.</div>
                        </a>
                    </div>
                </div>

            </aside>

        </div>
    </main>

    <!-- FOOTER RENOVADO Y ELEGANTE -->
    <footer class="mt-auto border-t border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/90 py-10 px-4 transition-colors">
        <div class="max-w-7xl mx-auto space-y-6">
            <!-- PRIVACIDAD Y DISCLAIMER -->
            <div class="bg-emerald-500/10 border border-emerald-500/20 p-5 rounded-2xl text-center max-w-4xl mx-auto">
                <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                    <strong class="text-emerald-600 dark:text-emerald-400 uppercase font-black tracking-wider mr-1" data-i18n="privacy_title">🛡️ Privacidad Absoluta:</strong> <span data-i18n="privacy_body">En Yeib no almacenamos ni registramos tus archivos, búsquedas o datos personales. Todo procesamiento de metadatos, códigos y herramientas ocurre 100% en el navegador de tu propio dispositivo para tu total tranquilidad.</span>
                </p>
            </div>

            <!-- COPYRIGHT & SIGNATURE -->
            <div class="flex flex-col md:flex-row justify-between items-center gap-4 pt-4 border-t border-slate-200 dark:border-slate-800/80">
                <div class="text-center md:text-left">
                    <p class="text-xs font-bold uppercase text-slate-600 dark:text-slate-400 tracking-wider" data-i18n="footer_rights">
                        © <?php echo date('Y'); ?> Yeib. Todos los derechos reservados.
                    </p>
                    <p class="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-0.5" data-i18n="footer_subtitle">
                        Suite de Micro-Herramientas Gratuitas & Análisis Forense
                    </p>
                </div>

                <!-- FIRMA BONITA DE YEIB EN LUXURIOUS SCRIPT -->
                <div class="flex items-center gap-3">
                    <span class="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider" data-i18n="footer_made_in">Hecho en Chile por</span>
                    <a href="https://yeib.cl" target="_blank" class="no-underline group relative transition-all duration-300 hover:-translate-y-0.5">
                        <span class="yeib-signature text-4xl font-normal transition-all duration-500 inline-block -rotate-2 group-hover:rotate-0 group-hover:scale-110" style="font-family: 'Luxurious Script', cursive; color: #f53003; text-shadow: 0 0 12px rgba(245, 48, 3, 0.4);">
                            yeib
                        </span>
                        <span class="absolute -bottom-0.5 left-0 w-0 h-px bg-[#f53003] transition-all duration-500 group-hover:w-full shadow-[0_0_10px_#f53003]"></span>
                    </a>
                </div>
            </div>
        </div>
    </footer>

    <!-- LIBRERÍAS Y TAB SWITCHER SCRIPTS -->
    <script src="assets/js/qrcode.min.js?v=<?php echo $version; ?>"></script>
    <script src="assets/js/i18n.js?v=<?php echo $version; ?>"></script>
    <script src="assets/js/tools.js?v=<?php echo $version; ?>"></script>
</body>
</html>
