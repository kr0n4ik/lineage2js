class CharCreateFail
{
	static REASON_CREATION_FAILED = 0x00; // "Your character creation has failed."
	static REASON_TOO_MANY_CHARACTERS = 0x01; // "You cannot create another character. Please delete the existing character and try again." Removes all settings that were selected (race, class, etc).
	static REASON_NAME_ALREADY_EXISTS = 0x02; // "This name already exists."
	static REASON_16_ENG_CHARS = 0x03; // "Your title cannot exceed 16 characters in length. Please try again."
	static REASON_INCORRECT_NAME = 0x04; // "Incorrect name. Please try again."
	static REASON_CREATE_NOT_ALLOWED = 0x05; // "Characters cannot be created from this server."
	static REASON_CHOOSE_ANOTHER_SVR = 0x06;

	constructor(errorCode)
	{
		this.errorCode = errorCode;
	}

	write(packet) 
	{
		packet.writeC(0x10);
		packet.writeD(this.errorCode);
	}

}
module.exports = CharCreateFail;