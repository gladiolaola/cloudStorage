window.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const nomeInput = document.getElementById('nome');
  const campJogadoInput = document.getElementById('camp_jogados');
  const campVencidoInput = document.getElementById('camp_vencidos');

  const nome = params.get('nome');
  const camp_jogados = params.get('camp_jogados');
  const camp_vencidos = params.get('camp_vencidos');

  nomeInput.value = nome || '';
  campJogadoInput.value = camp_jogados || '';
  campVencidoInput.value = camp_vencidos || '';
});

function editar() {
  alert('Time editado com sucesso.');
  const params = new URLSearchParams(window.location.search);
  const timeId = params.get('id');
  const nome = document.getElementById('nome').value;
  const camp_jogados = document.getElementById('camp_jogados').value;
  const camp_vencidos = document.getElementById('camp_vencidos').value;

  const timeData = {
      id: timeId,
      nome: nome,
      camp_jogados: camp_jogados,
      camp_vencidos: camp_vencidos
  };

  fetch(`http://localhost:7070/teams/update/${timeId}`, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(timeData)
  })
  .catch((error) => {
      console.error('Erro de conexão com a API:', error);
  });
}
