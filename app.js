'use strict';
// json-server --watch db.json --port 3000

// Função para obter todas as promessas do servidor JSON
async function getPromises() {
  try {
    const promisesContainer = document.getElementById('promises-container');
    promisesContainer.innerHTML = '<p>Carregando...</p>'; // Feedback visual durante o carregamento

    const response = await fetch('http://localhost:3000/promessas');
    const promises = await response.json();
    renderPromises(promises);
  } catch (error) {
    console.error('Erro ao obter promessas:', error);
  }
}

// Função para criar uma nova promessa
async function createPromise(formData) {
  try {
    const url = "http://localhost:3000/promessas";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });

    if (response.ok) {
      alert("Promessa criada com sucesso!");
      await getPromises(); // Atualiza a lista de promessas
    } else {
      alert("Erro ao criar promessa!");
    }
  } catch (error) {
    console.error("Erro ao criar promessa:", error);
  }
}

// Função para excluir uma promessa
async function deletePromise(id) {
  try {
    const response = await fetch(`http://localhost:3000/promessas/${id}`, {
      method: 'DELETE'
    });

    if (response.ok) {
      alert('Promessa excluída com sucesso!');
      await getPromises();
    } else {
      alert('Erro ao excluir promessa!');
    }
  } catch (error) {
    console.error('Erro ao excluir promessa:', error);
  }
}

// Função para lidar com o envio do formulário de adição de promessa
document.getElementById('add-promise-form').addEventListener('submit', async function(event) {
  event.preventDefault(); // Evita o comportamento padrão do formulário

  // Obtém os valores dos campos de entrada
  const text = document.getElementById('text').value;
  const book = document.getElementById('book').value;
  const chapter = document.getElementById('chapter').value;
  const versPag = document.getElementById('versPag').value;

  // Validação de campos
  if (!text || !book || !chapter || !versPag) {
    alert('Por favor, preencha todos os campos!');
    return;
  }

  // Cria um objeto com os dados da nova promessa
  const formData = {
    text: text,
    book: book,
    chapter: chapter,
    versPag: versPag
  };

  try {
    await createPromise(formData);
  } catch (error) {
    console.error('Erro ao adicionar promessa:', error);
  }
});

// Função para renderizar os cards das promessas
function renderPromises(promises) {
  const promisesContainer = document.getElementById('promises-container');
  promisesContainer.innerHTML = ''; // Limpa os dados anteriores

  promises.forEach(promise => {
    const card = document.createElement('div');
    card.classList.add(
      'bg-white',
      'rounded',
      'p-6',
      'shadow-md',
      'hover:shadow-2xl',
      'hover:bg-blue-100',
      'transition',
      'duration-300',
      'ease-in-out',
      'cursor-pointer',
      'transform',
      'hover:scale-105'
    );

    card.innerHTML = `
      <h2 class="text-2xl font-bold mb-4">${promise.text}</h2>
      <p class="text-gray-700 text-xl">${promise.book} ${promise.chapter}:${promise.versPag}</p>
      <button class="bg-red-500 text-white px-4 py-2 rounded mt-4" onclick="deletePromise(${promise.id})">Excluir</button>
    `;
    promisesContainer.appendChild(card);
  });
}

// Chama a função para obter as promessas ao carregar a página
window.onload = getPromises;

//json-server --watch db.json --port 3000
