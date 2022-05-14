class BaseSendablePacket 
{
	constructor(opcode) 
	{
		this.write = 0;
		this.data = new Uint8Array(0xFFFF);
		this.view = new DataView(this.data.buffer);
	}
	writeC(val) 
	{
		this.view.setUint8(this.write, val);
		this.write += 1;
	}
	writeH(val) 
	{
		this.view.setUint16(this.write, val, true);
		this.write += 2;
	}
	writeD(val) 
	{
		this.view.setInt32(this.write, val, true);
		this.write += 4;
	}
	writeE(val) 
	{
		this.view.setFloat32(this.write, val, true);
		this.write += 4;
	}
	writeF(val) 
	{
		this.view.setFloat64(this.write, val, true);
		this.write += 8;
	}
	writeQ(val) 
	{
		this.writeD(parseInt(BigInt(val) & BigInt(0xFFFFFFFF)));
		this.writeD(parseInt((BigInt(val) >> 32n) & BigInt(0xFFFFFFFF)));
	}
	writeB(val) 
	{
		for (let i = 0; i < val.length; ++i)
		{
			this.writeC(val[i]);
		}
	}
	writeS(val) 
	{
		let buffer = new Buffer.from(val);
		for (let i = 0; i < buffer.length; ++i)
		{
			this.writeH(buffer[i]);
		}
		this.writeH(0x00);
	} 
	writeT(val) 
	{
		let buffer = new Buffer.from(val);
		this.writeH(buffer.length);
		for (let i = 0; i < buffer.length; ++i)
			this.writeH(buffer[i]);
	}
	hex(val) 
	{
		if (val.length%2 != 0)
			console.log("hex error");
		for (var i = 0; i < val.length/2; ++i)
		{
			this.writeC(parseInt("0x"+val[i*2]+val[i*2+1]));
		}
	}
	buffer()
	{
		let buffer = new Buffer.alloc(this.write);
		for (let i = 0; i < this.write; ++i)
		{
			buffer[i] = this.data[i];
		}
		return buffer;
	}
}
module.exports = BaseSendablePacket;