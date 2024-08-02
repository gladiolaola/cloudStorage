import express from 'express';
import fs from 'fs';
import https from 'https';
import cors from 'cors';
import router from './routes.js';

const app = express();
app.use(express.json());
app.use(cors());
app.use(router);

import xx from "./controllers/teamController.js";
xx.createTeam();
import yy from "./controllers/playerController.js";
yy.createPlayer();
import zz from "./controllers/matchController.js";
zz.createMatch();

app.listen(7070, () => console.log(`Server running on port 7070`));    

https.createServer({
    cert: fs.readFileSync('server/src/SSL/code.crt'),
    key: fs.readFileSync('server/src/SSL/code.key')
}, app).listen(8000, () => console.log("Server Running https on port 8000"));   
