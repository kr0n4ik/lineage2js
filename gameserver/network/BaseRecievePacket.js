class BaseRecievePacket 
{
	constructor(buffer) 
	{
		this.read = 0;
		this.data = new Uint8Array(buffer);
		this.view = new DataView(this.data.buffer);
	}
	readB(len = 1) 
	{
		let arr = this.data.subarray(this.read, this.read + len);
		this.read += len;
		return new Buffer.from(arr);
	}
	readC() 
	{
		let val = this.view.getUint8(this.read, true);
		this.read += 1;
		return val;
	}
	readH() 
	{
		let val = this.view.getUint16(this.read, true);
		this.read += 2;
		return val;
	}
	readD() 
	{
		let val = this.view.getInt32(this.read, true);
		this.read += 4;
		return val;
	}
	readQ() 
	{
		let val = (BigInt(this.view.getInt32(this.read, true)) << 32n) | BigInt(this.view.getInt32(this.read + 4, true));
		this.read += 8;
		return val;
	}
	readE() 
	{
		let val = this.view.getFloat32(this.read, true);
		this.read += 4;
		return val;
	}
	readF() 
	{
		let val = this.view.getFloat64(this.read, true);
		this.read += 8;
		return val;
	}
	readS() 
	{
		let strArray = [];
		for (let i = 0; i < 0xFFFF; ++i) 
		{
			let code = this.readH();
			if (code == 0x0000)
			{
				break;
			}
			strArray.push(code);
		}
		return new Buffer.from(strArray).toString();
	}
}
module.exports = BaseRecievePacket;