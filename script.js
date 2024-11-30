'use strict';

// Função para renderizar os cards das promessas
function renderPromises(promises) {
  const promisesContainer = document.getElementById('promises-container');
  promisesContainer.innerHTML = '';

  promises.forEach(promise => {
    const card = document.createElement('div');
    card.classList.add('bg-white', 'rounded', 'shadow-', 'p-6', 'hover:shadow-2xl', 'transition-shadow', 'duration-300', 'ease-in-out');
    card.innerHTML = `
      <h2 class="text-2xl font-bold mb-4 hover-">${promise.text}</h2>
      <p class="text-gray-700 text-xl">${promise.book} ${promise.chapter}:${promise.versPag}</p>
    `;
    promisesContainer.appendChild(card);
  });
}

// Função para obter todas as promessas do servidor JSON
async function getPromises() {
  try {
    const response = await fetch('http://localhost:3000/promessas');
    const promises = await response.json();
    renderPromises(promises);
  } catch (error) {
    console.error('Erro ao obter promessas:', error);
  }
}

// Chama a função para obter as promessas ao carregar a página
window.onload = getPromises;
