class Fly {
    constructor(target) {
        this.target = target;
        this.element = this.createFlyElement();
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
            // Aumentamos el factor de movimiento de 0.02 a 0.05 para mayor velocidad
            this.element.style.left = `${currentX + dx * 0.03}%`;
            this.element.style.top = `${currentY + dy * 0.03}%`;
            requestAnimationFrame(() => this.animate());
        } else {
            this.target.incrementCount();
            this.element.remove();
        }
    }
}