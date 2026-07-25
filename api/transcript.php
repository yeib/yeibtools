<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: https://tools.yeib.cl');
header('Access-Control-Allow-Methods: GET, POST');
header('Vary: Origin');

// --- RATE LIMITING ULTRA LIVIANO EN PHP PURO ---
$userIp = $_SERVER['HTTP_CF_CONNECTING_IP'] ?? $_SERVER['HTTP_X_FORWARDED_FOR'] ?? $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1';
$ipHash = md5($userIp);
$rateFile = sys_get_temp_dir() . '/yeibtools_rate_' . $ipHash . '.json';

$maxRequests = 15; // 15 peticiones
$windowSeconds = 300; // cada 5 minutos

$now = time();
$requests = [];

// Lock exclusivo ANTES de leer para evitar race condition bajo carga concurrente
$lockFile = sys_get_temp_dir() . '/yeibtools_lock_' . $ipHash . '.lock';
$lock = fopen($lockFile, 'c');
if ($lock && flock($lock, LOCK_EX)) {
    if (file_exists($rateFile)) {
        $raw = @file_get_contents($rateFile);
        $data = @json_decode($raw, true);
        if (is_array($data)) {
            // Filtrar peticiones dentro de la ventana de tiempo
            foreach ($data as $timestamp) {
                if ($now - $timestamp < $windowSeconds) {
                    $requests[] = $timestamp;
                }
            }
        }
    }

    if (count($requests) >= $maxRequests) {
        flock($lock, LOCK_UN);
        fclose($lock);
        http_response_code(429);
        echo json_encode([
            'success' => false,
            'error' => '🛑 Límite de peticiones alcanzado para tu dirección IP (Rate Limiting). Has superado el máximo de ' . $maxRequests . ' transcripciones cada 5 minutos para cuidar la VPS. Intenta nuevamente en un momento.'
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }

    // Registrar nueva petición dentro del mismo lock
    $requests[] = $now;
    file_put_contents($rateFile, json_encode($requests), LOCK_EX);

    flock($lock, LOCK_UN);
    fclose($lock);
}

// --- PROCESAMIENTO DE YOUTUBE URL / ID ---
$input = $_REQUEST['url'] ?? $_REQUEST['v'] ?? '';
$input = trim($input);

if (empty($input)) {
    echo json_encode([
        'success' => false,
        'error' => 'Por favor ingresa una URL de YouTube o ID de video válida.'
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

// Extraer ID de 11 caracteres usando Regex
$videoId = '';
if (preg_match('/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/', $input, $matches)) {
    $videoId = $matches[1];
} elseif (preg_match('/^[a-zA-Z0-9_-]{11}$/', $input)) {
    $videoId = $input;
}

if (empty($videoId)) {
    echo json_encode([
        'success' => false,
        'error' => 'No se pudo identificar una ID de video válida de YouTube (debe contener 11 caracteres).'
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

// --- EJECUCIÓN DEL SCRIPT DE TRANSCRIPCIÓN CON NODE.JS & PROXY SOCKS5 ---
$scriptPath = __DIR__ . '/../scripts/fetch_youtube_transcript.js';
$escapedVideoId = escapeshellarg($videoId);

$command = "node " . escapeshellarg($scriptPath) . " " . $escapedVideoId;
$output = '';

// proc_open con timeout real para evitar que PHP quede colgado
$descriptors = [
    0 => ['pipe', 'r'],  // stdin
    1 => ['pipe', 'w'],  // stdout
    2 => ['pipe', 'w'],  // stderr (separado, no expuesto)
];
$proc = proc_open($command, $descriptors, $pipes);

if (is_resource($proc)) {
    fclose($pipes[0]);
    stream_set_timeout($pipes[1], 32); // 32s hard timeout en lectura
    $output = stream_get_contents($pipes[1]);
    fclose($pipes[1]);
    fclose($pipes[2]); // descartamos stderr
    proc_close($proc);
}

if (!$output) {
    echo json_encode([
        'success' => false,
        'error' => 'Error al ejecutar el servicio de transcripción.'
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

$response = json_decode($output, true);

if (json_last_error() === JSON_ERROR_NONE && is_array($response)) {
    echo json_encode($response, JSON_UNESCAPED_UNICODE);
} else {
    echo json_encode([
        'success' => false,
        'error' => 'Respuesta inesperada del motor de transcripción. Por favor intenta nuevamente.'
    ], JSON_UNESCAPED_UNICODE);
}
