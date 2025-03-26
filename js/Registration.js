// Espera a que el documento HTML esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    // Crea una nueva instancia del jugador
    const player = new Player();
    
    // Obtiene referencias a los elementos del DOM
    const nameInput = document.getElementById('name'); // Campo de entrada del nombre
    const startBtn = document.getElementById('start-btn'); // Botón de comenzar
    const genderElements = { // Botones de género
        'el': document.querySelector('[data-gender="el"]'),
        'ella': document.querySelector('[data-gender="ella"]'),
        'elle': document.querySelector('[data-gender="elle"]'),
        'otro': document.querySelector('[data-gender="otro"]')
    };
    
    // Conjunto para rastrear teclas presionadas (para la combinación)
    let pressedButtons = new Set();
    // Bandera para indicar si se ha seleccionado un género
    let genderLocked = false;

    // Mapeo de teclas numéricas a géneros
    const keyMap = {
        '1': 'el',     // Botón rojo para "Él"
        '2': 'ella',   // Botón verde para "Ella"
        '3': 'elle',   // Botón amarillo para "Elle"
        '4': 'otro'    // Botón azul para "Otro"
    };

    // Enfoca automáticamente el campo de nombre al cargar
    nameInput.focus();

    // Configuración inicial de los botones de género
    Object.values(genderElements).forEach(element => {
        // Deshabilita la interacción con mouse
        element.style.pointerEvents = 'none'; // Evita clics del mouse
        element.style.cursor = 'default';     // Oculta el cursor de mano
    });

    /**
     * Maneja el evento keydown (tecla presionada)
     * Permite seleccionar género y activar combinación
     */
    document.addEventListener('keydown', (e) => {
        // Selección de género con teclas numéricas
        if (keyMap[e.key] && !genderLocked) {
            const gender = keyMap[e.key];
            lockGender(gender); // Bloquea el género seleccionado
            
            // Efecto visual: resalta la opción seleccionada
            Object.entries(genderElements).forEach(([g, element]) => {
                element.style.opacity = g === gender ? '1' : '0.6'; // Opacidad completa para seleccionado
            });
        }
        
        // Lógica para la combinación de teclas (1-2-3-4)
        if (keyMap[e.key]) {
            handleComboPress(e.key);
        }
    });

    /**
     * Maneja el evento keyup (tecla liberada)
     * Para la combinación de teclas
     */
    document.addEventListener('keyup', (e) => {
        if (keyMap[e.key]) {
            handleComboRelease(e.key);
        }
    });

    // Valida el formulario cada vez que cambia el nombre
    nameInput.addEventListener('input', validateForm);

    /**
     * Bloquea el género seleccionado y actualiza el objeto player
     * @param {string} gender - Género seleccionado ('el', 'ella', 'elle', 'otro')
     */
    function lockGender(gender) {
        genderLocked = true; // Marca que ya se seleccionó género
        player.gender = gender; // Asigna al objeto jugador
        validateForm(); // Revalida el formulario
    }

    /**
     * Maneja la presión de teclas para la combinación
     * @param {string} key - Tecla presionada ('1', '2', '3' o '4')
     */
    function handleComboPress(key) {
        if (!keyMap[key]) return; // Ignora teclas no mapeadas
        
        // Añade la tecla al conjunto de teclas presionadas
        pressedButtons.add(key);
        // Aplica efecto visual al botón correspondiente
        genderElements[keyMap[key]].classList.add('combo-active');
        
        // Si se presionaron las 4 teclas y el formulario está completo
        if (pressedButtons.size === 4 && player.name && genderLocked) {
            // Efecto visual en el botón de comenzar
            startBtn.classList.add('active-combo');
            setTimeout(() => {
                startBtn.classList.remove('active-combo');
                handleStart(); // Inicia la aplicación después del efecto
            }, 500);
        }
    }

    /**
     * Maneja la liberación de teclas para la combinación
     * @param {string} key - Tecla liberada ('1', '2', '3' o '4')
     */
    function handleComboRelease(key) {
        if (!keyMap[key]) return; // Ignora teclas no mapeadas
        // Elimina la tecla del conjunto
        pressedButtons.delete(key);
        // Quita el efecto visual del botón
        genderElements[keyMap[key]].classList.remove('combo-active');
    }

    /**
     * Valida si el formulario está completo para habilitar el botón
     */
    function validateForm() {
        // Asigna el nombre (sin espacios extras) al jugador
        player.name = nameInput.value.trim();
        // Habilita el botón solo si hay nombre y género seleccionado
        startBtn.disabled = !(player.name && genderLocked);
    }

    /**
     * Maneja el inicio de la aplicación después de validar
     */
    function handleStart() {
        // Validación adicional por seguridad
        if (!player.name || !genderLocked) {
            alert('Completa tu nombre y selecciona un género primero');
            return;
        }
        // Guarda el jugador en localStorage
        player.saveToLocalStorage();
        // Redirige a la pantalla de inicio del juego
        window.location.href = "games/flies/flies_start.html";
    }
});