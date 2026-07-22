/**
 * YEIB TOOLS - INTERACTVIDAD Y CLIENT-SIDE LOGIC
 * Cero rastreo, cero procesamiento de archivos en backend
 */

document.addEventListener('DOMContentLoaded', () => {
    // Configurar Tabs
    window.switchTool = function(toolId, btn) {
        document.querySelectorAll('.tool-panel').forEach(p => p.classList.remove('active'));
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        
        const targetPanel = document.getElementById('panel-' + toolId);
        if (targetPanel) {
            targetPanel.classList.add('active');
        }
        if (btn) {
            btn.classList.add('active');
        }
    };

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
        statusBox.innerHTML = '<div class="privacy-pill"><span class="privacy-dot"></span> Procesando transcripción mediante proxy SOCKS5...</div>';
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
                statusBox.innerHTML = `<div style="color: var(--accent-rose); font-weight: 800;">✕ Error: ${data.error}</div>`;
            }
        } catch (err) {
            statusBox.innerHTML = `<div style="color: var(--accent-rose); font-weight: 800;">✕ Error al conectar con la API de transcripción.</div>`;
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
            dropzone.style.borderColor = 'var(--primary-teal)';
        });

        dropzone.addEventListener('dragleave', () => {
            dropzone.style.borderColor = 'rgba(13, 148, 136, 0.4)';
        });

        dropzone.addEventListener('drop', (e) => {
            e.preventDefault();
            dropzone.style.borderColor = 'rgba(13, 148, 136, 0.4)';
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

        // Contar páginas aproximadas
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

        // Detección simple de cabeceras de imagen
        if (view.getUint16(0, false) === 0xFFD8) {
            meta["Metadatos EXIF / Cabeceras"]["Formato"] = "JPEG / JFIF";
            let offset = 2;
            while (offset < view.byteLength) {
                const marker = view.getUint16(offset, false);
                if (marker === 0xFFE1) { // APP1 EXIF marker
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
            const qr = new QRCode(4, 0); // Type 4, Error Correction L
            qr.addData(text);
            qr.make();
            const dataUrl = qr.createDataURL(7, 4);

            const img = document.createElement('img');
            img.src = dataUrl;
            img.style.borderRadius = '1rem';
            img.style.border = '2px solid var(--border-glass)';
            img.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';

            const downloadBtn = document.createElement('a');
            downloadBtn.href = dataUrl;
            downloadBtn.download = 'codigo_qr_yeibtools.png';
            downloadBtn.className = 'btn-action mt-4';
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
