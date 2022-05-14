const Packet = require('./Packet');
const Blowfish = require('egoroof-blowfish');
class LoginClient {
	constructor(socket) {
		this.socket = socket;
		this.first = true;
		this.id = this.randomD();
		this.rsa = this.randomB(128);
		this.loginOkID1 = this.randomD();
		this.loginOkID2 = this.randomD();
		this.playOkID1 = this.randomD();
		this.playOkID2 = this.randomD();
		this.key = this.randomB(16);
		this.Init();
	}
	write(packet) {
		packet.zero((this.first) ? 8 : 4);
		packet.zero(8 - (packet.write % 8));
		
		if (this.first) {
			this.first = false;
			let key = 0x04a13d000;//this.randomD();
			while (packet.read < (packet.write - 4)) {
				let data = packet.readD();
				key += data;
				data ^= key;
				packet.setD(packet.read - 4, data);
			}
			packet.setD(packet.read, key);
			var buf = new Buffer.alloc(packet.write);
			for (let i = 0; i < packet.write; i += 4) {
				buf[i+3] = packet.data[i];
				buf[i+2] = packet.data[i+1];
				buf[i+1] = packet.data[i+2];
				buf[i] = packet.data[i+3];
			}
			let bf = new Blowfish(new Buffer.from([0x6b, 0x60, 0xcb, 0x5b, 0x82, 0xce, 0x90, 0xb1, 0xcc, 0x2b, 0x6c, 0x55, 0x6c, 0x6c, 0x6c, 0x6c]), Blowfish.MODE.ECB, Blowfish.PADDING.NULL);
			buf = bf.encode(buf, Blowfish.TYPE.UINT8_ARRAY);
		} else {
			var buf = new Buffer.alloc(packet.write);
			for (let i = 0; i < packet.write; i += 4) {
				buf[i+3] = packet.data[i];
				buf[i+2] = packet.data[i+1];
				buf[i+1] = packet.data[i+2];
				buf[i] = packet.data[i+3];
			}
			
			let bf = new Blowfish(new Buffer.from(this.key), Blowfish.MODE.ECB, Blowfish.PADDING.NULL);
			buf = bf.encode(buf, Blowfish.TYPE.UINT8_ARRAY);
		}
		
		let buffer = new Buffer.alloc(packet.write + 2);
		buffer[0] = (packet.write + 2) & 0xFF;
		buffer[1] = ((packet.write + 2) >> 8) & 0xFF;
		for (let i = 0; i < packet.write; i += 4) {
			buffer[i+5] = buf[i];
			buffer[i+4] = buf[i+1];
			buffer[i+3] = buf[i+2];
			buffer[i+2] = buf[i+3];
		}
		this.socket.write(buffer);
	}
	
	read(buffer){
		let size = ( buffer[0] << 8 ) | buffer[1];//чекаем размер, если не совпадает режем и на переработку
		buffer = buffer.slice(2, size);
		let tmp = 0;
		for (let i = 0; i < buffer.length; i += 4) {
			tmp = buffer[i] & 0xFF;
			tmp |= (buffer[i + 1] & 0xFF) << 8;
			tmp |= (buffer[i + 2] & 0xFF) << 16;
			tmp |= (buffer[i + 3] & 0xFF) << 24;
			buffer[i + 3] = (tmp & 0xff);
			buffer[i + 2] = (tmp >> 0x08) & 0xff;
			buffer[i + 1] = (tmp >> 0x10) & 0xff;
			buffer[i] = (tmp >> 0x18) & 0xff;
		}
		let bf = new Blowfish(new Buffer.from(this.key), Blowfish.MODE.ECB, Blowfish.PADDING.NULL);
		buffer = bf.decode(buffer, Blowfish.TYPE.UINT8_ARRAY);
		for (let i = 0; i < buffer.length; i += 4) {
			tmp = buffer[i] & 0xFF;
			tmp |= (buffer[i + 1] & 0xFF) << 8;
			tmp |= (buffer[i + 2] & 0xFF) << 16;
			tmp |= (buffer[i + 3] & 0xFF) << 24;
			buffer[i + 3] = (tmp & 0xff);
			buffer[i + 2] = (tmp >> 0x08) & 0xff;
			buffer[i + 1] = (tmp >> 0x10) & 0xff;
			buffer[i] = (tmp >> 0x18) & 0xff;
		}
		switch (buffer[0]) {
			case 0x00: this.LoginOk(); break;
			case 0x02: this.PlayOk(); break;
			case 0x05: this.ServerList(); break;
			case 0x07: this.GGAuth(); break;
			default:
				console.log("command: " + buffer[0]);
		}
	}
	
	ServerList() {
		var packet = new Packet(0x00);
		packet.writeC(0x04);
		packet.writeC(0x01);
		packet.writeC(0x00);
		
		packet.writeC(0x01);
		
		packet.writeC(127);
		packet.writeC(0x00);
		packet.writeC(0x00);
		packet.writeC(0x01);
		
		packet.writeD(7777);
		
		packet.writeC(0x00);
		packet.writeC(0x00);
		
		packet.writeH(0x05);
		packet.writeH(0x50);
		
		packet.writeC(0x01);
		
		packet.writeD(1);
		
		packet.writeC(0x00);
		
		packet.writeH(0xA4);

		this.write(packet);
	}
	
	GGAuth() {
		let packet = new Packet();
		packet.writeC(0x0b);
		packet.writeD(0x00);
		this.write(packet);
	}
	
	LoginOk() {
		let packet = new Packet();
		packet.writeC(0x03);
		packet.writeD(this.loginOkID1);
		packet.writeD(this.loginOkID2);
		
		packet.writeD(0x00);
		packet.writeD(0x00);
		packet.writeD(0x000003ea);
		packet.writeD(0x00);
		packet.writeD(0x00);
		packet.writeD(0x00);
		
		packet.writeD(0x00);
		packet.writeD(0x00);
		packet.writeD(0x00);
		packet.writeD(0x00);
		this.write(packet);
	}
	
	PlayOk() {
		console.log(">> ".blue + "LoginServer LID1: " + this.loginOkID1.toString(16) + " LID1: " + this.loginOkID2.toString(16) + " PID1: " + this.playOkID1.toString(16) + " PID2: " + this.playOkID2.toString(16));
		let packet = new Packet();
		packet.writeC(0x07);
		packet.writeD(this.playOkID1);
		packet.writeD(this.playOkID2);
		this.write(packet);
	}
	
	Init(){
		let packet = new Packet();
		packet.writeC(0x00);
		packet.writeD(this.id);
		packet.writeD(0xc621);
		packet.writeB(this.rsa);
		packet.writeD(0x29DD954E);
		packet.writeD(0x77C39CFC);
		packet.writeD(0x97ADB620);
		packet.writeD(0x07BDE0F7);
		packet.writeB(this.key);
		packet.writeB(new Buffer.alloc(11));
		this.write(packet);
	}
	randomD() {
		return Math.floor(Math.random() * 0x7FFFFFFF); //Рандом только плюс
	}
	randomB(n) {
		let gen = new Buffer.alloc(n);
		for (let i = 0; i < n; ++i)
			gen[i] = (Math.random() * 0xFF) & 0xFF;
		return gen;
	}
}
module.exports = LoginClient;