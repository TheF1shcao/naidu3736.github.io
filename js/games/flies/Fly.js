class Fly {
    constructor(target) {
        this.target = target;
        this.element = this.createFlyElement();
        this.lastAnimationTime = Date.now();  // Para deltaTime
        this.animate();
    }

    createFlyElement() {
        const fly = document.createElement('div');
        fly.className = 'fly';
        const gameContainer = document.getElementById('game-container');
        fly.style.left = `${Math.random() * 100}%`;
        fly.style.top = `100%`;
        gameContainer.appendChild(fly);
        return fly;
    }

    animate() {
        const currentTime = Date.now();
        const deltaTime = currentTime - this.lastAnimationTime;
        this.lastAnimationTime = currentTime;

        const gameContainer = document.getElementById('game-container');
        const containerRect = gameContainer.getBoundingClientRect();
        const targetRect = this.target.element.getBoundingClientRect();
        
        const targetX = ((targetRect.left - containerRect.left) + targetRect.width/2) / containerRect.width * 100;
        const targetY = ((targetRect.top - containerRect.top) + targetRect.height/2) / containerRect.height * 100;
        
        const currentX = parseFloat(this.element.style.left);
        const currentY = parseFloat(this.element.style.top);
        
        const dx = targetX - currentX;
        const dy = targetY - currentY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance > 1) {
            const speed = 0.03 * (deltaTime / 16.67); // Normalizado a 60 FPS
            this.element.style.left = `${currentX + dx * speed}%`;
            this.element.style.top = `${currentY + dy * speed}%`;
            requestAnimationFrame(() => this.animate());
        } else {
            this.target.incrementCount();
            this.element.remove();
        }
    }
}