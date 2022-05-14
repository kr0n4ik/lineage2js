const colors = require("colors");
const Net = require("net");
const World = require("./model/world");
const Client = require("./model/client");
const config = require("./config");
const LOGGER = (new (require("./logger/Logger"))("GameServer"));

require("./data/TableChar");

class GameServer {
	start() {
		Net.createServer(function(socket) {
			World.add(new Client(socket));
			socket.on('data', function (buffer) {
				World.read(socket, buffer);
			});
			socket.on('close', function () {
				LOGGER.info("Client close");
			});
			socket.on('error', function (err) {
				LOGGER.error("Connect error");
			});
		}).listen(config.port_game);
		LOGGER.info("Server start port: " + config.port_game);
	}
}
module.exports = GameServer;