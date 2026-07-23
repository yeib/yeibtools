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
        if (btn) btn.innerText = '☀️';
    } else {
        document.documentElement.classList.add('dark');
        if (btn) btn.innerText = '🌙';
    }
}

window.toggleTheme = function() {
    const isDark = document.documentElement.classList.contains('dark');
    const btn = document.getElementById('theme-toggle-btn');
    
    if (isDark) {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('yeib_tools_theme', 'light');
        if (btn) btn.innerText = '☀️';
    } else {
        document.documentElement.classList.add('dark');
        localStorage.setItem('yeib_tools_theme', 'dark');
        if (btn) btn.innerText = '🌙';
    }
};

// Switch Tabs Engine
window.switchTool = function(toolId) {
    if (!toolId) return;

    const panels = document.querySelectorAll('.tool-panel');
    panels.forEach(p => {
        p.classList.add('hidden');
        p.style.display = 'none';
    });

    const targetPanel = document.getElementById('panel-' + toolId);
    if (targetPanel) {
        targetPanel.classList.remove('hidden');
        targetPanel.style.display = 'block';
    }

    const activeClass = "tool-tab-btn px-4 py-3 bg-gradient-to-r from-teal-600 to-indigo-600 text-white border-transparent rounded-2xl text-[11px] font-black uppercase transition-all flex items-center justify-center gap-2 shadow-lg shadow-teal-500/20 cursor-pointer select-none";
    const inactiveClass = "tool-tab-btn px-4 py-3 bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 rounded-2xl text-[11px] font-black uppercase text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 hover:border-teal-500/50 transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer select-none";

    const buttons = document.querySelectorAll('.tool-tab-btn');
    buttons.forEach(b => {
        b.className = inactiveClass;
    });

    const targetBtn = document.getElementById('btn-tab-' + toolId);
    if (targetBtn) {
        targetBtn.className = activeClass;
    }
};

