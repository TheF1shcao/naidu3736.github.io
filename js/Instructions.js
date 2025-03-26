document.addEventListener('DOMContentLoaded', () => {
    const continueBtn = document.getElementById('continue-btn');
    
    // Función para manejar la acción de continuar
    const handleContinue = () => {
        // Efecto visual
        continueBtn.style.transform = 'scale(0.95)';
        continueBtn.style.backgroundColor = '#3d8b40';
        
        // Redirección después de la animación
        setTimeout(() => {
            window.location.href = "registration.html";
        }, 200);
    };

    // Continuar con clic en botón verde
    continueBtn.addEventListener('click', handleContinue);
    
    // Continuar con botón verde
    document.addEventListener('keydown', (e) => {
        // Solo responder si no estamos en un campo de entrada
        if (e.key === '2' && e.target.tagName !== 'INPUT') {
            handleContinue();
            e.preventDefault(); // Evitar comportamiento por defecto
        }
    });
});