const LOGGER = (new (require("../../logger/Logger"))("SendLogOut"));
class SendLogOut
{
	run(client, packet) 
	{
		let cha = client.getActiveChar();
		
		if (cha == null)
		{
			client.close();
			return;
		}
		
		LOGGER.debug("Logged out, " + client);
		
		//Уничтожить все объеткы пользователя
		client.close();
	}
}
module.exports = SendLogOut;