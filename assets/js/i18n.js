/**
 * Yeib Tools - Internationalization (i18n) Engine
 * Language Dictionary: ES (Español) & EN (English)
 * 100% Client-Side, Instant switching & Persistent in LocalStorage
 */

const translations = {
    es: {
        // Navbar
        donate: "Donar",
        
        // Tabs
        tab_youtube: "Transcriptor",
        tab_metadata: "Metadatos",
        tab_qr: "Código QR",
        tab_whatsapp: "WhatsApp",
        tab_cleaner: "Limpiador",

        // Transcriptor YouTube
        yt_title: "Transcriptor de YouTube",
        yt_subtitle: "Extrae transcripciones completas con marcas de tiempo usando proxy SOCKS5.",
        yt_label: "Ingresa la URL o ID del Video",
        yt_placeholder: "Ej: https://www.youtube.com/watch?v=jNQXAC9IVRw",
        yt_btn: "⚡ Obtener Transcripción",
        yt_copy_full: "📋 Con Tiempos",
        yt_copy_plain: "📄 Solo Texto",
        yt_download: "📥 Descargar .TXT",

        // Metadatos Forenses
        meta_title: "Lector de Metadatos Forenses (EXIF & PDF)",
        meta_subtitle: "Inspecciona autor, software, modelo de cámara, fechas e información oculta localmente.",
        meta_drop_title: "Arrastra tu archivo aquí o haz clic para examinar",
        meta_drop_subtitle: "Soporta imágenes (JPG, PNG, WEBP) y documentos PDF.",
        meta_security: "🔒 <strong>Seguridad Extrema:</strong> El archivo se lee localmente desde la memoria de tu dispositivo. Ningún byte sale hacia el servidor.",

        // Código QR
        qr_title: "Generador de Código QR",
        qr_subtitle: "Genera códigos QR de alta resolución instantáneamente en tu navegador.",
        qr_label: "Texto o URL a Codificar",
        qr_btn: "🎨 Generar Código QR",

        // WhatsApp
        wa_title: "Generador de Enlaces de WhatsApp",
        wa_subtitle: "Crea un enlace directo para iniciar chats sin guardar contactos.",
        wa_phone_label: "Número de Teléfono (con código de país sin +)",
        wa_msg_label: "Mensaje Pre-llenado (Opcional)",
        wa_btn: "🔗 Crear Enlace Directo",
        wa_result_label: "Tu Enlace Generado:",
        wa_copy: "Copiar",
        wa_test: "Probar Chat",

        // Limpiador de Texto
        clean_title: "Limpiador y Formateador de Texto",
        clean_subtitle: "Normaliza, convierte a mayúsculas/minúsculas y elimina espacios sobrantes instantáneamente.",
        clean_label: "Ingresa tu Texto",
        clean_placeholder: "Pega tu texto aquí...",
        clean_upper: "MAYÚSCULAS",
        clean_lower: "minúsculas",
        clean_title_case: "Modo Título",
        clean_spaces: "Sin Dobles Espacios",
        clean_newlines: "Sin Saltos de Línea",
        clean_copy: "📋 Copiar Texto",
        clean_chars: "Caracteres:",
        clean_words: "Palabras:",
        clean_lines: "Líneas:",

        // Sidebar
        ad_title: "Publicidad / Sponsors",
        ad_text: "¿Quieres anunciar tu marca aquí?",
        ad_link: "Envía un correo a yeib@pm.me",

        eco_title: "Ecosistema Yeib",
        eco_1_desc: "Indicadores económicos en tiempo real y Kit del Emprendedor.",
        eco_2_desc: "Biblioteca digital y tours 3D interactivos con acceso libre.",
        eco_3_desc: "Portal principal y proyectos del laboratorio de software Yeib.",
        eco_4_desc: "Sistema de inteligencia artificial y asistente avanzado.",
        eco_5_desc: "Diario histórico y crónicas del patrimonio nacional.",

        // Footer
        privacy_title: "🛡️ Privacidad Absoluta:",
        privacy_body: "En Yeib no almacenamos ni registramos tus archivos, búsquedas o datos personales. Todo procesamiento de metadatos, códigos y herramientas ocurre 100% en el navegador de tu propio dispositivo para tu total tranquilidad.",
        footer_rights: "© " + new Date().getFullYear() + " Yeib. Todos los derechos reservados.",
        footer_subtitle: "Suite de Micro-Herramientas Gratuitas & Análisis Forense",
        footer_made_in: "Hecho en Chile por"
    },
    en: {
        // Navbar
        donate: "Donate",
        
        // Tabs
        tab_youtube: "Transcript",
        tab_metadata: "Metadata",
        tab_qr: "QR Code",
        tab_whatsapp: "WhatsApp",
        tab_cleaner: "Text Cleaner",

        // Transcriptor YouTube
        yt_title: "YouTube Transcriptor",
        yt_subtitle: "Extract full transcripts with timestamps using SOCKS5 proxy.",
        yt_label: "Enter Video URL or YouTube ID",
        yt_placeholder: "Ex: https://www.youtube.com/watch?v=jNQXAC9IVRw",
        yt_btn: "⚡ Get Transcript",
        yt_copy_full: "📋 With Timestamps",
        yt_copy_plain: "📄 Plain Text",
        yt_download: "📥 Download .TXT",

        // Metadatos Forenses
        meta_title: "Forensic Metadata Reader (EXIF & PDF)",
        meta_subtitle: "Inspect author, software, camera model, dates and hidden info locally.",
        meta_drop_title: "Drag your file here or click to browse",
        meta_drop_subtitle: "Supports images (JPG, PNG, WEBP) and PDF documents.",
        meta_security: "🔒 <strong>Extreme Security:</strong> File is read locally from your device memory. Zero bytes leave for the server.",

        // Código QR
        qr_title: "QR Code Generator",
        qr_subtitle: "Generate high resolution QR codes instantly in your browser.",
        qr_label: "Text or URL to Encode",
        qr_btn: "🎨 Generate QR Code",

        // WhatsApp
        wa_title: "WhatsApp Link Generator",
        wa_subtitle: "Create direct links to start chats without saving contacts.",
        wa_phone_label: "Phone Number (with country code without +)",
        wa_msg_label: "Pre-filled Message (Optional)",
        wa_btn: "🔗 Create Direct Link",
        wa_result_label: "Your Generated Link:",
        wa_copy: "Copy",
        wa_test: "Test Chat",

        // Limpiador de Texto
        clean_title: "Text Cleaner & Formatter",
        clean_subtitle: "Normalize, convert to uppercase/lowercase and strip excess spaces instantly.",
        clean_label: "Enter your Text",
        clean_placeholder: "Paste your text here...",
        clean_upper: "UPPERCASE",
        clean_lower: "lowercase",
        clean_title_case: "Title Case",
        clean_spaces: "Strip Extra Spaces",
        clean_newlines: "Strip Newlines",
        clean_copy: "📋 Copy Text",
        clean_chars: "Characters:",
        clean_words: "Words:",
        clean_lines: "Lines:",

        // Sidebar
        ad_title: "Ads / Sponsors",
        ad_text: "Want to advertise your brand here?",
        ad_link: "Send an email to yeib@pm.me",

        eco_title: "Yeib Ecosystem",
        eco_1_desc: "Real-time economic indicators and Entrepreneur Kit.",
        eco_2_desc: "Digital library and interactive 3D tours with free access.",
        eco_3_desc: "Main portal and projects of Yeib software lab.",
        eco_4_desc: "AI system and advanced assistant.",
        eco_5_desc: "Historical newspaper and national heritage chronicles.",

        // Footer
        privacy_title: "🛡️ Absolute Privacy:",
        privacy_body: "At Yeib we do not store or log your files, searches or personal data. All processing of metadata, codes and tools happens 100% inside your own device browser for your total peace of mind.",
        footer_rights: "© " + new Date().getFullYear() + " Yeib. All rights reserved.",
        footer_subtitle: "Free Micro-Tools Suite & Forensic Analysis",
        footer_made_in: "Made in Chile by"
    }
};

