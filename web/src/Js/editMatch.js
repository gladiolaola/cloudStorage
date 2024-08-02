window.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const roundInput = document.getElementById('rounds');
  const timeUmInput = document.getElementById('time_um');
  const timeDoisInput = document.getElementById('time_dois');
  const vencedorInput = document.getElementById('vencedor');

  const rounds = params.get('rounds');
  const timeUm = params.get('time_um');
  const timeDois = params.get('time_dois');
  const vencedor = params.get('vencedor');

  roundInput.value = rounds || '';
  timeUmInput.value = timeUm || '';
  timeDoisInput.value = timeDois || '';
  vencedorInput.value = vencedor || '';
});

function editar() {
  alert('Round editado com sucesso.');
  const params = new URLSearchParams(window.location.search);
  const matchId = params.get('id');
  const rounds = document.getElementById('rounds').value;
  const time_um = document.getElementById('time_um').value;
  const time_dois = document.getElementById('time_dois').value;
  const vencedor = document.getElementById('vencedor').value;

  const matchData = {
      id: matchId,
      rounds: rounds,
      time_um: time_um,
      time_dois: time_dois,
      vencedor: vencedor
  };

  fetch(`http://localhost:7070/matches/update/${roundId}`, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(matchData)
  })
  .catch((error) => {
      console.error('Erro de conexão com a API:', error);
  });
}
