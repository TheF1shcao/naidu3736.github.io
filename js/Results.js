/**
 * Manejador de resultados finales del juego
 * Controla la visualización de resultados y las acciones del usuario
 */
document.addEventListener('DOMContentLoaded', () => {
    // Cargar datos del jugador desde localStorage
    const player = Player.loadFromLocalStorage();
    const backBtn = document.getElementById('back-btn');
    const shareBtn = document.getElementById('share-btn');
    
    // Si no hay datos de jugador, redirigir al registro
    if (!player) {
        window.location.href = "registration.html";
        return;
    }
    
    // Mostrar información del jugador en la interfaz
    document.getElementById('player-name').textContent = player.name;
    
    // Mostrar resultados de cada juego
    showGameResult('flies', player.results.flies);
    showGameResult('sequence', player.results.sequence);
    showGameResult('colors', player.results.colors);
    
    // Mostrar puntaje total
    document.getElementById('total-score').textContent = player.totalScore;
    
    // Generar y mostrar mensaje final según puntaje
    const finalMessage = generateFinalMessage(player.totalScore);
    document.getElementById('final-message').textContent = finalMessage;
    
    // Deshabilitar interacción por mouse (solo teclado)
    if (backBtn) backBtn.style.pointerEvents = 'none';
    if (shareBtn) shareBtn.style.pointerEvents = 'none';
    
    // Manejar eventos de teclado
    document.addEventListener('keydown', (e) => {
        switch(e.key) {
            case '1': // Volver (rojo)
                if (backBtn) {
                    backBtn.classList.add('pressed');
                }
                setTimeout(() => {
                    window.location.href = "registration.html";
                }, 200);
                break;
                
            case '4': // Compartir (azul)
                if (shareBtn) {
                    shareBtn.classList.add('pressed');
                    setTimeout(() => {
                        captureAndShareResults();
                    }, 200);
                }
                break;
        }
    });
    
    // Restaurar estilos de botones al soltar tecla
    document.addEventListener('keyup', (e) => {
        switch(e.key) {
            case '1':
                if (backBtn) backBtn.classList.remove('pressed');
                break;
            case '4':
                if (shareBtn) shareBtn.classList.remove('pressed');
                break;
        }
    });
});

/**
 * Muestra los resultados de un juego específico
 * @param {string} game - Nombre del juego ('flies', 'sequence', 'colors')
 * @param {object} data - Datos del resultado del juego
 */
function showGameResult(game, data) {
    const gameElement = document.getElementById(`${game}-result`);
    
    // Si no hay datos, ocultar esta sección
    if (!data) {
        gameElement.style.display = 'none';
        return;
    }
    
    // Mostrar puntaje
    document.getElementById(`${game}-score`).textContent = data.score || 0;
    
    // Mostrar si acertó o no (con emojis y estilos)
    const resultElement = document.getElementById(`${game}-correct`);
    if (data.correct !== undefined) {
        resultElement.textContent = data.correct ? '✅ Acertaste' : '❌ No acertaste';
        resultElement.className = data.correct ? 'correct success' : 'correct error';
    } else {
        resultElement.style.display = 'none';
    }
}

/**
 * Genera un mensaje final personalizado según el puntaje
 * @param {number} score - Puntaje total del jugador
 * @returns {string} Mensaje motivacional
 */
function generateFinalMessage(score) {
    if (score >= 25) {
        return "¡Excelente trabajo! Eres un maestro de la observación.";
    } else if (score >= 15) {
        return "¡Buen trabajo! Sigue practicando para mejorar.";
    } else {
        return "¡Sigue intentándolo! La práctica hace al maestro.";
    }
}

/**
 * Captura y comparte los resultados como imagen
 */
function captureAndShareResults() {
    const resultsContainer = document.querySelector('.content-box');
    
    // Configuración para html2canvas
    const options = {
        scale: 2, // Mayor calidad
        logging: false,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#FFF8E1', // Mismo color que el fondo
        windowWidth: resultsContainer.scrollWidth,
        windowHeight: resultsContainer.scrollHeight
    };
    
    html2canvas(resultsContainer, options).then(canvas => {
        // Convertir canvas a blob
        canvas.toBlob(blob => {
            const player = Player.loadFromLocalStorage();
            const fileName = `resultados_${player.name.replace(/\s+/g, '_')}.png`;
            const file = new File([blob], fileName, { type: 'image/png' });
            
            // Intentar usar la Web Share API
            if (navigator.share && navigator.canShare({ files: [file] })) {
                navigator.share({
                    title: `Resultados de ${player.name}`,
                    text: `¡Obtuve ${player.totalScore} puntos en los juegos!`,
                    files: [file]
                }).catch(err => {
                    console.log('Error al compartir:', err);
                    fallbackSaveImage(canvas, fileName);
                });
            } else {
                fallbackSaveImage(canvas, fileName);
            }
        }, 'image/png', 1);
    });
}

/**
 * Método alternativo para guardar la imagen
 */
function fallbackSaveImage(canvas, fileName) {
    // Crear enlace de descarga
    const link = document.createElement('a');
    link.download = fileName;
    link.href = canvas.toDataURL('image/png');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Mostrar mensaje al usuario
    alert('Captura de resultados guardada. Puedes compartirla desde tu galería.');
}

/**
 * Copia texto al portapapeles
 * @param {string} text - Texto a copiar
 */
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert('Resultados copiados al portapapeles: ' + text);
    }).catch(err => {
        console.error('Error al copiar:', err);
        prompt('Copiar resultados:', text);
    });
}