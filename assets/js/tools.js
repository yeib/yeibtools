/**
 * YEIB TOOLS - INTERACTIVIDAD, THEME TOGGLE & CLIENT-SIDE LOGIC
 * Cero rastreo, cero procesamiento de archivos en backend
 */

// Theme Engine (Dark / Light Mode)
function initTheme() {
    const savedTheme = localStorage.getItem('yeib_tools_theme') || 'dark';
    const btn = document.getElementById('theme-toggle-btn');
    
    if (savedTheme === 'light') {
        document.documentElement.classList.remove('dark');
        if (btn) btn.innerText = '🌙';
    } else {
        document.documentElement.classList.add('dark');
        if (btn) btn.innerText = '☀️';
    }
}

window.toggleTheme = function() {
    const isDark = document.documentElement.classList.contains('dark');
    const btn = document.getElementById('theme-toggle-btn');
    
    if (isDark) {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('yeib_tools_theme', 'light');
        if (btn) btn.innerText = '🌙';
    } else {
        document.documentElement.classList.add('dark');
        localStorage.setItem('yeib_tools_theme', 'dark');
        if (btn) btn.innerText = '☀️';
    }
};

// Switch Tabs Engine (Tailwind & i18n compatible)
window.switchTool = function(toolId) {
    // Hide all panels
    const panels = document.querySelectorAll('.tool-panel');
    panels.forEach(p => p.classList.add('hidden'));

    // Reset button styles
    const buttons = document.querySelectorAll('.tool-tab-btn');
    buttons.forEach(b => {
        b.classList.remove('bg-yeib-teal', 'text-white', 'border-transparent', 'shadow-md');
        b.classList.add('bg-slate-100', 'dark:bg-slate-800', 'text-slate-600', 'dark:text-slate-400', 'border-slate-200', 'dark:border-slate-700/60');
    });

    // Show target panel
    const targetPanel = document.getElementById('panel-' + toolId);
    if (targetPanel) {
        targetPanel.classList.remove('hidden');
    }

    // Highlight active button
    const targetBtn = document.getElementById('btn-tab-' + toolId);
    if (targetBtn) {
        targetBtn.classList.remove('bg-slate-100', 'dark:bg-slate-800', 'text-slate-600', 'dark:text-slate-400', 'border-slate-200', 'dark:border-slate-700/60');
        targetBtn.classList.add('bg-yeib-teal', 'text-white', 'border-transparent', 'shadow-md');
    }
};

