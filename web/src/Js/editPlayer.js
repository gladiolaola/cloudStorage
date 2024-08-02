window.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const nomeInput = document.getElementById('nome');
    const funcaoInput = document.getElementById('funcao');
    const personagemInput = document.getElementById('personagem');
    const timeInput = document.getElementById('time');

    const nome = params.get('nome');
    const funcao = params.get('funcao');
    const personagem = params.get('personagem');
    const time = params.get('time');

    nomeInput.value = nome || '';
    funcaoInput.value = funcao || '';
    personagemInput.value = personagem || '';
    timeInput.value = time || '';
});

function editar() {
    alert('Jogador editado com sucesso.');
    const params = new URLSearchParams(window.location.search);
    const jogadorId = params.get('id');
    const nome = document.getElementById('nome').value;
    const funcao = document.getElementById('funcao').value;
    const personagem = document.getElementById('personagem').value;
    const time = document.getElementById('time').value;

    const jogadorData = {
        id: jogadorId,
        nome: nome,
        funcao: funcao,
        personagem: personagem,
        time_id: time
    };

    fetch(`http://localhost:7070/players/update/${jogadorId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jogadorData)
    })
    .catch((error) => {
        console.error('Erro de conexão com a API:', error);
    });
}
