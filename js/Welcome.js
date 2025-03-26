document.addEventListener('DOMContentLoaded', () => {
    // Mapeo de teclas a colores
    const keyMap = {
        '1': 'red',
        '2': 'green',
        '3': 'yellow', 
        '4': 'blue'
    };

    // Seleccionar todos los círculos
    const circles = document.querySelectorAll('.circle');
    
    // Función para redirigir
    const redirect = () => {
        window.location.href = "instructions.html";
    };

    // Eventos para clic/touch en círculos
    circles.forEach(circle => {
        circle.addEventListener('click', redirect);
    });

    // Eventos de teclado
    document.addEventListener('keydown', (e) => {
        if (keyMap[e.key]) {
            // Efecto visual al presionar tecla
            const circle = document.querySelector(`.${keyMap[e.key]}`);
            circle.style.transform = 'scale(0.95)';
            circle.style.boxShadow = 'inset 0 0 15px rgba(0,0,0,0.5)';
            
            // Redirigir después de breve animación
            setTimeout(() => {
                circle.style.transform = 'scale(1)';
                circle.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
                redirect();
            }, 200);
        }
    });
});