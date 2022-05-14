class LoginResult 
{
	static NO_TEXT = 0;
	static SYSTEM_ERROR_LOGIN_LATER = 1;
	static PASSWORD_DOES_NOT_MATCH_THIS_ACCOUNT = 2;
	static PASSWORD_DOES_NOT_MATCH_THIS_ACCOUNT2 = 3;
	static ACCESS_FAILED_TRY_LATER = 4;
	static INCORRECT_ACCOUNT_INFO_CONTACT_CUSTOMER_SUPPORT = 5;
	static ACCESS_FAILED_TRY_LATER2 = 6;
	static ACOUNT_ALREADY_IN_USE = 7;
	static ACCESS_FAILED_TRY_LATER3 = 8;
	static ACCESS_FAILED_TRY_LATER4 = 9;
	static ACCESS_FAILED_TRY_LATER5 = 10;
	
	constructor(success = -1, reason = 0) 
	{
		this.reason = reason;
		this.success = success;
	}
	
	write(packet)
	{
		packet.writeC(0x0A);
		packet.writeD(this.success);
		packet.writeD(this.reason);
	}
}
module.exports = LoginResult;