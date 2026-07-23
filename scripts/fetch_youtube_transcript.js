const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const videoId = process.argv[2];

if (!videoId || !/^[a-zA-Z0-9_-]{11}$/.test(videoId)) {
    console.log(JSON.stringify({ success: false, error: 'ID de video de YouTube no válida.' }));
    process.exit(0);
}

function secondsToTimestamp(sec) {
    const hours = Math.floor(sec / 3600);
    const minutes = Math.floor((sec % 3600) / 60);
    const seconds = Math.floor(sec % 60);
    const pad = (n) => String(n).padStart(2, '0');

    if (hours > 0) {
        return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    }
    return `${pad(minutes)}:${pad(seconds)}`;
}

function parseVtt(vttContent) {
    const lines = vttContent.split(/\r?\n/);
    const result = [];
    let currentTimestamp = '00:00';
    let currentSec = 0;
    let lastText = '';

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        const timeMatch = line.match(/^(\d{2}:)?(\d{2}):(\d{2})[\.,](\d{3})\s*-->/);
        
        if (timeMatch) {
            const h = timeMatch[1] ? parseInt(timeMatch[1].replace(':', ''), 10) : 0;
            const m = parseInt(timeMatch[2], 10);
            const s = parseInt(timeMatch[3], 10);
            currentSec = h * 3600 + m * 60 + s;
            currentTimestamp = secondsToTimestamp(currentSec);
        } else if (line && !line.startsWith('WEBVTT') && !line.startsWith('Kind:') && !line.startsWith('Language:') && !line.startsWith('NOTE') && !line.startsWith('STYLE')) {
            const cleanText = line
                .replace(/<[^>]+>/g, '')
                .replace(/&amp;/g, '&')
                .replace(/&lt;/g, '<')
                .replace(/&gt;/g, '>')
                .replace(/&quot;/g, '"')
                .replace(/&#39;/g, "'")
                .trim();

            if (cleanText && cleanText !== lastText) {
                lastText = cleanText;
                result.push({
                    offset: currentSec,
                    timestamp: currentTimestamp,
                    text: cleanText
                });
            }
        }
    }
    return result;
}

function run() {
    const tempDir = path.join(__dirname, 'temp_subs');
    if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir, { recursive: true });
    }

    const outPattern = path.join(tempDir, `${videoId}`);

    try {
        // Ejecución con yt-dlp usando --sub-langs y proxy SOCKS5
        const ytDlpCmd = `yt-dlp --proxy "socks5://127.0.0.1:40000" --write-auto-sub --write-sub --sub-langs "es.*,es,es-419,es-orig,en.*,en" --sub-format "vtt" --ignore-errors --skip-download -o "${outPattern}" "https://www.youtube.com/watch?v=${videoId}"`;
        
        try {
            execSync(ytDlpCmd, { stdio: 'pipe', timeout: 25000 });
        } catch (e) {
            // Continuar para revisar si algún VTT se descargó
        }

        const files = fs.readdirSync(tempDir).filter(f => f.startsWith(videoId) && f.endsWith('.vtt'));

        if (files.length > 0) {
            let subFile = files.find(f => f.includes('.es') || f.includes('.es-') || f.includes('.es-orig.')) || files[0];
            const fullPath = path.join(tempDir, subFile);
            const vttContent = fs.readFileSync(fullPath, 'utf8');

            // Limpieza inmediata de archivos temporales VTT
            files.forEach(f => {
                try { fs.unlinkSync(path.join(tempDir, f)); } catch (e) {}
            });

            const parsedLines = parseVtt(vttContent);
            if (parsedLines.length > 0) {
                const rawText = parsedLines.map(l => `[${l.timestamp}] ${l.text}`).join('\n');
                const plainText = parsedLines.map(l => l.text).join(' ');
                console.log(JSON.stringify({
                    success: true,
                    video_id: videoId,
                    total_lines: parsedLines.length,
                    lines: parsedLines,
                    raw_text: rawText,
                    plain_text: plainText
                }));
                return;
            }
        }
    } catch (e) {
        // Ignorar
    }

    console.log(JSON.stringify({
        success: false,
        error: 'No se encontraron subtítulos o transcripción en español/inglés para este video. Verifica que el video posea subtítulos o transcripción automática activada en YouTube.'
    }));
}

run();
