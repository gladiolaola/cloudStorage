import { openDb } from "../config/connection.js";
import time from "../models/teamModel.js";

class TimeController{
    createTeam(){
        openDb().then(db => {
            db.exec('CREATE TABLE IF NOT EXISTS Time (id INTEGER PRIMARY KEY, nome TEXT, camp_jogados INTEGER, camp_vencidos INTEGER)');
        });
    }
    
    insertTeam(req, res){
        time.nome = req.body.nome;
        time.camp_jogados = req.body.camp_jogados;
        time.camp_vencidos = req.body.camp_vencidos;
        openDb().then(db => {
            db.run('INSERT INTO Time (nome, camp_jogados, camp_vencidos) VALUES (?, ?, ?)', [time.nome, time.camp_jogados, time.camp_vencidos]);
        });
    
        res.json({
            "statusCode": 200,
            "message": "Success"
        });
    }
    
    updateTeam(req, res){
        time.nome = req.body.nome;
        time.camp_jogados = req.body.camp_jogados;
        time.camp_vencidos = req.body.camp_vencidos;
        time.id = req.body.id;
        openDb().then(db => {
            db.run('UPDATE Time SET nome=?, camp_jogados=?,camp_vencidos=? WHERE id=?', [time.nome, time.camp_jogados, time.camp_vencidos, time.id]);  
        });
    
        res.json({
            "statusCode": 200,
            "message": "Success"
        });
    }
    
    selectTeams(req, res){
        return openDb().then(db => {
             return db.all('SELECT * FROM Time')
             .then(times => res.json(times));
         });
     }
    
    selectTeam(req, res){
        const id = req.params.id;
        return openDb().then(db => {
             return db.get('SELECT * FROM Time WHERE id=?', [id])
             .then(time => res.json(time));
         });
     }
    
    deleteTeam(req, res){
        time.id = req.body.id;
        openDb().then(db => {
            db.get('DELETE FROM Time WHERE id=?', [time.id])
            .then(res => res);
         });
    
         res.json({
            "statusCode": 200,
            "message": "Success"
        });
     }
}

export default new TimeController();