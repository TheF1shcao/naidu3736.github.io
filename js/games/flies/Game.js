class Game {
    constructor() {
        this.targets = [];
        this.totalFlies = 150;
        this.timeLeft = 25;
        this.colors = ['red', 'green', 'yellow', 'blue'];
        this.gameActive = false;
        this.lastTime = Date.now();       // Para el temporizador
        this.lastFlyTime = Date.now();    // Para la generación de moscas
    }

    startGame() {
        this.gameActive = true;
        this.setupTargets();
        this.updateTimer();
        this.runTimerLoop();      // Loop del temporizador
        this.runFlySpawnLoop();   // Loop de generación de moscas
    }

    runTimerLoop() {
        const currentTime = Date.now();
        const deltaTime = currentTime - this.lastTime;

        if (deltaTime >= 1000) {  // Esperar 1 segundo
            this.timeLeft--;
            this.updateTimer();
            this.lastTime = currentTime;
            if (this.timeLeft <= 0) this.endGame();
        }

        if (this.gameActive) {
            requestAnimationFrame(() => this.runTimerLoop());
        }
    }

    runFlySpawnLoop() {
        const currentTime = Date.now();
        const deltaTime = currentTime - this.lastFlyTime;

        if (deltaTime >= 150 && this.totalFlies > 0 && this.gameActive) {
            new Fly(this.targets[Math.floor(Math.random() * 4)]);
            this.totalFlies--;
            this.lastFlyTime = currentTime;
        }

        if (this.gameActive && this.totalFlies > 0) {
            requestAnimationFrame(() => this.runFlySpawnLoop());
        }
    }

    endGame() {
        this.gameActive = false;
        // No necesitamos clearInterval (ya no se usa)
        
        const maxCount = Math.max(...this.targets.map(t => t.count));
        const winners = this.targets.filter(t => t.count === maxCount);
        const winner = winners[Math.floor(Math.random() * winners.length)];
        
        localStorage.setItem('gameResults', JSON.stringify({
            winner: { 
                id: winner.id, 
                count: winner.count,
                isTie: winners.length > 1
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