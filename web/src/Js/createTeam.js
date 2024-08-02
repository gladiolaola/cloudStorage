document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('createTeam').addEventListener('submit', (event) => {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const camp_jogados = document.getElementById('camp_jogados').value;
    const camp_vencidos = document.getElementById('camp_vencidos').value;

    fetch('http://localhost:7070/teams/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nome, camp_jogados, camp_vencidos}),
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