document.addEventListener('DOMContentLoaded', () => {
    initTheme();

    document.querySelectorAll('.tool-tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const btnId = btn.id || '';
            const toolId = btnId.replace('btn-tab-', '');
            if (toolId) {
                window.switchTool(toolId);
            }
        });
    });

    // Ensure YouTube tab is visible on start
    window.switchTool('youtube');

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
        statusBox.style.display = 'block';
        statusBox.innerHTML = '<div class="p-3 bg-teal-500/10 text-yeib-teal rounded-xl font-bold text-xs">⚡ Procesando transcripción mediante proxy SOCKS5...</div>';
        resultBox.classList.add('hidden');
        resultBox.style.display = 'none';

        try {
            const resp = await fetch('api/transcript.php?url=' + encodeURIComponent(input));
            const data = await resp.json();

            if (data.success) {
                statusBox.classList.add('hidden');
                statusBox.style.display = 'none';
                resultBox.classList.remove('hidden');
                resultBox.style.display = 'block';
                
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


    // --- 2. LECTOR Y EDITOR AVANZADO DE METADATOS FORENSES (100% CLIENT-SIDE) ---
    let currentLoadedFile = null;
    let currentLoadedArrayBuffer = null;

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
        currentLoadedFile = file;

        const resultBox = document.getElementById('metadata-result');
        const output = document.getElementById('metadata-output');
        const fileNameTag = document.getElementById('metadata-filename');
        const editorBox = document.getElementById('metadata-editor-box');

        resultBox.classList.remove('hidden');
        resultBox.style.display = 'block';
        fileNameTag.innerText = `📄 ${file.name} (${(file.size / 1024).toFixed(1)} KB)`;
        output.innerText = 'Analizando metadatos localmente en tu navegador...';

        const reader = new FileReader();

        if (file.type === 'application/pdf') {
            reader.onload = function(e) {
                currentLoadedArrayBuffer = e.target.result;

                // Lectura rápida de cabeceras
                const textReader = new FileReader();
                textReader.onload = function(evt) {
                    const metadata = extractPdfMetadata(evt.target.result, file);
                    output.innerText = formatMetadataJson(metadata);

                    // Precargar los 6 campos detectados en la interfaz del editor
                    if (metadata["Metadatos Internos PDF"]) {
                        const pdfMeta = metadata["Metadatos Internos PDF"];
                        document.getElementById('meta-input-author').value = pdfMeta["Autor"] || '';
                        document.getElementById('meta-input-title').value = pdfMeta["Título"] || '';
                        document.getElementById('meta-input-subject').value = pdfMeta["Asunto"] || '';
                        document.getElementById('meta-input-creator').value = pdfMeta["Creador / Software"] || '';
                        document.getElementById('meta-input-producer').value = pdfMeta["Productor PDF"] || '';
                    }

                    if (editorBox) {
                        editorBox.classList.remove('hidden');
                        editorBox.style.display = 'block';
                    }
                };
                textReader.readAsText(file.slice(0, 100000));
            };
            reader.readAsArrayBuffer(file);
        } else if (file.type.startsWith('image/')) {
            reader.onload = function(e) {
                currentLoadedArrayBuffer = e.target.result;
                const metadata = extractImageMetadata(currentLoadedArrayBuffer, file);
                output.innerText = formatMetadataJson(metadata);

                if (editorBox) {
                    editorBox.classList.add('hidden');
                    editorBox.style.display = 'none';
                }
            };
            reader.readAsArrayBuffer(file);
        } else {
            output.innerText = `Tipo de archivo: ${file.type || 'Desconocido'}\nTamaño: ${file.size} bytes\nÚltima modificación: ${new Date(file.lastModified).toLocaleString()}`;
            if (editorBox) {
                editorBox.classList.add('hidden');
                editorBox.style.display = 'none';
            }
        }
    }

    window.sanitizePdfMetadata = async function() {
        if (!currentLoadedArrayBuffer || !currentLoadedFile) {
            alert('Por favor selecciona un archivo PDF primero.');
            return;
        }

        try {
            const { PDFDocument } = window.PDFLib;
            const pdfDoc = await PDFDocument.load(currentLoadedArrayBuffer);

            // Limpieza y blanqueado completo de datos sensibles y fechas
            pdfDoc.setTitle('');
            pdfDoc.setAuthor('');
            pdfDoc.setSubject('');
            pdfDoc.setKeywords([]);
            pdfDoc.setProducer('Yeib Tools Sanitizer');
            pdfDoc.setCreator('Yeib Tools (Client-Side Safe)');
            pdfDoc.setCreationDate(new Date());
            pdfDoc.setModificationDate(new Date());

            const pdfBytes = await pdfDoc.save();
            downloadBlob(pdfBytes, 'documento_sanitizado_yeib.pdf', 'application/pdf');

            alert('🧹 ¡Metadatos y fechas eliminadas con éxito! Se ha descargado tu PDF 100% sanitizado.');
        } catch (e) {
            alert('Error al sanitizar metadatos del PDF.');
        }
    };

    window.savePdfMetadata = async function() {
        if (!currentLoadedArrayBuffer || !currentLoadedFile) {
            alert('Por favor selecciona un archivo PDF primero.');
            return;
        }

        const author = document.getElementById('meta-input-author').value.trim();
        const title = document.getElementById('meta-input-title').value.trim();
        const subject = document.getElementById('meta-input-subject').value.trim();
        const creator = document.getElementById('meta-input-creator').value.trim();
        const producer = document.getElementById('meta-input-producer').value.trim();
        const customDate = document.getElementById('meta-input-date').value;

        try {
            const { PDFDocument } = window.PDFLib;
            const pdfDoc = await PDFDocument.load(currentLoadedArrayBuffer);

            pdfDoc.setAuthor(author);
            pdfDoc.setTitle(title);
            pdfDoc.setSubject(subject);
            pdfDoc.setCreator(creator);
            if (producer) pdfDoc.setProducer(producer);

            // Edición de Fecha de Creación y Modificación
            if (customDate) {
                const dateObj = new Date(customDate);
                pdfDoc.setCreationDate(dateObj);
                pdfDoc.setModificationDate(dateObj);
            } else {
                pdfDoc.setModificationDate(new Date());
            }

            const pdfBytes = await pdfDoc.save();
            downloadBlob(pdfBytes, 'pdf_editado_yeib.pdf', 'application/pdf');

            alert('💾 ¡Metadatos y fechas actualizados con éxito! Se ha descargado tu nuevo PDF.');
        } catch (e) {
            alert('Error al guardar metadatos en el PDF.');
        }
    };

    function downloadBlob(bytes, filename, mimeType) {
        const blob = new Blob([bytes], { type: mimeType });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = filename;
        a.click();
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
        const subject = text.match(/\/Subject\s*\((.*?)\)/);
        const creator = text.match(/\/Creator\s*\((.*?)\)/);
        const producer = text.match(/\/Producer\s*\((.*?)\)/);
        const creationDate = text.match(/\/CreationDate\s*\((.*?)\)/);
        const modDate = text.match(/\/ModDate\s*\((.*?)\)/);
        const version = text.match(/%PDF-1\.\d/);

        if (version) meta["Metadatos Internos PDF"]["Versión PDF"] = version[0];
        if (title) meta["Metadatos Internos PDF"]["Título"] = title[1];
        if (author) meta["Metadatos Internos PDF"]["Autor"] = author[1];
        if (subject) meta["Metadatos Internos PDF"]["Asunto"] = subject[1];
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


    // --- 3. GENERADOR DE CÓDIGO QR HD PERSONALIZADO CON LOGO YEIB ---
    window.generateQrCode = function() {
        const textInput = document.getElementById('qr-text-input');
        const text = textInput ? textInput.value.trim() : '';
        const container = document.getElementById('qr-output-container');

        if (!text) {
            alert('Por favor ingresa un texto o URL para generar tu código QR.');
            return;
        }

        const colorStyle = document.getElementById('qr-color-select') ? document.getElementById('qr-color-select').value : 'teal';
        const bgStyle = document.getElementById('qr-bg-select') ? document.getElementById('qr-bg-select').value : 'light';
        const includeYeibLogo = document.getElementById('qr-logo-check') ? document.getElementById('qr-logo-check').checked : true;

        container.innerHTML = '<div class="p-4 text-xs font-bold text-teal-500 animate-pulse">⚡ Renderizando QR HD con marca Yeib...</div>';

        // 1. Generar matriz de datos QR con Error Correction High (Level 3 - H 30%)
        const qrModel = new QRCode(-1, 3); // Error Correction H = 3
        qrModel.addData(text);
        qrModel.make();

        const count = qrModel.getModuleCount();
        const canvasSize = 800; // Alta Definición HD
        const margin = 40;
        const cellSize = (canvasSize - margin * 2) / count;

        const canvas = document.createElement('canvas');
        canvas.width = canvasSize;
        canvas.height = canvasSize;
        canvas.className = "w-64 h-64 sm:w-72 sm:h-72 rounded-3xl border-2 border-slate-200 dark:border-slate-700 shadow-2xl transition-all hover:scale-105";
        const ctx = canvas.getContext('2d');

        // 2. Pintar Fondo
        if (bgStyle === 'light') {
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, canvasSize, canvasSize);
        } else if (bgStyle === 'dark') {
            ctx.fillStyle = '#0f172a';
            ctx.fillRect(0, 0, canvasSize, canvasSize);
        } else {
            ctx.clearRect(0, 0, canvasSize, canvasSize); // Transparente
        }

        // 3. Crear Gradiente / Color de Módulos (Dots)
        let moduleFill;
        if (colorStyle === 'teal') {
            const grad = ctx.createLinearGradient(0, 0, canvasSize, canvasSize);
            grad.addColorStop(0, '#0d9488'); // Yeib Teal
            grad.addColorStop(1, '#6366f1'); // Yeib Indigo
            moduleFill = grad;
        } else if (colorStyle === 'indigo') {
            moduleFill = '#4f46e5';
        } else if (colorStyle === 'rose') {
            moduleFill = '#e11d48';
        } else if (colorStyle === 'emerald') {
            moduleFill = '#059669';
        } else {
            moduleFill = bgStyle === 'dark' ? '#f8fafc' : '#090d16'; // Negro / Blanco sólido
        }

        // 4. Dibujar Módulos del QR con bordes redondeados
        ctx.fillStyle = moduleFill;
        for (let row = 0; row < count; row++) {
            for (let col = 0; col < count; col++) {
                if (qrModel.isDark(row, col)) {
                    const x = margin + col * cellSize;
                    const y = margin + row * cellSize;
                    
                    ctx.beginPath();
                    ctx.roundRect(x, y, cellSize + 0.5, cellSize + 0.5, cellSize * 0.25);
                    ctx.fill();
                }
            }
        }

        // 5. Incrustar Logo Oficial Yeib en el centro (si está activado)
        if (includeYeibLogo) {
            const center = canvasSize / 2;
            const logoRadius = canvasSize * 0.13; // 13% del QR

            // 5a. Fondo circular blanco u oscuro de protección para la marca
            ctx.beginPath();
            ctx.arc(center, center, logoRadius + 12, 0, Math.PI * 2);
            ctx.fillStyle = bgStyle === 'dark' ? '#0f172a' : '#ffffff';
            ctx.fill();
            ctx.lineWidth = 4;
            ctx.strokeStyle = '#0d9488';
            ctx.stroke();

            // 5b. Dibujar Isotipo Oficial de Yeib
            const iconSize = logoRadius * 1.35;
            const iconX = center - iconSize / 2;
            const iconY = center - iconSize / 2;

            const svgData = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none"><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#0d9488"/><stop offset="100%" stop-color="#6366f1"/></linearGradient><path d="M4 24C9 24 11 12 16 12C21 12 23 6 28 6" stroke="url(#g)" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/><circle cx="16" cy="12" r="3" fill="#0d9488" stroke="#ffffff" stroke-width="2"/><circle cx="28" cy="6" r="3" fill="#6366f1" stroke="#ffffff" stroke-width="2"/><path d="M4 24H28" stroke="#0d9488" stroke-width="2" stroke-linecap="round"/></svg>`;

            const img = new Image();
            img.onload = function() {
                ctx.drawImage(img, iconX, iconY, iconSize, iconSize);
                finishQrRender(canvas);
            };
            img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgData);
        } else {
            finishQrRender(canvas);
        }

        function finishQrRender(canvasEl) {
            container.innerHTML = '';
            
            const dataUrl = canvasEl.toDataURL('image/png');

            const previewImg = document.createElement('img');
            previewImg.src = dataUrl;
            previewImg.className = "w-64 h-64 sm:w-72 sm:h-72 rounded-3xl border-2 border-teal-500/30 shadow-2xl transition-all hover:scale-105";

            const downloadBtn = document.createElement('a');
            downloadBtn.href = dataUrl;
            downloadBtn.download = 'qr_yeibtools_hd.png';
            downloadBtn.className = "px-6 py-3.5 bg-gradient-to-r from-teal-600 to-indigo-600 hover:from-teal-500 hover:to-indigo-500 text-white font-black text-xs uppercase rounded-2xl transition-all shadow-lg shadow-teal-600/20 active:scale-95 inline-flex items-center gap-2 mt-4 cursor-pointer";
            downloadBtn.innerHTML = '📥 Descargar QR HD (PNG)';

            container.appendChild(previewImg);
            container.appendChild(document.createElement('br'));
            container.appendChild(downloadBtn);
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
        resultBox.style.display = 'block';

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
