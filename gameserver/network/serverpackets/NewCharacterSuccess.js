const LOGGER = (new (require("../../logger/Logger"))("NewCharacterSuccess"));

class NewCharacterSuccess
{
	constructor() 
	{
		this.chars = [];
	}

	add(template) {
		this.chars.push(template);
	}

	write(packet) 
	{
		packet.writeC(0x0D);
		packet.writeD(this.chars.length);
		for (let chr of this.chars) {
			if (chr == null) {
				continue;
			}
		}
	}
}
module.exports = NewCharacterSuccess;