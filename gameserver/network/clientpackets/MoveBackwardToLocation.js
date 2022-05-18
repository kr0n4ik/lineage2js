//const LoginResult = require("../serverpackets/LoginResult");
const MoveToLocation = require("../serverpackets/MoveToLocation");
const LOGGER = (new (require("../../logger/Logger"))("MoveBackwardToLocation"));

class MoveBackwardToLocation
{
	run(client, packet) 
	{
		let targetX = packet.readD();
		let targetY = packet.readD();
		let targetZ = packet.readD();
		let originX = packet.readD();
		let originY = packet.readD();
		let originZ = packet.readD();
		let movementMode = packet.readD();

		let activeChar = client.getActiveChar();
		if (activeChar == null) {
			return;
		}

		if ((targetX == originX) && (targetY == originY) && (targetZ == originZ)) {
			//activeChar.sendPacket(new StopMove(activeChar));
			//activeChar.sendPacket(ActionFailed.STATIC_PACKET);
			LOGGER.debug("stop");
			return;
		}

		let dx = targetX - activeChar.getX();
		let dy = targetY - activeChar.getY();

		LOGGER.debug(((dx * dx) + (dy * dy)));

		client.write(new MoveToLocation(activeChar, targetX, targetY, targetZ));
	}
}
module.exports = MoveBackwardToLocation;