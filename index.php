<?php
// Yeib Tools - Portal Satélite de Micro-Herramientas Gratuitas
// Arquitectura: PHP Puro, Cero Base de Datos, Cero Frameworks (Ultra Veloz)
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
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700;800;900&display=swap" rel="stylesheet">

    <!-- Tailwind CSS & Alpine.js -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
    <script>
        tailwind.config = {
            darkMode: 'class',
            theme: {
                extend: {
                    fontFamily: { sans: ['Outfit', 'sans-serif'] },
                    colors: { 'yeib-teal': '#0d9488' }
                }
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
<body class="h-full font-sans antialiased text-slate-200 bg-slate-900 selection:bg-teal-500 selection:text-white flex flex-col min-h-screen">

    <!-- CINTA SUPERIOR DELGADA DE DONACIONES (POWERBAR SUPERIOR ESTILO FREEBLIOTECA) -->
    <div class="bg-gradient-to-r from-teal-950 via-slate-900 to-indigo-950 border-b border-teal-900/40 py-2 px-4 z-[70]">
        <div class="max-w-7xl mx-auto flex flex-wrap justify-between items-center text-xs gap-2">
            <div class="flex items-center gap-2 text-slate-300 font-medium">
                <span class="bg-rose-500/20 text-rose-400 border border-rose-500/30 text-[9px] font-black uppercase px-2 py-0.5 rounded-full animate-pulse">❤️ Apoyar Proyecto</span>
                <span class="hidden sm:inline">¿Te sirvió alguna herramienta? Tu donación mantiene la infraestructura libre.</span>
            </div>
            <div class="flex items-center gap-3 font-bold text-[10px] uppercase">
                <a href="https://link.mercadopago.cl/yeib" target="_blank" class="hover:text-teal-400 transition-colors flex items-center gap-1.5">
                    <span class="bg-sky-500 text-white px-1.5 py-0.5 rounded text-[8px] font-black">MP</span> Mercado Pago
                </a>
                <span class="text-slate-600">•</span>
                <a href="https://paypal.me/yeib22" target="_blank" class="hover:text-indigo-400 transition-colors flex items-center gap-1.5">
                    <span class="bg-indigo-600 text-white px-1.5 py-0.5 rounded text-[8px] font-black">PP</span> PayPal
                </a>
            </div>
        </div>
    </div>

    <!-- NAVBAR STICKY -->
    <nav class="bg-slate-800/95 border-b border-teal-900/50 sticky top-0 z-[60] backdrop-blur-lg">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-16">
                <!-- Logo & Title -->
                <a href="/" class="flex items-center gap-3 group">
                    <div class="relative w-10 h-10 flex items-center justify-center bg-slate-800 border border-slate-700/50 rounded-xl shadow-lg group-hover:scale-105 transition-all duration-300">
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
                        <div class="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-slate-800 animate-pulse"></div>
                    </div>
                    <span class="text-xl font-black tracking-tighter text-yeib-teal uppercase">Yeib <span class="text-white font-light normal-case">Tools</span></span>
                </a>
                
                <!-- Right Side Actions & Donate Dropdown -->
                <div class="flex items-center gap-4">
                    <div class="hidden md:flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-[10px] font-black uppercase tracking-wider">
                        <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> 100% Client-Side
                    </div>

                    <!-- Donate Dropdown (Alpine.js) -->
                    <div x-data="{ open: false }" class="relative">
                        <button @click="open = !open" class="flex items-center gap-2 px-4 py-2 bg-yeib-teal text-white text-[10px] font-black uppercase rounded-xl hover:bg-teal-700 active:scale-95 transition-all shadow-lg">
                            ❤️ <span class="hidden sm:inline">Donar</span>
                        </button>
                        <div x-show="open" x-cloak @click.away="open = false" x-transition class="absolute top-full mt-3 right-0 w-52 bg-slate-800 rounded-2xl shadow-2xl border border-slate-700 p-2 z-[110]">
                            <a href="https://link.mercadopago.cl/yeib" target="_blank" class="flex items-center justify-between p-3 hover:bg-slate-700 rounded-xl text-[10px] font-black uppercase text-white transition-all">
                                <span>Mercado Pago</span>
                                <span class="bg-sky-500 text-white text-[8px] px-2 py-0.5 rounded font-black">MP</span>
                            </a>
                            <a href="https://paypal.me/yeib22" target="_blank" class="flex items-center justify-between p-3 hover:bg-slate-700 rounded-xl text-[10px] font-black uppercase text-white transition-all mt-1">
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
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            <!-- LEFT AREA: TOOLS GRID & ACTIVE PANEL (3 COLS) -->
            <div class="lg:col-span-3 space-y-6">
                
                <!-- TOOL TABS GRID (5 COLS DESKTOP, ORDERED, NO HORIZONTAL SCROLL) -->
                <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
                    <button id="btn-tab-youtube" onclick="switchTool('youtube')" class="tool-tab-btn px-4 py-3 bg-slate-800 border border-slate-700/60 rounded-2xl text-[11px] font-black uppercase text-slate-400 hover:text-yeib-teal hover:border-yeib-teal/50 transition-all flex items-center justify-center gap-2 active-tab-style shadow-sm">
                        <span>📺</span> <span class="truncate">Transcriptor</span>
                    </button>
                    <button id="btn-tab-metadata" onclick="switchTool('metadata')" class="tool-tab-btn px-4 py-3 bg-slate-800 border border-slate-700/60 rounded-2xl text-[11px] font-black uppercase text-slate-400 hover:text-yeib-teal hover:border-yeib-teal/50 transition-all flex items-center justify-center gap-2 shadow-sm">
                        <span>🕵️‍♂️</span> <span class="truncate">Metadatos</span>
                    </button>
                    <button id="btn-tab-qr" onclick="switchTool('qr')" class="tool-tab-btn px-4 py-3 bg-slate-800 border border-slate-700/60 rounded-2xl text-[11px] font-black uppercase text-slate-400 hover:text-yeib-teal hover:border-yeib-teal/50 transition-all flex items-center justify-center gap-2 shadow-sm">
                        <span>📱</span> <span class="truncate">Código QR</span>
                    </button>
                    <button id="btn-tab-whatsapp" onclick="switchTool('whatsapp')" class="tool-tab-btn px-4 py-3 bg-slate-800 border border-slate-700/60 rounded-2xl text-[11px] font-black uppercase text-slate-400 hover:text-yeib-teal hover:border-yeib-teal/50 transition-all flex items-center justify-center gap-2 shadow-sm">
                        <span>💬</span> <span class="truncate">WhatsApp</span>
                    </button>
                    <button id="btn-tab-cleaner" onclick="switchTool('cleaner')" class="tool-tab-btn px-4 py-3 bg-slate-800 border border-slate-700/60 rounded-2xl text-[11px] font-black uppercase text-slate-400 hover:text-yeib-teal hover:border-yeib-teal/50 transition-all flex items-center justify-center gap-2 shadow-sm">
                        <span>📝</span> <span class="truncate">Limpiador</span>
                    </button>
                </div>

                <!-- PANEL 1: TRANSCRIPTOR YOUTUBE -->
                <div id="panel-youtube" class="tool-panel bg-slate-800/90 backdrop-blur-lg p-8 rounded-[2.5rem] border border-slate-700/70 shadow-xl space-y-6">
                    <div class="border-b border-slate-700/60 pb-4">
                        <h2 class="text-2xl font-black uppercase tracking-tight text-white flex items-center gap-3">
                            <span class="p-2 rounded-xl bg-teal-500/10 text-yeib-teal text-xl">📺</span> Transcriptor de YouTube
                        </h2>
                        <p class="text-slate-400 text-xs font-semibold mt-1">Extrae transcripciones completas con marcas de tiempo usando proxy SOCKS5.</p>
                    </div>

                    <div class="space-y-2">
                        <label class="block text-[10px] font-black uppercase text-slate-400 tracking-wider">Ingresa la URL o ID del Video</label>
                        <input type="text" id="yt-input" placeholder="Ej: https://www.youtube.com/watch?v=jNQXAC9IVRw" class="w-full bg-slate-900 border border-slate-700 rounded-2xl px-5 py-3.5 text-white font-medium text-sm focus:ring-2 focus:ring-yeib-teal focus:outline-none transition-all" />
                    </div>

                    <button onclick="fetchTranscript()" class="px-6 py-3.5 bg-yeib-teal hover:bg-teal-600 text-white font-black text-xs uppercase rounded-2xl transition-all shadow-lg active:scale-95">⚡ Obtener Transcripción</button>

                    <div id="yt-status" class="hidden"></div>

                    <div id="yt-result" class="hidden space-y-4 pt-2">
                        <div class="flex flex-wrap justify-between items-center gap-3 bg-slate-900/60 p-4 rounded-2xl border border-slate-700/50">
                            <span id="yt-meta-info" class="text-xs font-black text-yeib-teal uppercase"></span>
                            <div class="flex flex-wrap gap-2">
                                <button onclick="copyYtText('full')" class="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-white text-[10px] font-black uppercase rounded-xl transition-all">📋 Con Tiempos</button>
                                <button onclick="copyYtText('plain')" class="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-white text-[10px] font-black uppercase rounded-xl transition-all">📄 Solo Texto</button>
                                <button onclick="downloadYtText()" class="px-3 py-1.5 bg-yeib-teal text-white text-[10px] font-black uppercase rounded-xl transition-all">📥 Descargar .TXT</button>
                            </div>
                        </div>
                        <div id="yt-raw-text" class="bg-slate-950 p-5 rounded-2xl border border-slate-800 font-mono text-xs text-slate-300 max-h-96 overflow-y-auto whitespace-pre-wrap leading-relaxed"></div>
                    </div>
                </div>

                <!-- PANEL 2: METADATOS FORENSES -->
                <div id="panel-metadata" class="tool-panel hidden bg-slate-800/90 backdrop-blur-lg p-8 rounded-[2.5rem] border border-slate-700/70 shadow-xl space-y-6">
                    <div class="border-b border-slate-700/60 pb-4">
                        <h2 class="text-2xl font-black uppercase tracking-tight text-white flex items-center gap-3">
                            <span class="p-2 rounded-xl bg-teal-500/10 text-yeib-teal text-xl">🕵️‍♂️</span> Lector de Metadatos Forenses (EXIF & PDF)
                        </h2>
                        <p class="text-slate-400 text-xs font-semibold mt-1">Inspecciona autor, software, modelo de cámara, fechas e información oculta localmente.</p>
                    </div>

                    <div class="border-2 border-dashed border-teal-500/30 hover:border-yeib-teal bg-slate-900/40 rounded-3xl p-10 text-center cursor-pointer transition-all group" id="metadata-dropzone">
                        <div class="text-4xl mb-3 group-hover:scale-110 transition-transform">📁</div>
                        <h3 class="text-sm font-black uppercase text-white mb-1">Arrastra tu archivo aquí o haz clic para examinar</h3>
                        <p class="text-xs text-slate-400 font-medium">Soporta imágenes (JPG, PNG, WEBP) y documentos PDF.</p>
                        <input type="file" id="metadata-file-input" class="hidden" accept="image/*,application/pdf">
                    </div>

                    <div class="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-2xl text-xs text-emerald-400 font-bold flex items-center gap-2">
                        🔒 <span><strong>Seguridad Extrema:</strong> El archivo se lee localmente desde la memoria de tu dispositivo. Ningún byte sale hacia el servidor.</span>
                    </div>

                    <div id="metadata-result" class="hidden space-y-3">
                        <h4 id="metadata-filename" class="text-xs font-black uppercase text-yeib-teal"></h4>
                        <div id="metadata-output" class="bg-slate-950 p-5 rounded-2xl border border-slate-800 font-mono text-xs text-slate-300 max-h-96 overflow-y-auto whitespace-pre-wrap leading-relaxed"></div>
                    </div>
                </div>

                <!-- PANEL 3: GENERADOR QR -->
                <div id="panel-qr" class="tool-panel hidden bg-slate-800/90 backdrop-blur-lg p-8 rounded-[2.5rem] border border-slate-700/70 shadow-xl space-y-6">
                    <div class="border-b border-slate-700/60 pb-4">
                        <h2 class="text-2xl font-black uppercase tracking-tight text-white flex items-center gap-3">
                            <span class="p-2 rounded-xl bg-teal-500/10 text-yeib-teal text-xl">📱</span> Generador de Código QR
                        </h2>
                        <p class="text-slate-400 text-xs font-semibold mt-1">Genera códigos QR de alta resolución instantáneamente en tu navegador.</p>
                    </div>

                    <div class="space-y-2">
                        <label class="block text-[10px] font-black uppercase text-slate-400 tracking-wider">Texto o URL a Codificar</label>
                        <input type="text" id="qr-text-input" placeholder="Ej: https://tools.yeib.cl/" class="w-full bg-slate-900 border border-slate-700 rounded-2xl px-5 py-3.5 text-white font-medium text-sm focus:ring-2 focus:ring-yeib-teal focus:outline-none transition-all" />
                    </div>

                    <button onclick="generateQrCode()" class="px-6 py-3.5 bg-yeib-teal hover:bg-teal-600 text-white font-black text-xs uppercase rounded-2xl transition-all shadow-lg active:scale-95">🎨 Generar Código QR</button>

                    <div id="qr-output-container" class="flex flex-col items-center justify-center pt-4"></div>
                </div>

                <!-- PANEL 4: WHATSAPP LINK -->
                <div id="panel-whatsapp" class="tool-panel hidden bg-slate-800/90 backdrop-blur-lg p-8 rounded-[2.5rem] border border-slate-700/70 shadow-xl space-y-6">
                    <div class="border-b border-slate-700/60 pb-4">
                        <h2 class="text-2xl font-black uppercase tracking-tight text-white flex items-center gap-3">
                            <span class="p-2 rounded-xl bg-teal-500/10 text-yeib-teal text-xl">💬</span> Generador de Enlaces de WhatsApp
                        </h2>
                        <p class="text-slate-400 text-xs font-semibold mt-1">Crea un enlace directo para iniciar chats sin guardar contactos.</p>
                    </div>

                    <div class="space-y-4">
                        <div>
                            <label class="block text-[10px] font-black uppercase text-slate-400 tracking-wider mb-2">Número de Teléfono (con código de país sin +)</label>
                            <input type="text" id="wa-phone" placeholder="Ej: 56912345678" class="w-full bg-slate-900 border border-slate-700 rounded-2xl px-5 py-3.5 text-white font-medium text-sm focus:ring-2 focus:ring-yeib-teal focus:outline-none transition-all" />
                        </div>

                        <div>
                            <label class="block text-[10px] font-black uppercase text-slate-400 tracking-wider mb-2">Mensaje Pre-llenado (Opcional)</label>
                            <textarea id="wa-message" placeholder="Ej: Hola, vi tu anuncio y quiero consultar..." class="w-full bg-slate-900 border border-slate-700 rounded-2xl px-5 py-3.5 text-white font-medium text-sm focus:ring-2 focus:ring-yeib-teal focus:outline-none transition-all h-24"></textarea>
                        </div>
                    </div>

                    <button onclick="generateWhatsappLink()" class="px-6 py-3.5 bg-yeib-teal hover:bg-teal-600 text-white font-black text-xs uppercase rounded-2xl transition-all shadow-lg active:scale-95">🔗 Crear Enlace Directo</button>

                    <div id="wa-result" class="hidden space-y-3 pt-2">
                        <label class="block text-[10px] font-black uppercase text-slate-400 tracking-wider">Tu Enlace Generado:</label>
                        <div class="flex flex-wrap gap-2">
                            <input type="text" id="wa-generated-link" readonly class="flex-1 bg-slate-900 border border-slate-700 rounded-2xl px-5 py-3 text-white font-mono text-xs focus:outline-none" />
                            <button onclick="copyWaLink()" class="px-4 py-3 bg-slate-700 hover:bg-slate-600 text-white text-xs font-black uppercase rounded-2xl transition-all">Copiar</button>
                            <a id="wa-test-btn" href="#" target="_blank" class="px-5 py-3 bg-yeib-teal hover:bg-teal-600 text-white text-xs font-black uppercase rounded-2xl transition-all flex items-center">Probar Chat</a>
                        </div>
                    </div>
                </div>

                <!-- PANEL 5: LIMPIADOR DE TEXTO -->
                <div id="panel-cleaner" class="tool-panel hidden bg-slate-800/90 backdrop-blur-lg p-8 rounded-[2.5rem] border border-slate-700/70 shadow-xl space-y-6">
                    <div class="border-b border-slate-700/60 pb-4">
                        <h2 class="text-2xl font-black uppercase tracking-tight text-white flex items-center gap-3">
                            <span class="p-2 rounded-xl bg-teal-500/10 text-yeib-teal text-xl">📝</span> Limpiador y Formateador de Texto
                        </h2>
                        <p class="text-slate-400 text-xs font-semibold mt-1">Normaliza, convierte a mayúsculas/minúsculas y elimina espacios sobrantes instantáneamente.</p>
                    </div>

                    <div class="space-y-2">
                        <label class="block text-[10px] font-black uppercase text-slate-400 tracking-wider">Ingresa tu Texto</label>
                        <textarea id="cleaner-input" oninput="updateTextStats()" placeholder="Pega tu texto aquí..." class="w-full bg-slate-900 border border-slate-700 rounded-2xl px-5 py-3.5 text-white font-medium text-sm focus:ring-2 focus:ring-yeib-teal focus:outline-none transition-all h-36"></textarea>
                    </div>

                    <div class="flex flex-wrap gap-2">
                        <button onclick="processText('upper')" class="px-4 py-2.5 bg-slate-700 hover:bg-slate-650 text-white text-[10px] font-black uppercase rounded-xl transition-all">MAYÚSCULAS</button>
                        <button onclick="processText('lower')" class="px-4 py-2.5 bg-slate-700 hover:bg-slate-650 text-white text-[10px] font-black uppercase rounded-xl transition-all">minúsculas</button>
                        <button onclick="processText('title')" class="px-4 py-2.5 bg-slate-700 hover:bg-slate-650 text-white text-[10px] font-black uppercase rounded-xl transition-all">Modo Título</button>
                        <button onclick="processText('spaces')" class="px-4 py-2.5 bg-slate-700 hover:bg-slate-650 text-white text-[10px] font-black uppercase rounded-xl transition-all">Sin Dobles Espacios</button>
                        <button onclick="processText('newlines')" class="px-4 py-2.5 bg-slate-700 hover:bg-slate-650 text-white text-[10px] font-black uppercase rounded-xl transition-all">Sin Saltos de Línea</button>
                        <button onclick="copyCleanerText()" class="px-5 py-2.5 bg-yeib-teal text-white text-[10px] font-black uppercase rounded-xl transition-all">📋 Copiar Texto</button>
                    </div>

                    <div class="flex items-center gap-6 text-xs text-slate-400 font-bold pt-2">
                        <span>Caracteres: <strong id="text-stat-chars" class="text-yeib-teal font-black">0</strong></span>
                        <span>Palabras: <strong id="text-stat-words" class="text-indigo-400 font-black">0</strong></span>
                        <span>Líneas: <strong id="text-stat-lines" class="text-emerald-400 font-black">0</strong></span>
                    </div>
                </div>

            </div>

            <!-- RIGHT SIDEBAR (1 COL) -->
            <aside class="space-y-6">

                <!-- WIDGET 1: ECOSISTEMA YEIB (5 TARJETAS EXACTAS) -->
                <div class="bg-slate-800/90 backdrop-blur-lg p-6 rounded-[2rem] border border-slate-700/60 shadow-xl space-y-4">
                    <h3 class="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <span>🌐</span> Ecosistema Yeib
                    </h3>
                    <div class="space-y-3">
                        <a href="https://indicadores.yeib.cl" target="_blank" class="block p-3.5 bg-slate-900/60 hover:bg-slate-700/60 rounded-2xl border border-slate-700/50 transition-all group">
                            <div class="text-xs font-black uppercase text-yeib-teal group-hover:text-teal-300 flex items-center justify-between">
                                <span>📈 Indicadores y Datos</span>
                                <span class="text-[9px] text-slate-500 font-normal">↗</span>
                            </div>
                            <div class="text-[11px] text-slate-400 mt-1 leading-relaxed">Indicadores económicos en tiempo real y Kit del Emprendedor.</div>
                        </a>

                        <a href="https://freeblioteca.cl" target="_blank" class="block p-3.5 bg-slate-900/60 hover:bg-slate-700/60 rounded-2xl border border-slate-700/50 transition-all group">
                            <div class="text-xs font-black uppercase text-amber-400 group-hover:text-amber-300 flex items-center justify-between">
                                <span>📚 Freeblioteca</span>
                                <span class="text-[9px] text-slate-500 font-normal">↗</span>
                            </div>
                            <div class="text-[11px] text-slate-400 mt-1 leading-relaxed">Biblioteca digital y tours 3D interactivos con acceso libre.</div>
                        </a>

                        <a href="https://yeib.cl" target="_blank" class="block p-3.5 bg-slate-900/60 hover:bg-slate-700/60 rounded-2xl border border-slate-700/50 transition-all group">
                            <div class="text-xs font-black uppercase text-cyan-400 group-hover:text-cyan-300 flex items-center justify-between">
                                <span>💻 Yeib Portfolio</span>
                                <span class="text-[9px] text-slate-500 font-normal">↗</span>
                            </div>
                            <div class="text-[11px] text-slate-400 mt-1 leading-relaxed">Portal principal y proyectos del laboratorio de software Yeib.</div>
                        </a>

                        <a href="https://proteo.yeib.cl" target="_blank" class="block p-3.5 bg-slate-900/60 hover:bg-slate-700/60 rounded-2xl border border-slate-700/50 transition-all group">
                            <div class="text-xs font-black uppercase text-indigo-400 group-hover:text-indigo-300 flex items-center justify-between">
                                <span>🤖 Proteo AI</span>
                                <span class="text-[9px] text-slate-500 font-normal">↗</span>
                            </div>
                            <div class="text-[11px] text-slate-400 mt-1 leading-relaxed">Sistema de inteligencia artificial y asistente avanzado.</div>
                        </a>

                        <a href="https://cronicon.cl" target="_blank" class="block p-3.5 bg-slate-900/60 hover:bg-slate-700/60 rounded-2xl border border-slate-700/50 transition-all group">
                            <div class="text-xs font-black uppercase text-rose-400 group-hover:text-rose-300 flex items-center justify-between">
                                <span>📜 Cronicón</span>
                                <span class="text-[9px] text-slate-500 font-normal">↗</span>
                            </div>
                            <div class="text-[11px] text-slate-400 mt-1 leading-relaxed">Diario histórico y crónicas del patrimonio nacional.</div>
                        </a>
                    </div>
                </div>

                <!-- WIDGET 2: PUBLICIDAD EXTERNA / SPONSORS -->
                <div class="bg-slate-800/90 backdrop-blur-lg p-6 rounded-[2rem] border border-slate-700/60 shadow-xl space-y-3">
                    <h3 class="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <span>📢</span> Publicidad / Sponsors
                    </h3>
                    <div class="p-6 bg-slate-900/40 border border-dashed border-slate-700 rounded-2xl text-center text-slate-400 text-xs font-bold leading-relaxed">
                        ¿Quieres anunciar tu marca aquí? <br/>
                        <a href="mailto:yeib@pm.me" class="text-yeib-teal font-black hover:underline mt-1.5 inline-block">Envía un correo a yeib@pm.me</a>
                    </div>
                </div>

                <!-- WIDGET 3: PRIVACIDAD ABSOLUTA -->
                <div class="bg-emerald-500/10 p-6 rounded-[2rem] border border-emerald-500/30 space-y-2">
                    <h3 class="text-xs font-black text-emerald-400 uppercase tracking-widest flex items-center gap-2">
                        <span>🛡️</span> Privacidad Absoluta
                    </h3>
                    <p class="text-[11px] text-slate-300 leading-relaxed font-medium">
                        En Yeib no almacenamos ni registramos tus archivos o datos. Todo se procesa localmente en tu propio dispositivo para tu total tranquilidad.
                    </p>
                </div>

            </aside>

        </div>
    </main>

    <!-- FOOTER -->
    <footer class="mt-auto border-t border-slate-800 bg-slate-950 py-8 px-4 text-center">
        <p class="text-xs text-slate-500 font-bold uppercase tracking-wider">© <?php echo date('Y'); ?> <strong class="text-slate-300">Yeib Tools</strong> — Desarrollado con PHP Puro & Vanilla JS para máxima velocidad.</p>
    </footer>

    <!-- LIBRERÍAS Y TAB SWITCHER SCRIPTS -->
    <script src="assets/js/qrcode.min.js"></script>
    <script src="assets/js/tools.js"></script>
    <script>
        function switchTool(toolId) {
            const panels = document.querySelectorAll('.tool-panel');
            panels.forEach(p => p.classList.add('hidden'));

            const buttons = document.querySelectorAll('.tool-tab-btn');
            buttons.forEach(b => {
                b.classList.remove('bg-yeib-teal', 'text-white', 'border-transparent');
                b.classList.add('bg-slate-800', 'text-slate-400', 'border-slate-700/60');
            });

            const targetPanel = document.getElementById('panel-' + toolId);
            if (targetPanel) {
                targetPanel.classList.remove('hidden');
            }

            const targetBtn = document.getElementById('btn-tab-' + toolId);
            if (targetBtn) {
                targetBtn.classList.remove('bg-slate-800', 'text-slate-400', 'border-slate-700/60');
                targetBtn.classList.add('bg-yeib-teal', 'text-white', 'border-transparent');
            }
        }
    </script>
</body>
</html>
