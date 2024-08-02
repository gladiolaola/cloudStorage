import { openDb } from "../config/connection.js";
import Jogador from "../models/playerModel.js";

class PlayerController{
      createPlayer(){
        openDb().then(db => {
            db.exec('CREATE TABLE IF NOT EXISTS Jogador (id INTEGER PRIMARY KEY, nome TEXT, funcao TEXT, personagem TEXT, time_id INTEGER, FOREIGN KEY(time_id) REFERENCES Time(id))');
        });
    }
    
    insertPlayer(req, res){
        Jogador.nome = req.body.nome;
        Jogador.funcao = req.body.funcao;
        Jogador.personagem = req.body.personagem;
        Jogador.time_id = req.body.time_id;
        openDb().then(db => {
            db.run('INSERT INTO Jogador (nome, funcao, personagem, time_id) VALUES (?, ?, ?, ?)', [Jogador.nome, Jogador.funcao, Jogador.personagem, Jogador.time_id]);
        });
    
        res.json({
            "statusCode": 200,
            "message": "Success"
        });
    }
    
    updatePlayer(req, res) {
        const id = req.params.id;
        const { nome, funcao, personagem, time_id } = req.body;
        openDb().then(db => {
            db.run('UPDATE Jogador SET nome=?, funcao=?, personagem=?, time_id=? WHERE id=?', [nome, funcao, personagem, time_id, id], (error) => {
                if (error) {
                    console.error('Erro ao atualizar jogador:', error);
                    res.status(500).json({
                        statusCode: 500,
                        message: 'Ocorreu um erro ao atualizar o jogador.'
                    });
                } else {
                    res.json({
                        statusCode: 200,
                        message: 'Jogador atualizado com sucesso.'
                    });
                }
            });
        }).catch(error => {
            console.error('Erro ao abrir o banco de dados:', error);
            res.status(500).json({
                statusCode: 500,
                message: 'Ocorreu um erro ao atualizar o jogador.'
            });
        });
    }    
    
    selectPlayers(req, res){
       return openDb().then(db => {
            return db.all('SELECT Jogador.id, Jogador.nome, Jogador.funcao, Jogador.personagem, Time.nome AS time FROM Jogador JOIN Time ON Jogador.time_id = Time.id')
            .then(jogadores => res.json(jogadores));    
        });
    }
    
    selectPlayer(req, res){
        Jogador.id = req.body.id;   
        return openDb().then(db => {
             return db.get('SELECT Jogador.id, Jogador.nome, Jogador.funcao, Jogador.personagem, Time.nome AS time FROM Jogador JOIN Time ON Jogador.time_id = Time.id WHERE Jogador.id = ?', [Jogador.id])
             .then(jogador => res.json(jogador));
         });
     }
    
     deletePlayer(req, res) {
        const id = req.params.id;
      
        openDb()
          .then(db => {
            db.get('DELETE FROM Jogador WHERE id = ?', [id])
              .then(() => {
                res.json({
                  statusCode: 200,
                  message: 'Success'
                });
              })
              .catch(error => {
                res.status(500).json({
                  statusCode: 500,
                  message: 'Error deleting player',
                  error: error.message
                });
              });
          })
          .catch(error => {
            res.status(500).json({
              statusCode: 500,
              message: 'Error connecting to the database',
              error: error.message
            });
          });
      }          
}

export default new PlayerController();