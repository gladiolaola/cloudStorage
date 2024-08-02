document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('createMatch').addEventListener('submit', (event) => {
      event.preventDefault();
  
      const round = document.getElementById('round').value;
      const time_um = document.getElementById('time_um').value;
      const time_dois = document.getElementById('time_dois').value;
      const vencedor = document.getElementById('vencedor').value;
  
      fetch('http://localhost:7070/matches/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ round, time_um, time_dois, vencedor }),
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