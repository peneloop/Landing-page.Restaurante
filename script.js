/* Página dinamica */



/* Validação e confirmação de formulário */

const form = document.querySelector('form');

function enviarspam(e) {
    e.preventDefault();

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const receber = document.querySelector('input[type="checkbox"]').checked;

    if (receber && email === '') {
        alert('Preencha o e-mail para receber novidades!');
        return;
    }

    alert('Obrigado, ' + nome + '! Sua reserva foi enviada.');
    form.reset();
}

form.addEventListener('submit', enviarspam);
