const TableChar = require("../../data/TableChar");
const ExIsCharNameCreatable = require("../serverpackets/ExIsCharNameCreatable");

const LOGGER = (new (require("../../logger/Logger"))("RequestCharacterNameCreatable"));

class RequestCharacterNameCreatable
{
	static CHARACTER_CREATE_FAILED = 1;
	static NAME_ALREADY_EXISTS = 2;
	static INVALID_LENGTH = 3;
	static INVALID_NAME = 4;
	static CANNOT_CREATE_SERVER = 5;

	run(client, packet) 
	{
		let name = packet.readS();
		let result = -1;

		let charId = TableChar.getIdByName(name);

		if (!this.isAlphaNumeric(name)) {
			result = RequestCharacterNameCreatable.INVALID_NAME;
		}
		else if (charId > 0) {
			result = RequestCharacterNameCreatable.NAME_ALREADY_EXISTS;
		}
		else if (name.length > 16) {
			result = RequestCharacterNameCreatable.INVALID_LENGTH;
		}
		else {
			result = -1;
		}

		client.write(new ExIsCharNameCreatable(result));
	}

	isAlphaNumeric(name) {
		return true;
	}
}
module.exports = RequestCharacterNameCreatable;