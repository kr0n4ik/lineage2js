const CharSelectionInfo = require("../serverpackets/CharSelectionInfo");

class RequestGotoLobby
{
	run(client, packet) 
	{
		client.write(new CharSelectionInfo(client.getAccountName(), client.getSession()));
	}
}
module.exports = RequestGotoLobby;