let data; 

window.addEventListener('load', () => {
    const tabela = document.getElementById('table');
    const tbody = tabela.querySelector('tbody');

    fetch('http://localhost:7070/teams/all')  
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Ocorreu um erro na obtenção dos dados.');
            }
        })
        .then((responseData) => {
            data = responseData;

            console.log(data);

            for (let i = 0; i < data.length; i++) {
                let newRow = tbody.insertRow();
                newRow.insertCell().textContent = data[i].id;
                newRow.insertCell().textContent = data[i].nome;
                newRow.insertCell().textContent = data[i].camp_jogados;
                newRow.insertCell().textContent = data[i].camp_vencidos;
                let actions = newRow.insertCell();

                let editButton = document.createElement('a');
                editButton.href = editButton.href = `editTeam.html?id=${encodeURIComponent(data[i].id)}&nome=${encodeURIComponent(data[i].nome)}&camp_jogados=${encodeURIComponent(data[i].camp_jogados)}&camp_vencidos=${encodeURIComponent(data[i].camp_vencidos)}`;;

                let editImage = document.createElement('img');
                editImage.src = 'img/editButton.svg';

                editButton.appendChild(editImage);
                actions.appendChild(editButton);


                let deleteButton = document.createElement('img');
                deleteButton.src = 'img/deleteButton.svg';
                deleteButton.setAttribute('onclick', `deletar('${data[i].id}')`);

                actions.appendChild(editButton);
                actions.appendChild(deleteButton);
            }
        })
        .catch((error) => {
            console.error('Erro de conexão com a API:', error);
        });

    deletar = (id) => {
        fetch(`http://localhost:7070/teams/delete/${id}`, {
          method: 'DELETE'
        })
          .then((response) => {
            confirm('Tem certeza que deseja excluir o Jogador?');

            if (response.ok) {
              for (let i = 0; i < data.length; i++) {
                if (data[i].id === id) {
                  data.splice(i, 1);
                  break;
                }
              }
      
              const rows = tbody.getElementsByTagName('tr');
              for (let i = 0; i < rows.length; i++) {
                const rowId = parseInt(rows[i].cells[0].textContent);
                if (rowId === id) {
                  tbody.deleteRow(i);
                  break;
                }
              }
            } else {
              throw new Error('Ocorreu um erro ao deletar o item.');
            }
          })
          .catch((error) => {
            console.error('Erro de conexão com a API:', error);
          });           
      };      
});
