const LoginResult = require("../serverpackets/LoginResult");
const CharSelectionInfo = require("../serverpackets/CharSelectionInfo");
const LOGGER = (new (require("../../logger/Logger"))("AuthLogin"));

class RequestLogin 
{
	run(client, packet) 
	{
		/*Тут просиходит обмен с логином и проверка данныйх */
		let account = packet.readS().toLowerCase();
		let playKey2 = packet.readD();
		let playKey1 = packet.readD();
		let loginKey1 = packet.readD();
		let loginKey2 = packet.readD();
		
		/*необходимо проверить ключи на логинсервере*/
		//LOGGER.debug(playKey2.toString(16) + " " + playKey1.toString(16) + " " + loginKey1.toString(16) + " " + loginKey2.toString(16));
		
		if (client.getAccountName() == null && account.length > 0 && client.isProtocolOk())
		{
			//запрос к серверу login
			client.setAccountName(account);
			client.setSession(playKey1);
			//Для упрощения посылаем что прошли проверку и отправляем список персонажей
			client.write(new LoginResult(-1, LoginResult.NO_TEXT));
			client.write(new CharSelectionInfo(client.getAccountName(), client.getSession()));
			
		} else {
			client.close();
		}
	}
}
module.exports = RequestLogin;