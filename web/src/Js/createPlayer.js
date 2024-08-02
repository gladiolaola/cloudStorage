document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('createPlayer').addEventListener('submit', (event) => {
      event.preventDefault();
  
      const nome = document.getElementById('nome').value;
      const funcao = document.getElementById('funcao').value;
      const personagem = document.getElementById('personagem').value;
      const time_id = document.getElementById('time_id').value;
  
      fetch('http://localhost:7070/players/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome, funcao, personagem, time_id }),
      })
        .then((response) => response.json())
        .then(() => {
          alert('Cadastro realizado com sucesso.');
        })
        .catch((error) => {
          console.error('Erro:', error);
          alert('Erro no cadastro.');
        });
    });
  });
  