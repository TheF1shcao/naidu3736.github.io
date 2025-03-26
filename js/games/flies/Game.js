class Game {
    constructor() {
        this.targets = [];
        this.totalFlies = 150; // Aumentamos cantidad de moscas
        this.timeLeft = 25;
        this.colors = ['red', 'green', 'yellow', 'blue'];
        this.gameActive = false;
    }

    startGame() {
        this.gameActive = true;
        this.setupTargets();
        this.updateTimer();
        
        this.timerInterval = setInterval(() => {
            this.timeLeft--;
            this.updateTimer();
            if (this.timeLeft <= 0) this.endGame();
        }, 1000);
        
        // Reducimos el intervalo de generación de 300ms a 150ms
        this.flyInterval = setInterval(() => {
            if (this.totalFlies-- <= 0 || !this.gameActive) {
                clearInterval(this.flyInterval);
                return;
            }
            new Fly(this.targets[Math.floor(Math.random() * 4)]);
        }, 150); // Intervalo más corto = moscas más frecuentes
    }

    endGame() {
        this.gameActive = false;
        clearInterval(this.timerInterval);
        clearInterval(this.flyInterval);
        
        // Encontrar el máximo número de moscas
        const maxCount = Math.max(...this.targets.map(t => t.count));
        
        // Filtrar todos los objetivos que tienen el máximo (puede haber empate)
        const winners = this.targets.filter(t => t.count === maxCount);
        
        // Seleccionar un ganador aleatorio si hay empate
        const winner = winners[Math.floor(Math.random() * winners.length)];
        
        localStorage.setItem('gameResults', JSON.stringify({
            winner: { 
                id: winner.id, 
                count: winner.count,
                isTie: winners.length > 1  // Indicar si hubo empate
            },
            tiedWinners: winners.length > 1 ? winners.map(w => w.id) : null
        }));
        
        setTimeout(() => window.location.href = "flies_final.html", 1000);
    }

    setupTargets() {
        const container = document.getElementById('targets-container');
        container.innerHTML = '';
        this.targets = this.colors.map((color, i) => 
            new Target(i, (i + 1) * 20, 15, color)
        );
    }

    updateTimer() {
        document.getElementById('timer').textContent = `${this.timeLeft}s`;
    }
}