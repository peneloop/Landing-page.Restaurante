/* Página dinamica */



/* Validação e confirmação de formulário */

const form = document.querySelector('form');

function processarReserva(evento) {
    evento.preventDefault();

    const inpNome = document.getElementById('nome');
    const inpEmail = document.getElementById('email');
    const spam = document.querySelector('input[type="checkbox"]');

    
    if (spam.checked && inpEmail.value === "") {
        alert("Por favor, preencha seu e-mail para receber nossas novidades!");
    } else {
        alert("Obrigado, " + inpNome.value + "! Sua reserva foi enviada.");
        form.reset();
    }
}

form.addEventListener('submit', processarReserva);
