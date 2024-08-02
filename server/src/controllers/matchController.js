import { openDb } from "../config/connection.js";
import partida from "../models/matchModel.js";

class PartidaController{
    createMatch(){
      openDb().then(db => {
          db.exec('CREATE TABLE IF NOT EXISTS Partida (id INTEGER PRIMARY KEY, rounds INTEGER, vencedor INTEGER, time_um INTEGER, time_dois,FOREIGN KEY(vencedor, time_um, time_dois) REFERENCES Time(id, id, id))');
      });
  }
  
  insertMatch(req, res){
      partida.rounds = req.body.rounds;
      partida.vencedor = req.body.vencedor;
      partida.time_um = req.body.time_um;
      partida.time_dois = req.body.time_dois;
      openDb().then(db => {
          db.run('INSERT INTO Partida (rounds, vencedor, time_um, time_dois) VALUES (?, ?, ?, ?)', [partida.rounds, partida.vencedor, partida.time_um, partida.time_dois]);
      });
  
      res.json({
          "statusCode": 200,
          "message": "Success"
      });
  }
  
  updateMatch(req, res){
      partida.rounds = req.body.rounds;
      partida.vencedor = req.body.vencedor;
      partida.time_um = req.body.time_um;
      partida.time_dois = req.body.time_dois;
      partida.id = req.body.id;
      openDb().then(db => {
          db.run('UPDATE Partida SET rounds=?, vencedor=?, time_um=?, time_dois=? WHERE id=?', [partida.rounds, partida.vencedor, partida.time_um, partida.time_dois, partida.id]);
      });
  
      res.json({
          "statusCode": 200,
          "message": "Success"
      });
  }
  
  selectMatches(req, res){
     return openDb().then(db => {
          return db.all('SELECT Partida.id, Partida.rounds,TimeVencedor.nome AS vencedor,TimeUm.nome AS time_um, TimeDois.nome AS time_dois FROM Partida JOIN Time AS TimeVencedor ON Partida.vencedor = TimeVencedor.id JOIN Time AS TimeUm ON Partida.time_um = TimeUm.id JOIN Time AS TimeDois ON Partida.time_dois = TimeDois.id')    
              .then(partidas => res.json(partidas));
          });
  }
  
  selectMatch(req, res){
      partida.id = req.body.id;
      return openDb().then(db => {
           return db.get('SELECT Partida.id, Partida.rounds,TimeVencedor.nome AS vencedor,TimeUm.nome AS time_um, TimeDois.nome AS time_dois FROM Partida JOIN Time AS TimeVencedor ON Partida.vencedor = TimeVencedor.id JOIN Time AS TimeUm ON Partida.time_um = TimeUm.id JOIN Time AS TimeDois ON Partida.time_dois = TimeDois.id WHERE Partida.id=?', [partida.id])
           .then(partida => res.json(partida));   
       });
   }
  
  deleteMatch(req, res){
      partida.id = req.body.id;
      openDb().then(db => {
          db.get('DELETE FROM Partida WHERE id=?', [partida.id])
          .then(res => res);
       });
  
       res.json({
          "statusCode": 200,
          "message": "Success"
      });
   }
}

export default new PartidaController();