document.addEventListener('DOMContentLoaded', () => {
    const player = Player.loadFromLocalStorage();
    const startBtn = document.getElementById('start-btn');
    
    // Deshabilitar interacción por mouse
    startBtn.style.pointerEvents = 'none';
    startBtn.style.cursor = 'default';
    
    if (!player) {
        window.location.href = "registration.html";
        return;
    }
    
    // Personalizar saludo según género
    const greetings = {
        'el': 'Estimado',
        'ella': 'Estimada', 
        'elle': 'Estimade',
        'otro': 'Estimadx'
    };
    
    document.getElementById('welcome-title').textContent = 
        `¡${greetings[player.gender] || 'Atención'} ${player.name}!`;
    
    // Control solo por teclado
    document.addEventListener('keydown', (e) => {
        if (e.key === '2') {
            // Efecto visual al presionar
            startBtn.style.transform = 'scale(0.95)';
            startBtn.style.boxShadow = 'inset 0 0 10px rgba(0,0,0,0.3)';
            
            // Redirección después de breve delay para el efecto
            setTimeout(() => {
                window.location.href = "flies_game.html";
            }, 200);
        }
    });
    
    // Restaurar estilo del botón al soltar tecla
    document.addEventListener('keyup', (e) => {
        if (e.key === '2') {
            startBtn.style.transform = '';
            startBtn.style.boxShadow = '';
        }
    });
});