let currentLang = localStorage.getItem('yeib_tools_lang') || 'es';

function setLanguage(lang) {
    if (!translations[lang]) return;
    currentLang = lang;
    localStorage.setItem('yeib_tools_lang', lang);

    // Update HTML lang attribute
    document.documentElement.lang = lang;

    // Translate all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang][key]) {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                if (el.hasAttribute('placeholder')) {
                    el.placeholder = translations[lang][key];
                }
            } else {
                el.innerHTML = translations[lang][key];
            }
        }
    });

    // Update Language Toggle Button Badges
    const badgeEs = document.getElementById('lang-btn-es');
    const badgeEn = document.getElementById('lang-btn-en');
    
    if (badgeEs && badgeEn) {
        if (lang === 'es') {
            badgeEs.className = 'px-2 py-1 bg-yeib-teal text-white rounded-lg text-[10px] font-black uppercase transition-all shadow-sm';
            badgeEn.className = 'px-2 py-1 text-slate-400 hover:text-white rounded-lg text-[10px] font-black uppercase transition-all';
        } else {
            badgeEn.className = 'px-2 py-1 bg-yeib-teal text-white rounded-lg text-[10px] font-black uppercase transition-all shadow-sm';
            badgeEs.className = 'px-2 py-1 text-slate-400 hover:text-white rounded-lg text-[10px] font-black uppercase transition-all';
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    setLanguage(currentLang);
});
