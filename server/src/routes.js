import { Router } from "express";
import TeamController from "./controllers/teamController.js";
import PlayerController from "./controllers/playerController.js";
import matchController from "./controllers/matchController.js";

const router = Router();

router.get('/teams/all', TeamController.selectTeams);
router.get('/teams/team', TeamController.selectTeam);
router.post('/teams/create', TeamController.insertTeam);
router.put('/teams/update/:id', TeamController.updateTeam);
router.delete('/teams/delete/:id', TeamController.deleteTeam);

router.get('/players/all', PlayerController.selectPlayers);
router.get('/players/player', PlayerController.selectPlayer);
router.post('/players/create', PlayerController.insertPlayer);
router.put('/players/update/:id', PlayerController.updatePlayer);
router.delete('/players/delete/:id', PlayerController.deletePlayer);

router.get('/matches/all', matchController.selectMatches);
router.get('/matches/match', matchController.selectMatch);
router.post('/matches/create', matchController.insertMatch);
router.put('/matches/update/:id', matchController.updateMatch);
router.delete('/matches/delete/:id', matchController.deleteMatch);

export default router;