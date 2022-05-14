
const LoginServer = require('./loginserver/LoginServer');
let login = new LoginServer();
login.start();

const GameServer = require('./gameserver/GameServer');
let game = new GameServer();
game.start();