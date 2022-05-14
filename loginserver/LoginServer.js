const colors = require('colors');
const net = require('net');
const LoginClient = require('./LoginClient');
let client;

class LoginServer {
	start() {
		net.createServer(function(socket) {
			client = new LoginClient(socket);
			socket.on('data', function (buffer) {
				client.read(buffer);
			});
			socket.on('close', function () {
				//console.log('>>'.green + "Client close");
			});
			socket.on('error', function (err) {
				console.log('>>'.red + "Connect error");
				console.log(err);
			});
		}).listen(2106);
		
		net.createServer(function(socket) {
			//l2client = new L2Client(socket);
			socket.on('data', function (buffer) {
				//l2client.read(buffer);
			});
		}).listen(9104);
		console.log(">>".green + " Login Server start ports: [2106, 9104]");
	}
}
module.exports = LoginServer;