document.addEventListener('DOMContentLoaded', () => {
    initTheme();

    // --- 1. YOUTUBE TRANSCRIPT ---
    let currentTranscriptText = '';

    window.fetchTranscript = async function() {
        const input = document.getElementById('yt-input').value.trim();
        const statusBox = document.getElementById('yt-status');
        const resultBox = document.getElementById('yt-result');
        const textContainer = document.getElementById('yt-raw-text');

        if (!input) {
            alert('Por favor ingresa una URL de YouTube.');
            return;
        }

        statusBox.classList.remove('hidden');
        statusBox.innerHTML = '<div class="p-3 bg-teal-500/10 text-yeib-teal rounded-xl font-bold text-xs">⚡ Procesando transcripción mediante proxy SOCKS5...</div>';
        resultBox.classList.add('hidden');

        try {
            const resp = await fetch('api/transcript.php?url=' + encodeURIComponent(input));
            const data = await resp.json();

            if (data.success) {
                statusBox.classList.add('hidden');
                resultBox.classList.remove('hidden');
                
                currentTranscriptText = data.raw_text;
                textContainer.innerText = data.raw_text;

                document.getElementById('yt-meta-info').innerText = `Total de líneas: ${data.total_lines} | ID Video: ${data.video_id}`;
            } else {
                statusBox.innerHTML = `<div class="p-3 bg-rose-500/10 text-rose-500 rounded-xl font-bold text-xs">✕ Error: ${data.error}</div>`;
            }
        } catch (err) {
            statusBox.innerHTML = `<div class="p-3 bg-rose-500/10 text-rose-500 rounded-xl font-bold text-xs">✕ Error al conectar con la API de transcripción.</div>`;
        }
    };

    window.copyYtText = function(type) {
        if (!currentTranscriptText) return;
        let textToCopy = currentTranscriptText;
        if (type === 'plain') {
            textToCopy = currentTranscriptText.replace(/\[\d{2}:\d{2}(?::\d{2})?\]\s*/g, '');
        }
        navigator.clipboard.writeText(textToCopy);
        alert('¡Transcripción copiada al portapapeles!');
    };

    window.downloadYtText = function() {
        if (!currentTranscriptText) return;
        const blob = new Blob([currentTranscriptText], { type: 'text/plain;charset=utf-8' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'transcripcion_youtube.txt';
        a.click();
    };


    // --- 2. LECTOR DE METADATOS FORENSES (IMÁGENES Y PDFS 100% LOCAL) ---
    const dropzone = document.getElementById('metadata-dropzone');
    const fileInput = document.getElementById('metadata-file-input');

    if (dropzone && fileInput) {
        dropzone.addEventListener('click', () => fileInput.click());

        dropzone.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropzone.classList.add('border-yeib-teal');
        });

        dropzone.addEventListener('dragleave', () => {
            dropzone.classList.remove('border-yeib-teal');
        });

        dropzone.addEventListener('drop', (e) => {
            e.preventDefault();
            dropzone.classList.remove('border-yeib-teal');
            if (e.dataTransfer.files.length > 0) {
                processLocalFile(e.dataTransfer.files[0]);
            }
        });

        fileInput.addEventListener('change', (e) => {
            if (e.target.files.length > 0) {
                processLocalFile(e.target.files[0]);
            }
        });
    }

    function processLocalFile(file) {
        const resultBox = document.getElementById('metadata-result');
        const output = document.getElementById('metadata-output');
        const fileNameTag = document.getElementById('metadata-filename');

        resultBox.classList.remove('hidden');
        fileNameTag.innerText = `📄 ${file.name} (${(file.size / 1024).toFixed(1)} KB)`;
        output.innerText = 'Analizando metadatos localmente en tu navegador...';

        const reader = new FileReader();

        if (file.type === 'application/pdf') {
            reader.onload = function(e) {
                const content = e.target.result;
                const metadata = extractPdfMetadata(content, file);
                output.innerText = formatMetadataJson(metadata);
            };
            reader.readAsText(file.slice(0, 100000)); // Leer primeras 100KB del PDF
        } else if (file.type.startsWith('image/')) {
            reader.onload = function(e) {
                const buffer = e.target.result;
                const metadata = extractImageMetadata(buffer, file);
                output.innerText = formatMetadataJson(metadata);
            };
            reader.readAsArrayBuffer(file);
        } else {
            output.innerText = `Tipo de archivo: ${file.type || 'Desconocido'}\nTamaño: ${file.size} bytes\nÚltima modificación: ${new Date(file.lastModified).toLocaleString()}`;
        }
    }

    function extractPdfMetadata(text, file) {
        const meta = {
            "Archivo": file.name,
            "Tamaño": `${(file.size / 1024).toFixed(2)} KB`,
            "Tipo MIME": file.type,
            "Última Modificación Local": new Date(file.lastModified).toISOString(),
            "Metadatos Internos PDF": {}
        };

        const title = text.match(/\/Title\s*\((.*?)\)/);
        const author = text.match(/\/Author\s*\((.*?)\)/);
        const creator = text.match(/\/Creator\s*\((.*?)\)/);
        const producer = text.match(/\/Producer\s*\((.*?)\)/);
        const creationDate = text.match(/\/CreationDate\s*\((.*?)\)/);
        const modDate = text.match(/\/ModDate\s*\((.*?)\)/);
        const version = text.match(/%PDF-1\.\d/);

        if (version) meta["Metadatos Internos PDF"]["Versión PDF"] = version[0];
        if (title) meta["Metadatos Internos PDF"]["Título"] = title[1];
        if (author) meta["Metadatos Internos PDF"]["Autor"] = author[1];
        if (creator) meta["Metadatos Internos PDF"]["Creador / Software"] = creator[1];
        if (producer) meta["Metadatos Internos PDF"]["Productor PDF"] = producer[1];
        if (creationDate) meta["Metadatos Internos PDF"]["Fecha Creación PDF"] = creationDate[1];
        if (modDate) meta["Metadatos Internos PDF"]["Fecha Modificación PDF"] = modDate[1];

        const pageMatches = text.match(/\/Type\s*\/Page\b/g);
        if (pageMatches) {
            meta["Metadatos Internos PDF"]["Páginas Estimadas"] = pageMatches.length;
        }

        return meta;
    }

    function extractImageMetadata(buffer, file) {
        const view = new DataView(buffer);
        const meta = {
            "Nombre": file.name,
            "Tamaño": `${(file.size / 1024).toFixed(2)} KB`,
            "Tipo": file.type,
            "Última Modificación Local": new Date(file.lastModified).toLocaleString(),
            "Metadatos EXIF / Cabeceras": {}
        };

        if (view.getUint16(0, false) === 0xFFD8) {
            meta["Metadatos EXIF / Cabeceras"]["Formato"] = "JPEG / JFIF";
            let offset = 2;
            while (offset < view.byteLength) {
                const marker = view.getUint16(offset, false);
                if (marker === 0xFFE1) {
                    meta["Metadatos EXIF / Cabeceras"]["Marcador EXIF"] = "Presente (Cabecera APP1 detectada)";
                    break;
                }
                offset += 2 + view.getUint16(offset + 2, false);
            }
        } else if (view.getUint32(0, false) === 0x89504E47) {
            meta["Metadatos EXIF / Cabeceras"]["Formato"] = "PNG";
            meta["Metadatos EXIF / Cabeceras"]["Ancho"] = view.getUint32(16, false) + " px";
            meta["Metadatos EXIF / Cabeceras"]["Alto"] = view.getUint32(20, false) + " px";
        }

        return meta;
    }

    function formatMetadataJson(obj) {
        return JSON.stringify(obj, null, 2);
    }


    // --- 3. GENERADOR DE CÓDIGO QR ---
    window.generateQrCode = function() {
        const text = document.getElementById('qr-text-input').value.trim();
        const container = document.getElementById('qr-output-container');

        if (!text) {
            alert('Ingresa el texto o URL para generar el QR.');
            return;
        }

        container.innerHTML = '';
        try {
            const qr = new QRCode(4, 0);
            qr.addData(text);
            qr.make();
            const dataUrl = qr.createDataURL(7, 4);

            const img = document.createElement('img');
            img.src = dataUrl;
            img.className = 'rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xl';

            const downloadBtn = document.createElement('a');
            downloadBtn.href = dataUrl;
            downloadBtn.download = 'codigo_qr_yeibtools.png';
            downloadBtn.className = 'px-6 py-3 bg-yeib-teal text-white font-black text-xs uppercase rounded-2xl transition-all shadow-lg inline-block mt-4';
            downloadBtn.innerText = '📥 Descargar QR Imagen';

            container.appendChild(img);
            container.appendChild(document.createElement('br'));
            container.appendChild(downloadBtn);
        } catch (e) {
            container.innerText = 'Error al generar código QR. Texto demasiado largo.';
        }
    };


    // --- 4. WHATSAPP LINK GENERATOR ---
    window.generateWhatsappLink = function() {
        const phone = document.getElementById('wa-phone').value.replace(/[^0-9]/g, '');
        const message = document.getElementById('wa-message').value.trim();
        const resultBox = document.getElementById('wa-result');
        const linkInput = document.getElementById('wa-generated-link');

        if (!phone) {
            alert('Por favor ingresa un número de teléfono válido con código de país (Ej: 56912345678).');
            return;
        }

        let link = `https://wa.me/${phone}`;
        if (message) {
            link += `?text=${encodeURIComponent(message)}`;
        }

        linkInput.value = link;
        resultBox.classList.remove('hidden');

        document.getElementById('wa-test-btn').href = link;
    };

    window.copyWaLink = function() {
        const link = document.getElementById('wa-generated-link').value;
        navigator.clipboard.writeText(link);
        alert('¡Enlace de WhatsApp copiado!');
    };


    // --- 5. LIMPIADOR DE TEXTO ---
    window.processText = function(action) {
        const input = document.getElementById('cleaner-input');
        let text = input.value;

        switch(action) {
            case 'upper':
                text = text.toUpperCase();
                break;
            case 'lower':
                text = text.toLowerCase();
                break;
            case 'title':
                text = text.replace(/\w\S*/g, (w) => w.charAt(0).toUpperCase() + w.substr(1).toLowerCase());
                break;
            case 'spaces':
                text = text.replace(/[ \t]+/g, ' ').replace(/^\s+|\s+$/gm, '');
                break;
            case 'newlines':
                text = text.replace(/[\r\n]+/g, ' ');
                break;
            case 'clear':
                text = '';
                break;
        }

        input.value = text;
        updateTextStats();
    };

    window.updateTextStats = function() {
        const text = document.getElementById('cleaner-input').value;
        const chars = text.length;
        const words = text.trim() ? text.trim().split(/\s+/).length : 0;
        const lines = text ? text.split(/\r\n|\r|\n/).length : 0;

        document.getElementById('text-stat-chars').innerText = chars;
        document.getElementById('text-stat-words').innerText = words;
        document.getElementById('text-stat-lines').innerText = lines;
    };

    window.copyCleanerText = function() {
        const text = document.getElementById('cleaner-input').value;
        navigator.clipboard.writeText(text);
        alert('¡Texto copiado al portapapeles!');
    };
});
