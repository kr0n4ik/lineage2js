const fs = require("fs");
const Crypt = require("../../commons/crypt/Crypt");
const TableChar = require("../data/TableChar");
const BaseRecievePacket = require("../network/BaseRecievePacket");
const BaseSendablePacket = require("../network/BaseSendablePacket");
const ConnectionState = require("../network/ConnectionState");
const IncomingPackets = require("../network/IncomingPackets");
const Character = require("./Character");
const LOGGER = (new (require("../logger/Logger"))("Client"));

class Client {
	constructor(socket)  {
		this.crypt = new Crypt();
		this.socket = socket;
		this.connectionState = ConnectionState.CONNECTED;
		this.protocol = false;
		this.key = null;
		this.accountName = null;
		this.session = null;
		this.activeChar = null;
		this.trace = null;
	}
	
	read(buffer) {
		let size = ( buffer[1] << 8 ) | buffer[0];
		if (size > buffer.length)
		{
			LOGGER.error(" size > buffer.length");
			return;
		}
		if (size != buffer.length)
		{
			this.read(buffer.slice(size));
		}
		
		buffer = buffer.slice(2, size);
		
		buffer = this.crypt.decrypt(buffer);
		
		let packet = new BaseRecievePacket(buffer);
		let opcode = packet.readC();
		
		//this.helper(buffer);
		if (!fs.existsSync("gameserver/network/clientpackets/" + IncomingPackets[opcode].packet + ".js"))
		{
			LOGGER.error("Not found packet 0x" + ("0" + opcode.toString(16)).substr(-2) + " " + (IncomingPackets[opcode].packet).green);
			return;
		}
		//try {
			//if (IncomingPackets[opcode].state == this.connectionState)
			//{
				(new (require("../network/clientpackets/" + IncomingPackets[opcode].packet))()).run(this, packet);
			//} 
			//else 
			//{
			///	LOGGER.error("Error state: " + this.connectionState + " 0x" + ("0" + opcode.toString(16)).substr(-2) + " " + (IncomingPackets[opcode].packet).green);
			//}
		//} catch(err) {
			//console.log(err);
		//}
	}
	
	write(block) {
		let packet = new BaseSendablePacket();
		block.write(packet);
		let data = this.crypt.encrypt(packet.buffer());
		let buffer = new Buffer.alloc(data.length + 2);
		for (let i = 0; i < data.length; ++i)
		{
			buffer[i + 2] = data[i];
		}
		buffer[0] = buffer.length & 0xFF;
		buffer[1] = (buffer.length >> 8) & 0xFF;
		this.socket.write(buffer);
	}

	setConnectionState(connectionState) {
		this.connectionState = connectionState;
	}

	setProtocolOk(protocol) {
		this.protocol = protocol;
	}

	isProtocolOk() {
		return this.protocol;
	}

	enableCrypt() {
		this.key = this.crypt.key();
		return this.key;
	}

	getAccountName() {
		return this.accountName;
	}

	setAccountName(accountName) {
		this.accountName = accountName;
	}

	getSession() {
		return this.session;
	}

	setSession(session) {
		this.session = session;
	}

	getActiveChar() {
		return this.activeChar;
	}

	setActiveChar(activeChar) {
		this.activeChar = activeChar;
	}

	setState(connectionState) {
		this.connectionState = connectionState;
	}

	setClientTracert(tracert) {
		this.trace = tracert;
	}

	getTrace() {
		return this.trace;
	}

	loadChar(slot) {
		if (slot < 0) {
			return null;
		}

		let characters = TableChar.getCharacters(this.getAccountName());

		if (characters.length < slot || !characters[slot]) {
			return null;
		}

		let character = new Character(characters[slot]);

		return character;
	}
}
module.exports = Client;