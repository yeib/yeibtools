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
        tab_qr: "QR & Barras",
        tab_links: "Enlaces",
        tab_cleaner: "Limpiador",
        tab_crypto: "Dev & Crypto",
        tab_diff: "Comparador",

        // Transcriptor YouTube
        yt_title: "Transcriptor de YouTube",
        yt_subtitle: "Extrae transcripciones completas con marcas de tiempo usando proxy SOCKS5.",
        yt_label: "Ingresa la URL o ID del Video",
        yt_placeholder: "Ej: https://www.youtube.com/watch?v=jNQXAC9IVRw",
        yt_btn: "⚡ Obtener Transcripción",
        yt_copy_prompt: "🤖 Copiar Prompt para tu IA",
        yt_copy_full: "📋 Con Tiempos",
        yt_copy_plain: "📄 Solo Texto",
        yt_copy_paragraphs: "📖 Párrafos Fluídos",
        yt_search_placeholder: "🔍 Buscar palabra en la transcripción...",
        yt_download_txt: "📥 Descargar .TXT",
        yt_download_md: "📝 Descargar .MD",

        // Metadatos Forenses & Editor
        meta_title: "Lector y Editor Forense de Metadatos (EXIF & PDF)",
        meta_subtitle: "Inspecciona, modifica o borra datos ocultos (Autor, Fechas, GPS, Software) 100% en tu navegador.",
        meta_drop_title: "Arrastra tu archivo aquí o haz clic para examinar",
        meta_drop_subtitle: "Soporta imágenes (JPG, PNG, WEBP) y documentos PDF.",
        meta_security: "🔒 <strong>Seguridad Extrema:</strong> El archivo se procesa localmente en la memoria RAM de tu dispositivo. Cero bytes subidos a la VPS.",

        meta_editor_title: "🛠️ Editor & Sanitizador de Metadatos Avanzado",
        meta_author_label: "Nombre de Autor",
        meta_title_label: "Título del Documento",
        meta_subject_label: "Asunto / Tema",
        meta_creator_label: "Software / Creador",
        meta_producer_label: "Productor PDF",
        meta_date_label: "Fecha de Creación",
        meta_btn_sanitize: "🧹 Borrar Todos los Metadatos Ocultos",
        meta_btn_save: "💾 Guardar & Descargar PDF Sanitizado",

        // QR & Código de Barras
        qr_title: "Generador de Códigos QR & Códigos de Barras (HD)",
        qr_subtitle: "Crea códigos QR personalizados y códigos de barras (Code128 / EAN) de alta resolución.",
        qr_type_label: "Tipo de Código",
        qr_type_qr: "Código QR Personalizado",
        qr_type_barcode: "Código de Barras (Code 128 / EAN)",
        qr_label: "Texto, URL o Código a Generar",
        qr_color_label: "Estilo de Color",
        qr_bg_label: "Fondo",
        qr_logo_option: "Incluir insignia de verificación Yeib en QR 🚀",
        qr_btn: "🎨 Generar Código HD",

        // Enlaces Directos (WhatsApp, Mail, Tel/SMS)
        links_title: "Generador de Enlaces Directos",
        links_subtitle: "Crea accesos directos para chats de WhatsApp, correos mailto y llamadas/SMS sin registrar contactos.",
        links_tab_wa: "💬 WhatsApp",
        links_tab_mail: "✉️ Correo Mailto",
        links_tab_tel: "📞 Teléfono / SMS",
        wa_phone_label: "Número de Teléfono (con código de país sin +)",
        wa_msg_label: "Mensaje Pre-llenado (Opcional)",
        wa_btn: "🔗 Crear Enlace Directo WhatsApp",
        mail_to_label: "Correo Electrónico Destino",
        mail_sub_label: "Asunto del Correo",
        mail_body_label: "Cuerpo del Mensaje (Opcional)",
        mail_btn: "✉️ Crear Enlace Mailto",
        tel_num_label: "Número Telefónico",
        tel_type_label: "Acción Directa",
        tel_btn: "📞 Crear Enlace Telefónico / SMS",

        // Limpiador de Texto
        clean_title: "Limpiador y Formateador de Texto Avanzado",
        clean_subtitle: "Normaliza texto, arregla saltos de línea de PDFs, prepara prompts para IA y deshace cambios.",
        clean_label: "Ingresa tu Texto",
        clean_placeholder: "Pega tu texto aquí...",
        clean_upper: "MAYÚSCULAS",
        clean_lower: "minúsculas",
        clean_title_case: "Modo Título",
        clean_spaces: "Sin Dobles Espacios",
        clean_newlines: "Sin Saltos de Línea",
        clean_pdf: "📄 Arreglar Saltos PDF",
        clean_ai: "🤖 Limpieza Prompt IA",
        clean_undo: "↺ Deshacer",
        clean_copy: "📋 Copiar Texto",
        clean_chars: "Caracteres:",
        clean_words: "Palabras:",
        clean_lines: "Líneas:",

        // Dev & Crypto Suite
        crypto_title: "Dev & Crypto Suite (Criptografía & Hashes)",
        crypto_subtitle: "Herramientas de cifrado AES, generador de Hashes, encoder Base64 y contraseñas seguras 100% client-side.",
        crypto_tab_cipher: "🔒 Cifrador AES",
        crypto_tab_hash: "⚡ Hashes (SHA/MD5)",
        crypto_tab_pass: "🔑 Generador Passwords",
        crypto_tab_base64: "🔤 Base64 / URL",

        // Diff Checker
        diff_title: "Comparador Forense de Textos (Diff Checker)",
        diff_subtitle: "Inspecciona diferencias entre dos bloques de texto en tiempo real. Resaltado de agregados y eliminaciones.",
        diff_label_original: "Texto Original (Versión A)",
        diff_label_modified: "Texto Modificado (Versión B)",
        diff_btn_compare: "🔍 Comparar Diferencias",
        diff_added: "Agregado",
        diff_removed: "Eliminado",

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
        privacy_body: "En Yeib no almacenamos ni registramos tus archivos, búsquedas o datos personales. Todo procesamiento de metadatos, cifrado y herramientas ocurre 100% en el navegador de tu propio dispositivo para tu total tranquilidad.",
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
        tab_qr: "QR & Barcodes",
        tab_links: "Direct Links",
        tab_cleaner: "Text Cleaner",
        tab_crypto: "Dev & Crypto",
        tab_diff: "Diff Checker",

        // Transcriptor YouTube
        yt_title: "YouTube Transcriptor",
        yt_subtitle: "Extract full transcripts with timestamps using SOCKS5 proxy.",
        yt_label: "Enter Video URL or YouTube ID",
        yt_placeholder: "Ex: https://www.youtube.com/watch?v=jNQXAC9IVRw",
        yt_btn: "⚡ Get Transcript",
        yt_copy_prompt: "🤖 Copy Prompt for your AI",
        yt_copy_full: "📋 With Timestamps",
        yt_copy_plain: "📄 Plain Text",
        yt_copy_paragraphs: "📖 Fluent Paragraphs",
        yt_search_placeholder: "🔍 Search word in transcript...",
        yt_download_txt: "📥 Download .TXT",
        yt_download_md: "📝 Download .MD",

        // Metadatos Forenses & Editor
        meta_title: "Forensic Metadata Reader & Editor (EXIF & PDF)",
        meta_subtitle: "Inspect, modify or wipe hidden data (Author, Dates, GPS, Software) 100% inside your browser.",
        meta_drop_title: "Drag your file here or click to browse",
        meta_drop_subtitle: "Supports images (JPG, PNG, WEBP) and PDF documents.",
        meta_security: "🔒 <strong>Extreme Security:</strong> File is processed locally inside your device RAM. Zero bytes uploaded to VPS.",

        meta_editor_title: "🛠️ Advanced Metadata Editor & Sanitizer",
        meta_author_label: "Author Name",
        meta_title_label: "Document Title",
        meta_subject_label: "Subject",
        meta_creator_label: "Software / Creator",
        meta_producer_label: "PDF Producer",
        meta_date_label: "Creation Date",
        meta_btn_sanitize: "🧹 Wipe All Hidden Metadata",
        meta_btn_save: "💾 Save & Download Sanitized PDF",

        // QR & Código de Barras
        qr_title: "QR Code & Barcode Generator (HD)",
        qr_subtitle: "Create custom high-res QR codes and standard Barcodes (Code128 / EAN).",
        qr_type_label: "Code Type",
        qr_type_qr: "Custom QR Code",
        qr_type_barcode: "Barcode (Code 128 / EAN)",
        qr_label: "Text, URL or Code to Encode",
        qr_color_label: "Color Style",
        qr_bg_label: "Background",
        qr_logo_option: "Include Yeib verification badge on QR 🚀",
        qr_btn: "🎨 Generate HD Code",

        // Enlaces Directos
        links_title: "Direct Link Generator",
        links_subtitle: "Create direct shortcuts for WhatsApp chats, mailto emails and phone calls/SMS without saving contacts.",
        links_tab_wa: "💬 WhatsApp",
        links_tab_mail: "✉️ Email Mailto",
        links_tab_tel: "📞 Phone / SMS",
        wa_phone_label: "Phone Number (with country code without +)",
        wa_msg_label: "Pre-filled Message (Optional)",
        wa_btn: "🔗 Create Direct WhatsApp Link",
        mail_to_label: "Destination Email",
        mail_sub_label: "Email Subject",
        mail_body_label: "Message Body (Optional)",
        mail_btn: "✉️ Create Mailto Link",
        tel_num_label: "Phone Number",
        tel_type_label: "Direct Action",
        tel_btn: "📞 Create Phone / SMS Link",

        // Limpiador de Texto
        clean_title: "Advanced Text Cleaner & Formatter",
        clean_subtitle: "Normalize text, fix PDF line breaks, prepare prompts for AI and undo changes.",
        clean_label: "Enter your Text",
        clean_placeholder: "Paste your text here...",
        clean_upper: "UPPERCASE",
        clean_lower: "lowercase",
        clean_title_case: "Title Case",
        clean_spaces: "Strip Extra Spaces",
        clean_newlines: "Strip Newlines",
        clean_pdf: "📄 Fix PDF Line Breaks",
        clean_ai: "🤖 AI Prompt Clean",
        clean_undo: "↺ Undo",
        clean_copy: "📋 Copy Text",
        clean_chars: "Characters:",
        clean_words: "Words:",
        clean_lines: "Lines:",

        // Dev & Crypto Suite
        crypto_title: "Dev & Crypto Suite (Cryptography & Hashes)",
        crypto_subtitle: "AES encryption, Hash generator, Base64 encoder and strong password generator 100% client-side.",
        crypto_tab_cipher: "🔒 AES Cipher",
        crypto_tab_hash: "⚡ Hashes (SHA/MD5)",
        crypto_tab_pass: "🔑 Password Generator",
        crypto_tab_base64: "🔤 Base64 / URL",

        // Diff Checker
        diff_title: "Forensic Text Diff Checker",
        diff_subtitle: "Inspect differences between two text blocks in real time. Highlight additions and deletions.",
        diff_label_original: "Original Text (Version A)",
        diff_label_modified: "Modified Text (Version B)",
        diff_btn_compare: "🔍 Compare Differences",
        diff_added: "Added",
        diff_removed: "Removed",

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
        privacy_body: "At Yeib we do not store or log your files, searches or personal data. All processing of metadata, encryption and tools happens 100% inside your own device browser for your total peace of mind.",
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

    document.documentElement.lang = lang;

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

    const badgeEs = document.getElementById('lang-btn-es');
    const badgeEn = document.getElementById('lang-btn-en');
    
    if (badgeEs && badgeEn) {
        if (lang === 'es') {
            badgeEs.className = 'px-2.5 py-1 bg-yeib-teal text-white rounded-lg text-[10px] font-black uppercase transition-all shadow-sm cursor-pointer';
            badgeEn.className = 'px-2.5 py-1 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-lg text-[10px] font-black uppercase transition-all cursor-pointer';
        } else {
            badgeEn.className = 'px-2.5 py-1 bg-yeib-teal text-white rounded-lg text-[10px] font-black uppercase transition-all shadow-sm cursor-pointer';
            badgeEs.className = 'px-2.5 py-1 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-lg text-[10px] font-black uppercase transition-all cursor-pointer';
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    setLanguage(currentLang);
});
