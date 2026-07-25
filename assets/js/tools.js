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

    const activeClass = "tool-tab-btn px-4 py-3 bg-gradient-to-r from-teal-600 to-indigo-600 text-white border-transparent rounded-2xl text-[11px] font-black uppercase transition-all flex items-center justify-center gap-2 shadow-lg shadow-teal-500/20 cursor-pointer select-none whitespace-nowrap shrink-0";
    const inactiveClass = "tool-tab-btn px-4 py-3 bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 rounded-2xl text-[11px] font-black uppercase text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 hover:border-teal-500/50 transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer select-none whitespace-nowrap shrink-0";

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

    // --- 1. YOUTUBE TRANSCRIPT AVANZADO ---
    let currentRawTranscript = '';
    let currentVideoId = '';
    let currentFormatMode = 'full';

    window.fetchTranscript = async function() {
        const input = document.getElementById('yt-input').value.trim();
        const statusBox = document.getElementById('yt-status');
        const resultBox = document.getElementById('yt-result');

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
                
                currentRawTranscript = data.raw_text;
                currentVideoId = data.video_id;

                document.getElementById('yt-meta-info').innerText = `Líneas: ${data.total_lines} | Video ID: ${data.video_id}`;
                toggleYtFormat('full');
            } else {
                statusBox.innerHTML = `<div class="p-3 bg-rose-500/10 text-rose-500 rounded-xl font-bold text-xs">✕ Error: ${data.error}</div>`;
            }
        } catch (err) {
            statusBox.innerHTML = `<div class="p-3 bg-rose-500/10 text-rose-500 rounded-xl font-bold text-xs">✕ Error al conectar con la API de transcripción.</div>`;
        }
    };

    window.toggleYtFormat = function(mode) {
        currentFormatMode = mode;
        const textContainer = document.getElementById('yt-raw-text');
        if (!currentRawTranscript) return;

        let formattedText = currentRawTranscript;

        if (mode === 'plain') {
            formattedText = currentRawTranscript.replace(/\[\d{2}:\d{2}(?::\d{2})?\]\s*/g, '');
        } else if (mode === 'paragraphs') {
            const lines = currentRawTranscript.replace(/\[\d{2}:\d{2}(?::\d{2})?\]\s*/g, '').split('\n');
            let paragraphs = [];
            let currentP = [];

            lines.forEach((line, index) => {
                const trimmed = line.trim();
                if (trimmed) {
                    currentP.push(trimmed);
                    if (currentP.length >= 4 || index === lines.length - 1) {
                        paragraphs.push(currentP.join(' '));
                        currentP = [];
                    }
                }
            });
            formattedText = paragraphs.join('\n\n');
        }

        textContainer.innerText = formattedText;
        updateFormatButtonStyles(mode);
        filterYtText();
    };

    function updateFormatButtonStyles(mode) {
        const btnFull = document.getElementById('yt-fmt-full');
        const btnPlain = document.getElementById('yt-fmt-plain');
        const btnPar = document.getElementById('yt-fmt-paragraphs');

        const activeCls = "px-3 py-2 bg-yeib-teal text-white text-[10px] font-black uppercase rounded-xl transition-all cursor-pointer shadow-sm";
        const inactiveCls = "px-3 py-2 bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-white text-[10px] font-black uppercase rounded-xl transition-all cursor-pointer hover:bg-slate-300 dark:hover:bg-slate-600";

        if (btnFull) btnFull.className = mode === 'full' ? activeCls : inactiveCls;
        if (btnPlain) btnPlain.className = mode === 'plain' ? activeCls : inactiveCls;
        if (btnPar) btnPar.className = mode === 'paragraphs' ? activeCls : inactiveCls;
    }

    window.copyYtPrompt = function() {
        if (!currentRawTranscript) return;
        const plainText = currentRawTranscript.replace(/\[\d{2}:\d{2}(?::\d{2})?\]\s*/g, '');
        const prompt = `Analiza la siguiente transcripción de video de YouTube y genera un resumen ejecutivo claro con los 5 puntos clave principales:\n\n${plainText}`;
        
        navigator.clipboard.writeText(prompt);
        alert('🤖 ¡Prompt con la transcripción copiado al portapapeles! Ya puedes pegarlo directamente en tu IA.');
    };

    window.filterYtText = function() {
        const query = document.getElementById('yt-search-input').value.toLowerCase().trim();
        const textContainer = document.getElementById('yt-raw-text');

        if (!currentRawTranscript) return;

        let baseText = currentRawTranscript;
        if (currentFormatMode === 'plain') {
            baseText = currentRawTranscript.replace(/\[\d{2}:\d{2}(?::\d{2})?\]\s*/g, '');
        } else if (currentFormatMode === 'paragraphs') {
            const lines = currentRawTranscript.replace(/\[\d{2}:\d{2}(?::\d{2})?\]\s*/g, '').split('\n');
            let paragraphs = [];
            let currentP = [];
            lines.forEach((line, index) => {
                const trimmed = line.trim();
                if (trimmed) {
                    currentP.push(trimmed);
                    if (currentP.length >= 4 || index === lines.length - 1) {
                        paragraphs.push(currentP.join(' '));
                        currentP = [];
                    }
                }
            });
            baseText = paragraphs.join('\n\n');
        }

        if (!query) {
            textContainer.innerText = baseText;
            return;
        }

        const lines = baseText.split('\n');
        const highlighted = lines.map(line => {
            if (line.toLowerCase().includes(query)) {
                return `👉 ${line}`;
            }
            return line;
        }).join('\n');

        textContainer.innerText = highlighted;
    };

    window.downloadYtText = function(format) {
        if (!currentRawTranscript) return;

        let content = '';
        let filename = '';
        let mime = 'text/plain;charset=utf-8';

        if (format === 'md') {
            const plainText = currentRawTranscript.replace(/\[\d{2}:\d{2}(?::\d{2})?\]\s*/g, '');
            content = `# Transcripción de Video YouTube (${currentVideoId})\n\n> Generado libre de rastreo por [Yeib Tools](https://tools.yeib.cl/)\n\n## Texto Completo\n\n${plainText}`;
            filename = `transcripcion_${currentVideoId}.md`;
            mime = 'text/markdown;charset=utf-8';
        } else {
            content = currentRawTranscript;
            filename = `transcripcion_${currentVideoId}.txt`;
        }

        downloadBlob(new TextEncoder().encode(content), filename, mime);
    };


    // --- 2. LECTOR Y EDITOR AVANZADO DE METADATOS FORENSES ---
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

    function cleanPdfString(str) {
        if (!str) return '';
        let cleaned = str.replace(/\uFEFF/g, '');
        if (cleaned.includes('\0')) {
            cleaned = cleaned.replace(/\0/g, '');
        }
        cleaned = cleaned.replace(/^\((.*)\)$/, '$1');
        cleaned = cleaned.replace(/[\x00-\x1F\x7F-\x9F]/g, '');
        cleaned = cleaned.replace(/\uFFFD/g, '');
        return cleaned.trim();
    }

    async function processLocalFile(file) {
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
            reader.onload = async function(e) {
                currentLoadedArrayBuffer = e.target.result;
                let title = '', author = '', subject = '', creator = '', producer = '', creationDate = '', modDate = '';

                try {
                    const { PDFDocument } = window.PDFLib;
                    const pdfDoc = await PDFDocument.load(currentLoadedArrayBuffer, { ignoreEncryption: true });
                    
                    title = cleanPdfString(pdfDoc.getTitle() || '');
                    author = cleanPdfString(pdfDoc.getAuthor() || '');
                    subject = cleanPdfString(pdfDoc.getSubject() || '');
                    creator = cleanPdfString(pdfDoc.getCreator() || '');
                    producer = cleanPdfString(pdfDoc.getProducer() || '');

                    const cDate = pdfDoc.getCreationDate();
                    if (cDate) creationDate = cDate.toISOString();
                    const mDate = pdfDoc.getModificationDate();
                    if (mDate) modDate = mDate.toISOString();
                } catch (err) {}

                const textReader = new FileReader();
                textReader.onload = function(evt) {
                    const rawText = evt.target.result;
                    const metaRegex = extractPdfMetadata(rawText, file);

                    if (metaRegex["Metadatos Internos PDF"]) {
                        const pdfMeta = metaRegex["Metadatos Internos PDF"];
                        if (!title) title = cleanPdfString(pdfMeta["Título"]);
                        if (!author) author = cleanPdfString(pdfMeta["Autor"]);
                        if (!subject) subject = cleanPdfString(pdfMeta["Asunto"]);
                        if (!creator) creator = cleanPdfString(pdfMeta["Creador / Software"]);
                        if (!producer) producer = cleanPdfString(pdfMeta["Productor PDF"]);
                        if (!creationDate) creationDate = cleanPdfString(pdfMeta["Fecha Creación PDF"]);
                        if (!modDate) modDate = cleanPdfString(pdfMeta["Fecha Modificación PDF"]);
                    }

                    const finalMeta = {
                        "Archivo": file.name,
                        "Tamaño": `${(file.size / 1024).toFixed(2)} KB`,
                        "Tipo MIME": file.type,
                        "Última Modificación Local": new Date(file.lastModified).toISOString(),
                        "Metadatos Internos PDF": {
                            "Título": title || "No especificado",
                            "Autor": author || "No especificado",
                            "Asunto": subject || "No especificado",
                            "Creador / Software": creator || "No especificado",
                            "Productor PDF": producer || "No especificado",
                            "Fecha Creación PDF": creationDate || "No especificada",
                            "Fecha Modificación PDF": modDate || "No especificada"
                        }
                    };

                    output.innerText = formatMetadataJson(finalMeta);

                    document.getElementById('meta-input-author').value = author;
                    document.getElementById('meta-input-title').value = title;
                    document.getElementById('meta-input-subject').value = subject;
                    document.getElementById('meta-input-creator').value = creator;
                    document.getElementById('meta-input-producer').value = producer;

                    if (editorBox) {
                        editorBox.classList.remove('hidden');
                        editorBox.style.display = 'block';
                    }
                };
                textReader.readAsText(file.slice(0, 150000));
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
        if (title) meta["Metadatos Internos PDF"]["Título"] = cleanPdfString(title[1]);
        if (author) meta["Metadatos Internos PDF"]["Autor"] = cleanPdfString(author[1]);
        if (subject) meta["Metadatos Internos PDF"]["Asunto"] = cleanPdfString(subject[1]);
        if (creator) meta["Metadatos Internos PDF"]["Creador / Software"] = cleanPdfString(creator[1]);
        if (producer) meta["Metadatos Internos PDF"]["Productor PDF"] = cleanPdfString(producer[1]);
        if (creationDate) meta["Metadatos Internos PDF"]["Fecha Creación PDF"] = cleanPdfString(creationDate[1]);
        if (modDate) meta["Metadatos Internos PDF"]["Fecha Modificación PDF"] = cleanPdfString(modDate[1]);

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


    // --- 3. GENERADOR DE CÓDIGO QR & CÓDIGO DE BARRAS (CODE 128) ---
    window.toggleCodeTypeOptions = function() {
        const codeType = document.getElementById('qr-type-select') ? document.getElementById('qr-type-select').value : 'qr';
        const logoBox = document.getElementById('qr-logo-option-box');
        const colorBox = document.getElementById('qr-color-option-box');

        if (codeType === 'barcode') {
            if (logoBox) logoBox.style.display = 'none';
            if (colorBox) colorBox.style.display = 'none';
        } else {
            if (logoBox) logoBox.style.display = 'flex';
            if (colorBox) colorBox.style.display = 'block';
        }
    };

    window.generateQrCode = function() {
        const codeType = document.getElementById('qr-type-select') ? document.getElementById('qr-type-select').value : 'qr';
        const textInput = document.getElementById('qr-text-input');
        const text = textInput ? textInput.value.trim() : '';
        const container = document.getElementById('qr-output-container');

        if (!text) {
            alert('Por favor ingresa un texto o código.');
            return;
        }

        if (codeType === 'barcode') {
            generateBarcodeCode128(text, container);
            return;
        }

        const colorStyle = document.getElementById('qr-color-select') ? document.getElementById('qr-color-select').value : 'teal';
        const bgStyle = document.getElementById('qr-bg-select') ? document.getElementById('qr-bg-select').value : 'light';
        const includeYeibLogo = document.getElementById('qr-logo-check') ? document.getElementById('qr-logo-check').checked : true;

        container.innerHTML = '<div class="p-4 text-xs font-bold text-teal-500 animate-pulse">⚡ Renderizando QR HD con marca Yeib...</div>';

        const qrModel = new QRCode(-1, 3);
        qrModel.addData(text);
        qrModel.make();

        const count = qrModel.getModuleCount();
        const canvasSize = 800;
        const margin = 40;
        const cellSize = (canvasSize - margin * 2) / count;

        const canvas = document.createElement('canvas');
        canvas.width = canvasSize;
        canvas.height = canvasSize;
        const ctx = canvas.getContext('2d');

        if (bgStyle === 'light') {
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, canvasSize, canvasSize);
        } else if (bgStyle === 'dark') {
            ctx.fillStyle = '#0f172a';
            ctx.fillRect(0, 0, canvasSize, canvasSize);
        } else {
            ctx.clearRect(0, 0, canvasSize, canvasSize);
        }

        let moduleFill;
        if (colorStyle === 'teal') {
            const grad = ctx.createLinearGradient(0, 0, canvasSize, canvasSize);
            grad.addColorStop(0, '#0d9488');
            grad.addColorStop(1, '#6366f1');
            moduleFill = grad;
        } else if (colorStyle === 'indigo') {
            moduleFill = '#4f46e5';
        } else if (colorStyle === 'rose') {
            moduleFill = '#e11d48';
        } else if (colorStyle === 'emerald') {
            moduleFill = '#059669';
        } else {
            moduleFill = bgStyle === 'dark' ? '#f8fafc' : '#090d16';
        }

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

        if (includeYeibLogo) {
            const center = canvasSize / 2;
            const logoRadius = canvasSize * 0.13;

            ctx.beginPath();
            ctx.arc(center, center, logoRadius + 12, 0, Math.PI * 2);
            ctx.fillStyle = bgStyle === 'dark' ? '#0f172a' : '#ffffff';
            ctx.fill();
            ctx.lineWidth = 4;
            ctx.strokeStyle = '#0d9488';
            ctx.stroke();

            const iconSize = logoRadius * 1.35;
            const iconX = center - iconSize / 2;
            const iconY = center - iconSize / 2;

            const svgData = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none"><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#0d9488"/><stop offset="100%" stop-color="#6366f1"/></linearGradient><path d="M4 24C9 24 11 12 16 12C21 12 23 6 28 6" stroke="url(#g)" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/><circle cx="16" cy="12" r="3" fill="#0d9488" stroke="#ffffff" stroke-width="2"/><circle cx="28" cy="6" r="3" fill="#6366f1" stroke="#ffffff" stroke-width="2"/><path d="M4 24H28" stroke="#0d9488" stroke-width="2" stroke-linecap="round"/></svg>`;

            const img = new Image();
            img.onload = function() {
                ctx.drawImage(img, iconX, iconY, iconSize, iconSize);
                finishQrRender(canvas, 'qr_yeibtools_hd.png');
            };
            img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgData);
        } else {
            finishQrRender(canvas, 'qr_yeibtools_hd.png');
        }

        function finishQrRender(canvasEl, filename) {
            container.innerHTML = '';
            const dataUrl = canvasEl.toDataURL('image/png');

            const previewImg = document.createElement('img');
            previewImg.src = dataUrl;
            previewImg.className = "w-64 h-64 sm:w-72 sm:h-72 rounded-3xl border-2 border-teal-500/30 shadow-2xl transition-all hover:scale-105";

            const downloadBtn = document.createElement('a');
            downloadBtn.href = dataUrl;
            downloadBtn.download = filename;
            downloadBtn.className = "px-6 py-3.5 bg-gradient-to-r from-teal-600 to-indigo-600 hover:from-teal-500 hover:to-indigo-500 text-white font-black text-xs uppercase rounded-2xl transition-all shadow-lg shadow-teal-600/20 active:scale-95 inline-flex items-center gap-2 mt-4 cursor-pointer";
            downloadBtn.innerHTML = '📥 Descargar Código HD (PNG)';

            container.appendChild(previewImg);
            container.appendChild(document.createElement('br'));
            container.appendChild(downloadBtn);
        }
    };

    // Motor de Código de Barras Code 128 B en Canvas
    function generateBarcodeCode128(text, container) {
        container.innerHTML = '<div class="p-4 text-xs font-bold text-teal-500 animate-pulse">⚡ Renderizando Código de Barras Code 128...</div>';

        const code128Patterns = [
            "212222", "222122", "222221", "121223", "121322", "131222", "122213", "122312", "132212", "221213",
            "221312", "231212", "112232", "122132", "122231", "113222", "123122", "123221", "223211", "221132",
            "221231", "213212", "223112", "312131", "311222", "321122", "321221", "312212", "322112", "322211",
            "212123", "212321", "232121", "111323", "131123", "131321", "112313", "132113", "132311", "211313",
            "231113", "231311", "112133", "112331", "132131", "113123", "113321", "133121", "313121", "211331",
            "231131", "213113", "213311", "213131", "311123", "311321", "331121", "312113", "312311", "332111",
            "314111", "221411", "431111", "111224", "111422", "121124", "121421", "141122", "141221", "112214",
            "112412", "122114", "122411", "142112", "142211", "241211", "221114", "413111", "241112", "134111",
            "111242", "121142", "121241", "114212", "124112", "124211", "411212", "421112", "421211", "212141",
            "214121", "412121", "111143", "111341", "131141", "114113", "114311", "411113", "411311", "113141",
            "114131", "311141", "411131", "211412", "211214", "211232", "2331112"
        ];

        let codeValues = [104]; // Start Code B (104)
        for (let i = 0; i < text.length; i++) {
            let charCode = text.charCodeAt(i);
            let val = charCode - 32;
            if (val < 0 || val > 95) val = 0; // Fallback
            codeValues.push(val);
        }

        // Checksum Code 128
        let checksum = codeValues[0];
        for (let i = 1; i < codeValues.length; i++) {
            checksum += i * codeValues[i];
        }
        codeValues.push(checksum % 103);
        codeValues.push(106); // Stop Code (106)

        // Dibujar en Canvas
        const bgStyle = document.getElementById('qr-bg-select') ? document.getElementById('qr-bg-select').value : 'light';
        const canvas = document.createElement('canvas');
        canvas.width = 800;
        canvas.height = 360;
        const ctx = canvas.getContext('2d');

        const isDarkBg = bgStyle === 'dark';
        ctx.fillStyle = isDarkBg ? '#0f172a' : '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const barColor = isDarkBg ? '#f8fafc' : '#090d16';

        // Ancho total de módulos
        let totalModules = 0;
        codeValues.forEach(val => {
            const pat = code128Patterns[val];
            for (let c of pat) totalModules += parseInt(c, 10);
        });

        const quietZone = 40;
        const moduleWidth = (canvas.width - quietZone * 2) / totalModules;
        let curX = quietZone;
        const barHeight = 220;

        codeValues.forEach(val => {
            const pat = code128Patterns[val];
            let drawBar = true;
            for (let c of pat) {
                const w = parseInt(c, 10) * moduleWidth;
                if (drawBar) {
                    ctx.fillStyle = barColor;
                    ctx.fillRect(curX, 30, w, barHeight);
                }
                curX += w;
                drawBar = !drawBar;
            }
        });

        // Texto del código abajo
        ctx.fillStyle = barColor;
        ctx.font = 'bold 28px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(text, canvas.width / 2, 310);

        container.innerHTML = '';
        const dataUrl = canvas.toDataURL('image/png');

        const previewImg = document.createElement('img');
        previewImg.src = dataUrl;
        previewImg.className = "w-full max-w-md rounded-3xl border-2 border-teal-500/30 shadow-2xl transition-all hover:scale-105";

        const downloadBtn = document.createElement('a');
        downloadBtn.href = dataUrl;
        downloadBtn.download = `barcode_${text}.png`;
        downloadBtn.className = "px-6 py-3.5 bg-gradient-to-r from-teal-600 to-indigo-600 hover:from-teal-500 hover:to-indigo-500 text-white font-black text-xs uppercase rounded-2xl transition-all shadow-lg shadow-teal-600/20 active:scale-95 inline-flex items-center gap-2 mt-4 cursor-pointer";
        downloadBtn.innerHTML = '📥 Descargar Código de Barras (PNG)';

        container.appendChild(previewImg);
        container.appendChild(document.createElement('br'));
        container.appendChild(downloadBtn);
    }


    // --- 4. GENERADOR DE ENLACES DIRECTOS (WHATSAPP, MAILTO, TEL/SMS) ---
    window.switchLinkSubTab = function(type) {
        const subWa = document.getElementById('link-sub-wa');
        const subMail = document.getElementById('link-sub-mail');
        const subTel = document.getElementById('link-sub-tel');

        const btnWa = document.getElementById('btn-link-tab-wa');
        const btnMail = document.getElementById('btn-link-tab-mail');
        const btnTel = document.getElementById('btn-link-tab-tel');

        const activeCls = "px-4 py-2 bg-yeib-teal text-white text-xs font-black uppercase rounded-xl transition-all shadow-md cursor-pointer";
        const inactiveCls = "px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-black uppercase rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-all cursor-pointer";

        if (subWa) subWa.style.display = type === 'wa' ? 'block' : 'none';
        if (subMail) subMail.style.display = type === 'mail' ? 'block' : 'none';
        if (subTel) subTel.style.display = type === 'tel' ? 'block' : 'none';

        if (btnWa) btnWa.className = type === 'wa' ? activeCls : inactiveCls;
        if (btnMail) btnMail.className = type === 'mail' ? activeCls : inactiveCls;
        if (btnTel) btnTel.className = type === 'tel' ? activeCls : inactiveCls;
    };

    window.generateWhatsappLink = function() {
        const phone = document.getElementById('wa-phone').value.replace(/[^0-9]/g, '');
        const message = document.getElementById('wa-message').value.trim();
        const resultBox = document.getElementById('wa-result');
        const linkInput = document.getElementById('wa-generated-link');

        if (!phone) {
            alert('Por favor ingresa un número de teléfono válido con código de país.');
            return;
        }

        let link = `https://wa.me/${phone}`;
        if (message) link += `?text=${encodeURIComponent(message)}`;

        linkInput.value = link;
        resultBox.classList.remove('hidden');
        resultBox.style.display = 'block';
        document.getElementById('wa-test-btn').href = link;
    };

    window.generateMailtoLink = function() {
        const email = document.getElementById('mail-to').value.trim();
        const subject = document.getElementById('mail-subject').value.trim();
        const body = document.getElementById('mail-body').value.trim();
        const resultBox = document.getElementById('mail-result');
        const linkInput = document.getElementById('mail-generated-link');

        if (!email) {
            alert('Por favor ingresa un correo de destino.');
            return;
        }

        let params = [];
        if (subject) params.push(`subject=${encodeURIComponent(subject)}`);
        if (body) params.push(`body=${encodeURIComponent(body)}`);

        let link = `mailto:${email}`;
        if (params.length > 0) link += `?${params.join('&')}`;

        linkInput.value = link;
        resultBox.classList.remove('hidden');
        resultBox.style.display = 'block';
        document.getElementById('mail-test-btn').href = link;
    };

    window.generateTelLink = function() {
        const phone = document.getElementById('tel-phone').value.trim();
        const mode = document.getElementById('tel-mode-select').value;
        const resultBox = document.getElementById('tel-result');
        const linkInput = document.getElementById('tel-generated-link');

        if (!phone) {
            alert('Por favor ingresa un número telefónico.');
            return;
        }

        let link = mode === 'sms' ? `sms:${phone}` : `tel:${phone}`;
        linkInput.value = link;
        resultBox.classList.remove('hidden');
        resultBox.style.display = 'block';
        document.getElementById('tel-test-btn').href = link;
    };

    window.copyDirectLink = function(inputId) {
        const link = document.getElementById(inputId).value;
        navigator.clipboard.writeText(link);
        alert('¡Enlace copiado al portapapeles!');
    };


    // --- 5. LIMPIADOR DE TEXTO AVANZADO (CON HISTORIAL UNDO Y MODO IA) ---
    const cleanerUndoStack = [];

    window.processText = function(action) {
        const input = document.getElementById('cleaner-input');
        if (!input) return;

        // Guardar estado actual en la pila de Undo antes de modificar
        cleanerUndoStack.push(input.value);
        if (cleanerUndoStack.length > 30) cleanerUndoStack.shift(); // Max 30 estados

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
            case 'pdf':
                // Arreglar saltos de línea partidos en PDFs conservando párrafos dobles
                text = text.replace(/([^\n])\r?\n([^\n])/g, '$1 $2').replace(/[ \t]+/g, ' ');
                break;
            case 'ai':
                // Sanitizar texto para IA: eliminar espacios dobles y normalizar saltos
                text = text.trim().replace(/[ \t]+/g, ' ').replace(/\n{3,}/g, '\n\n');
                break;
        }

        input.value = text;
        updateTextStats();
    };

    window.undoCleanerText = function() {
        const input = document.getElementById('cleaner-input');
        if (cleanerUndoStack.length > 0) {
            input.value = cleanerUndoStack.pop();
            updateTextStats();
        } else {
            alert('No hay más cambios para deshacer.');
        }
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


    // --- 6. DEV & CRYPTO SUITE ---
    window.switchCryptoSubTab = function(type) {
        ['cipher', 'hash', 'pass', 'base64'].forEach(t => {
            const el = document.getElementById(`crypto-sub-${t}`);
            const btn = document.getElementById(`btn-crypto-tab-${t}`);
            const activeCls = "px-4 py-2 bg-yeib-teal text-white text-xs font-black uppercase rounded-xl transition-all shadow-md cursor-pointer";
            const inactiveCls = "px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-black uppercase rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-all cursor-pointer";

            if (el) el.style.display = t === type ? 'block' : 'none';
            if (btn) btn.className = t === type ? activeCls : inactiveCls;
        });
    };

    // CIFRADOR AES CLIENT-SIDE (WebCrypto API)
    window.processAesCipher = async function(mode) {
        const text = document.getElementById('aes-text-input').value;
        const pass = document.getElementById('aes-key-input').value;
        const output = document.getElementById('aes-output');

        if (!text || !pass) {
            alert('Ingresa tanto el texto como la clave secreta.');
            return;
        }

        try {
            const enc = new TextEncoder();
            const dec = new TextDecoder();

            // Key derivation
            const keyMaterial = await window.crypto.subtle.importKey(
                "raw", enc.encode(pass), { name: "PBKDF2" }, false, ["deriveKey"]
            );
            const salt = enc.encode("YeibCryptoSalt2026");
            const key = await window.crypto.subtle.deriveKey(
                { name: "PBKDF2", salt: salt, iterations: 100000, hash: "SHA-256" },
                keyMaterial,
                { name: "AES-GCM", length: 256 },
                false,
                ["encrypt", "decrypt"]
            );

            if (mode === 'encrypt') {
                const iv = window.crypto.getRandomValues(new Uint8Array(12));
                const encrypted = await window.crypto.subtle.encrypt(
                    { name: "AES-GCM", iv: iv }, key, enc.encode(text)
                );

                const combined = new Uint8Array(iv.length + encrypted.byteLength);
                combined.set(iv, 0);
                combined.set(new Uint8Array(encrypted), iv.length);

                output.value = btoa(String.fromCharCode(...combined));
            } else {
                const combined = Uint8Array.from(atob(text), c => c.charCodeAt(0));
                const iv = combined.slice(0, 12);
                const data = combined.slice(12);

                const decrypted = await window.crypto.subtle.decrypt(
                    { name: "AES-GCM", iv: iv }, key, data
                );
                output.value = dec.decode(decrypted);
            }
        } catch (e) {
            alert('Error al procesar AES. Revisa si la clave o el texto cifrado es correcto.');
        }
    };

    // HASH GENERATOR (SHA-256, SHA-512, SHA-1 & MD5)
    window.generateCryptoHashes = async function() {
        const text = document.getElementById('hash-text-input').value;
        if (!text) return;

        const enc = new TextEncoder();
        const data = enc.encode(text);

        // SHA-256
        const sha256Buffer = await window.crypto.subtle.digest('SHA-256', data);
        document.getElementById('hash-sha256').value = bufferToHex(sha256Buffer);

        // SHA-512
        const sha512Buffer = await window.crypto.subtle.digest('SHA-512', data);
        document.getElementById('hash-sha512').value = bufferToHex(sha512Buffer);

        // SHA-1
        const sha1Buffer = await window.crypto.subtle.digest('SHA-1', data);
        document.getElementById('hash-sha1').value = bufferToHex(sha1Buffer);

        // MD5 Pure JS
        document.getElementById('hash-md5').value = calcMd5(text);
    };

    function bufferToHex(buffer) {
        return Array.from(new Uint8Array(buffer)).map(b => b.toString(16).padStart(2, '0')).join('');
    }

    // Pure JS MD5 implementation
    function calcMd5(string) {
        function md5cycle(x, k) {
            var a = x[0], b = x[1], c = x[2], d = x[3];
            a = ff(a, b, c, d, k[0], 7, -680876936); d = ff(d, a, b, c, k[1], 12, -389564586);
            c = ff(c, d, a, b, k[2], 17, 606105819); b = ff(b, c, d, a, k[3], 22, -1044525330);
            a = ff(a, b, c, d, k[4], 7, -176418897); d = ff(d, a, b, c, k[5], 12, 1200080426);
            c = ff(c, d, a, b, k[6], 17, -1473231341); b = ff(b, c, d, a, k[7], 22, -45705983);
            a = ff(a, b, c, d, k[8], 7, 1770035416); d = ff(d, a, b, c, k[9], 12, -1958414417);
            c = ff(c, d, a, b, k[10], 17, -42063); b = ff(b, c, d, a, k[11], 22, -1990404162);
            a = ff(a, b, c, d, k[12], 7, 1804603682); d = ff(d, a, b, c, k[13], 12, -40341101);
            c = ff(c, d, a, b, k[14], 17, -1502002290); b = ff(b, c, d, a, k[15], 22, 1236535329);
            a = gg(a, b, c, d, k[1], 5, -165796510); d = gg(d, a, b, c, k[6], 9, -1069501632);
            c = gg(c, d, a, b, k[11], 14, 643717713); b = gg(b, c, d, a, k[0], 20, -373897302);
            a = gg(a, b, c, d, k[5], 5, -701558691); d = gg(d, a, b, c, k[10], 9, 38016083);
            c = gg(c, d, a, b, k[15], 14, -660478335); b = gg(b, c, d, a, k[4], 20, -405537848);
            a = gg(a, b, c, d, k[9], 5, 568446438); d = gg(d, a, b, c, k[14], 9, -1019803690);
            c = gg(c, d, a, b, k[3], 14, -187363961); b = gg(b, c, d, a, k[8], 20, 1163531501);
            a = gg(a, b, c, d, k[13], 5, -1444681467); d = gg(d, a, b, c, k[2], 9, -51403784);
            c = gg(c, d, a, b, k[7], 14, 1735328473); b = gg(b, c, d, a, k[12], 20, -1926607734);
            a = hh(a, b, c, d, k[5], 4, -378558); d = hh(d, a, b, c, k[8], 11, -2022574463);
            c = hh(c, d, a, b, k[11], 16, 1839030562); b = hh(b, c, d, a, k[14], 23, -35309556);
            a = hh(a, b, c, d, k[1], 4, -1530992060); d = hh(d, a, b, c, k[4], 11, 1272893353);
            c = hh(c, d, a, b, k[7], 16, -1554976322); b = hh(b, c, d, a, k[10], 23, -1094730640);
            a = hh(a, b, c, d, k[13], 4, 681279174); d = hh(d, a, b, c, k[0], 11, -358537222);
            c = hh(c, d, a, b, k[3], 16, -722521979); b = hh(b, c, d, a, k[6], 23, 76029189);
            a = hh(a, b, c, d, k[9], 4, -640364409); d = hh(d, a, b, c, k[12], 11, -321184037);
            c = hh(c, d, a, b, k[15], 16, 1770035416); b = hh(b, c, d, a, k[2], 23, -358537222);
            a = ii(a, b, c, d, k[0], 6, -198630844); d = ii(d, a, b, c, k[7], 10, 1126891415);
            c = ii(c, d, a, b, k[14], 15, -1416354905); b = ii(b, c, d, a, k[5], 21, -57434055);
            a = ii(a, b, c, d, k[12], 6, 1700485571); d = ii(d, a, b, c, k[3], 10, -1894980106);
            c = ii(c, d, a, b, k[10], 15, -1051523); b = ii(b, c, d, a, k[1], 21, -2054922799);
            a = ii(a, b, c, d, k[8], 6, 1873313359); d = ii(d, a, b, c, k[15], 10, -30611744);
            c = ii(c, d, a, b, k[6], 15, -1560198380); b = ii(b, c, d, a, k[13], 21, 1309151649);
            a = ii(a, b, c, d, k[4], 6, -145523070); d = ii(d, a, b, c, k[11], 10, -1120210379);
            c = ii(c, d, a, b, k[2], 15, 718787259); b = ii(b, c, d, a, k[9], 21, -343485551);
            x[0] = add32(a, x[0]); x[1] = add32(b, x[1]); x[2] = add32(c, x[2]); x[3] = add32(d, x[3]);
        }
        function cmn(q, a, b, x, s, t) { return add32(rol(add32(add32(a, q), add32(x, t)), s), b); }
        function ff(a, b, c, d, x, s, t) { return cmn((b & c) | ((~b) & d), a, b, x, s, t); }
        function gg(a, b, c, d, x, s, t) { return cmn((b & d) | (c & (~d)), a, b, x, s, t); }
        function hh(a, b, c, d, x, s, t) { return cmn(b ^ c ^ d, a, b, x, s, t); }
        function ii(a, b, c, d, x, s, t) { return cmn(c ^ (b | (~d)), a, b, x, s, t); }
        function md51(s) {
            var n = s.length, state = [1732584193, -271733879, -1732584194, 271733878], i;
            for (i = 64; i <= s.length; i += 64) md5cycle(state, md5blk(s.substring(i - 64, i)));
            s = s.substring(i - 64);
            var tail = [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0], rot = s.length;
            for (i = 0; i < s.length; i++) tail[i >> 2] |= s.charCodeAt(i) << ((i % 4) << 3);
            tail[i >> 2] |= 0x80 << ((i % 4) << 3);
            if (i > 55) { md5cycle(state, tail); for (i = 0; i < 16; i++) tail[i] = 0; }
            tail[14] = rot * 8;
            md5cycle(state, tail);
            return state;
        }
        function md5blk(s) { var md5blks = [], i; for (i = 0; i < 64; i += 4) md5blks[i >> 2] = s.charCodeAt(i) + (s.charCodeAt(i + 1) << 8) + (s.charCodeAt(i + 2) << 16) + (s.charCodeAt(i + 3) << 24); return md5blks; }
        function rhex(n) { var hex_chr = '0123456789abcdef', s = ''; for (var j = 0; j < 4; j++) s += hex_chr.charAt((n >> (j * 8 + 4)) & 0x0F) + hex_chr.charAt((n >> (j * 8)) & 0x0F); return s; }
        function hex(x) { for (var i = 0; i < x.length; i++) x[i] = rhex(x[i]); return x.join(''); }
        function add32(a, b) { return (a + b) & 0xFFFFFFFF; }
        function rol(num, cnt) { return (num << cnt) | (num >>> (32 - cnt)); }

        return hex(md51(unescape(encodeURIComponent(string))));
    }

    // PASSWORD GENERATOR WITH ENTROPY
    window.generatePassword = function() {
        const len = parseInt(document.getElementById('pass-length').value, 10) || 16;
        const incUpper = document.getElementById('pass-opt-upper').checked;
        const incLower = document.getElementById('pass-opt-lower').checked;
        const incNum = document.getElementById('pass-opt-num').checked;
        const incSym = document.getElementById('pass-opt-sym').checked;

        let charset = '';
        if (incUpper) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (incLower) charset += 'abcdefghijklmnopqrstuvwxyz';
        if (incNum) charset += '0123456789';
        if (incSym) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';

        if (!charset) {
            alert('Selecciona al menos un tipo de carácter.');
            return;
        }

        let password = '';
        const randomValues = new Uint32Array(len);
        window.crypto.getRandomValues(randomValues);

        for (let i = 0; i < len; i++) {
            password += charset[randomValues[i] % charset.length];
        }

        document.getElementById('pass-output').value = password;

        // Entropía: H = L * log2(R)
        const poolSize = charset.length;
        const entropyBits = Math.round(len * Math.log2(poolSize));
        const badge = document.getElementById('pass-entropy-badge');

        if (badge) {
            let label = 'Débil';
            let cls = 'bg-rose-500/20 text-rose-500';
            if (entropyBits >= 60 && entropyBits < 90) {
                label = 'Buena';
                cls = 'bg-amber-500/20 text-amber-500';
            } else if (entropyBits >= 90) {
                label = 'Extrema 🛡️';
                cls = 'bg-emerald-500/20 text-emerald-500';
            }
            badge.className = `px-3 py-1 rounded-xl text-xs font-black uppercase ${cls}`;
            badge.innerText = `Entropía: ${entropyBits} bits (${label})`;
        }
    };

    // BASE64 & URL ENCODER
    window.processBase64Url = function(action) {
        const text = document.getElementById('base64-input').value;
        const output = document.getElementById('base64-output');

        try {
            if (action === 'b64encode') {
                const bytes = new TextEncoder().encode(text);
                let binString = '';
                bytes.forEach(b => binString += String.fromCharCode(b));
                output.value = btoa(binString);
            } else if (action === 'b64decode') {
                const binString = atob(text);
                const bytes = Uint8Array.from(binString, m => m.codePointAt(0));
                output.value = new TextDecoder().decode(bytes);
            } else if (action === 'urlencode') {
                output.value = encodeURIComponent(text);
            } else if (action === 'urldecode') {
                output.value = decodeURIComponent(text);
            }
        } catch (e) {
            alert('Error al codificar / decodificar el formato.');
        }
    };


    // --- 7. COMPARADOR FORENSE DE TEXTOS (DIFF CHECKER) ---
    window.compareDiffTexts = function() {
        const textA = document.getElementById('diff-text-a').value;
        const textB = document.getElementById('diff-text-b').value;
        const resultContainer = document.getElementById('diff-result-container');

        if (!textA && !textB) {
            alert('Por favor ingresa al menos un texto para comparar.');
            return;
        }

        const linesA = textA.split('\n');
        const linesB = textB.split('\n');

        // Simple Myers/LCS diff line-by-line
        const diff = computeLineDiff(linesA, linesB);

        let html = '';
        let addedCount = 0;
        let removedCount = 0;

        diff.forEach(item => {
            const escaped = escapeHtml(item.value);
            if (item.type === 'added') {
                addedCount++;
                html += `<div class="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded border-l-4 border-emerald-500 font-mono text-xs">+ ${escaped}</div>`;
            } else if (item.type === 'removed') {
                removedCount++;
                html += `<div class="bg-rose-500/20 text-rose-400 px-3 py-1 rounded border-l-4 border-rose-500 font-mono text-xs">- ${escaped}</div>`;
            } else {
                html += `<div class="text-slate-400 px-3 py-0.5 font-mono text-xs">  ${escaped}</div>`;
            }
        });

        document.getElementById('diff-stats').innerHTML = `
            <span class="text-emerald-500 font-bold">+ ${addedCount} agregadas</span> | 
            <span class="text-rose-500 font-bold">- ${removedCount} eliminadas</span>
        `;

        resultContainer.innerHTML = html;
        document.getElementById('diff-result-box').classList.remove('hidden');
        document.getElementById('diff-result-box').style.display = 'block';
    };

    function escapeHtml(str) {
        return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }

    function computeLineDiff(arrA, arrB) {
        const result = [];
        let i = 0, j = 0;

        while (i < arrA.length || j < arrB.length) {
            if (i < arrA.length && j < arrB.length && arrA[i] === arrB[j]) {
                result.push({ type: 'same', value: arrA[i] });
                i++;
                j++;
            } else if (j < arrB.length && (!arrA.includes(arrB[j], i) || (arrB.includes(arrA[i], j) && arrA.indexOf(arrB[j], i) > arrB.indexOf(arrA[i], j)))) {
                result.push({ type: 'added', value: arrB[j] });
                j++;
            } else if (i < arrA.length) {
                result.push({ type: 'removed', value: arrA[i] });
                i++;
            }
        }
        return result;
    }
});
