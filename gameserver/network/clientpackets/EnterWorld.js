const UserInfo = require("../serverpackets/UserInfo");
//const ItemList = require("../serverpackets/ItemList");
//const ExBasicActionList = require("../serverpackets/ExBasicActionList");
//const ExUserInfoEquipSlot = require("../serverpackets/ExUserInfoEquipSlot");
//const ExAdenaInvenCount = require("../serverpackets/ExAdenaInvenCount");
//const ExUserInfoInvenWeight = require("../serverpackets/ExUserInfoInvenWeight");
//const ExRotation = require("../serverpackets/ExRotation");
const LOGGER = (new (require("../../logger/Logger"))("EnterWorld"));

class EnterWorld 
{
	run(client, packet) 
	{
		let tracert = [[],[],[],[],[]];
		for (let i = 0; i < 5; i++)
		{
			for (let j = 0; j < 4; j++)
			{
				tracert[i][j] = packet.readC();
			}
		}
			
		packet.readD(); // Unknown Value
		packet.readD(); // Unknown Value
		packet.readD(); // Unknown Value
		packet.readD(); // Unknown Value
		packet.readB(64); // Unknown Byte Array
		packet.readD(); // Unknown Value
		
		let activeChar = client.getActiveChar();
		
		if (activeChar == null)
		{
			LOGGER.warning("EnterWorld failed! activeChar is null...");
			client.close();
			return;
		}
		
		let adress = [];
		for (let i = 0; i < 5; i++)
		{
			adress[i] = tracert[i][0] + "." + tracert[i][1] + "." + tracert[i][2] + "." + tracert[i][3];
		}

		client.setClientTracert(tracert);

		if (activeChar.getHp() < 0.5) {
			activeChar.setIsDead(true);
		}

		let clan = activeChar.getClan();
		if (clan != null) {

		}

		// Send Macro List
		//activeChar.getMacros().sendAllMacros();
		
		
		client.write(new UserInfo(activeChar, true));
		
		//client.write(new ItemList(activeChar, false));
		
		//client.write(new ExAdenaInvenCount(activeChar));
		
		//client.write(new ExUserInfoInvenWeight(activeChar));
		
		//client.write(new ExUserInfoEquipSlot(activeChar));
		
		
		//client.write(new ExRotation(activeChar.getCharId(), activeChar.getHeading()));
	}
}
module.exports = EnterWorld;