/* Página dinamica */

// Aguarda o DOM estar completamente carregado
document.addEventListener('DOMContentLoaded', () => {
  // ----- Elementos do DOM -----
  const form = document.querySelector('form');
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.navlinks');
  const scrollTopBtn = document.querySelector('.scroll-top');
  const modalOverlay = document.querySelector('.modal-overlay');
  const modalCloseBtn = document.querySelector('.modal-close');
  const verPratosBtn = document.querySelector('.btnprat');
  const reservaBtn = document.querySelector('.btnresv');

  // ----- Menu Mobile Toggle -----
  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      // Animação do ícone hamburger
      const spans = menuToggle.querySelectorAll('span');
      spans[0].style.transform = navLinks.classList.contains('active') ? 'rotate(45deg) translate(5px, 5px)' : '';
      spans[1].style.opacity = navLinks.classList.contains('active') ? '0' : '1';
      spans[2].style.transform = navLinks.classList.contains('active') ? 'rotate(-45deg) translate(7px, -7px)' : '';
    });
  }

  // Fechar menu ao clicar em um link (mobile)
  document.querySelectorAll('.navlinks a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      const spans = menuToggle?.querySelectorAll('span');
      if (spans) {
        spans[0].style.transform = '';
        spans[1].style.opacity = '1';
        spans[2].style.transform = '';
      }
    });
  });

  // ----- Botão Voltar ao Topo -----
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      scrollTopBtn?.classList.add('visible');
    } else {
      scrollTopBtn?.classList.remove('visible');
    }
  });

  scrollTopBtn?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ----- Validação e Envio do Formulário com Modal -----
  if (form) {
    form.addEventListener('submit', (evento) => {
      evento.preventDefault();

      const inpNome = document.getElementById('nome');
      const inpEmail = document.getElementById('email');
      const inpTelefone = document.getElementById('telefone');
      const inpData = document.getElementById('data');
      const spamCheck = document.querySelector('input[type="checkbox"]');
      
      // Validação básica
      if (!inpNome.value.trim()) {
        alert('Por favor, informe seu nome.');
        inpNome.focus();
        return;
      }
      
      if (!inpTelefone.value.trim()) {
        alert('Por favor, informe um telefone para contato.');
        inpTelefone.focus();
        return;
      }
      
      // Validação de telefone simples (pelo menos 10 dígitos)
      const telDigits = inpTelefone.value.replace(/\D/g, '');
      if (telDigits.length < 10) {
        alert('Telefone inválido. Informe DDD + número (mínimo 10 dígitos).');
        inpTelefone.focus();
        return;
      }

      if (!inpData.value) {
        alert('Selecione uma data para a reserva.');
        inpData.focus();
        return;
      }

      const dataSelecionada = new Date(inpData.value + 'T12:00:00');
      const hoje = new Date();
      hoje.setHours(0, 0, 0, 0);
      
      if (dataSelecionada < hoje) {
        alert('A data da reserva não pode ser no passado.');
        inpData.focus();
        return;
      }

      // Se quer receber spam mas não informou email
      if (spamCheck.checked && !inpEmail.value.trim()) {
        alert('Para receber novidades, informe seu e-mail.');
        inpEmail.focus();
        return;
      }

      // Se passou na validação, exibe modal customizado
      const modalMessage = document.querySelector('.modal p');
      if (modalMessage) {
        const nomeFormatado = inpNome.value.trim().split(' ')[0];
        modalMessage.innerHTML = `Obrigado, <strong>${nomeFormatado}</strong>!<br>Sua reserva para ${inpData.value.split('-').reverse().join('/')} foi confirmada.`;
      }
      
      modalOverlay?.classList.add('active');
      form.reset();
    });
  }

  // Fechar modal
  modalCloseBtn?.addEventListener('click', () => {
    modalOverlay.classList.remove('active');
  });

  modalOverlay?.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      modalOverlay.classList.remove('active');
    }
  });

  // ----- Scroll Reveal (animação ao rolar) -----
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        // Opcional: parar de observar após revelar
        // observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.prato, .sobretxt, .heroimg, .formresv').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(25px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

  // Adiciona classe quando revelado
  const style = document.createElement('style');
  style.textContent = `
    .revealed {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  `;
  document.head.appendChild(style);

  // ----- Navegação suave para botões "Ver pratos" e "Faça sua reserva" -----
  verPratosBtn?.addEventListener('click', () => {
    document.getElementById('pratos').scrollIntoView({ behavior: 'smooth' });
  });

  reservaBtn?.addEventListener('click', () => {
    document.getElementById('reserve').scrollIntoView({ behavior: 'smooth' });
  });

  // ----- Máscara simples para telefone (opcional) -----
  const telefoneInput = document.getElementById('telefone');
  if (telefoneInput) {
    telefoneInput.addEventListener('input', (e) => {
      let value = e.target.value.replace(/\D/g, '');
      if (value.length > 11) value = value.slice(0, 11);
      
      if (value.length > 6) {
        value = value.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
      } else if (value.length > 2) {
        value = value.replace(/^(\d{2})(\d{0,5})/, '($1) $2');
      } else if (value.length > 0) {
        value = value.replace(/^(\d{0,2})/, '($1');
      }
      e.target.value = value;
    });
  }

  // Define data mínima no input date
  const dataInput = document.getElementById('data');
  if (dataInput) {
    const amanha = new Date();
    amanha.setDate(amanha.getDate() + 1);
    const ano = amanha.getFullYear();
    const mes = String(amanha.getMonth() + 1).padStart(2, '0');
    const dia = String(amanha.getDate()).padStart(2, '0');
    dataInput.min = `${ano}-${mes}-${dia}`;
  }
});