class Crypt 
{
	constructor() 
	{
		this.encryption = null;
		this.decryption = null;
		this.encrypted = false;
		this.decrypted = false;
	}
	decrypt(buffer) 
	{
		if (!this.decrypted)
		{
			return buffer;
		}
		
		this.encrypted = true;
		
		let size = buffer.length;
		let a = 0;
		for (let i = 0; i < size; i++) 
		{
			let b = buffer[i] & 0xFF;
			buffer[i] = ((b ^ this.decryption[i & 15]) ^ a);
			a = b;
		}
		
		let old = this.decryption[8] & 0xff;
		old |= (this.decryption[9] << 8) & 0xff00;
		old |= (this.decryption[10] << 0x10) & 0xff0000;
		old |= (this.decryption[11] << 0x18) & 0xff000000;
		
		old += size;
		
		this.decryption[8] = (old & 0xff);
		this.decryption[9] = ((old >> 0x08) & 0xff);
		this.decryption[10] = ((old >> 0x10) & 0xff);
		this.decryption[11] = ((old >> 0x18) & 0xff);

		return buffer;
	}
	encrypt(buffer) 
	{
		if (!this.encrypted)
		{
			return buffer;
		}
		
		let a = 0;
		let size = buffer.length;
		for (let i = 0; i < size; i++) {
			let b = buffer[i] & 0xFF;
			a = b ^ this.encryption[i & 15] ^ a;
			buffer[i] = a;
		}
		
		let old = this.encryption[8] & 0xff;
		old |= (this.encryption[9] << 8) & 0xff00;
		old |= (this.encryption[10] << 0x10) & 0xff0000;
		old |= (this.encryption[11] << 0x18) & 0xff000000;
		
		old += size;
		
		this.encryption[8] = (old & 0xff);
		this.encryption[9] = ((old >> 0x08) & 0xff);
		this.encryption[10] = ((old >> 0x10) & 0xff);
		this.encryption[11] = ((old >> 0x18) & 0xff);
		
		return buffer;
	}
	key() 
	{
		this.decrypted = true;
		let key = new Buffer.alloc(8);
		let add = [0xc8, 0x27, 0x93, 0x01, 0xa1, 0x6c, 0x31, 0x97];
		
		this.decryption = new Buffer.alloc(16);
		this.encryption = new Buffer.alloc(16);
		
		for (let  i = 0; i < 8; ++i) 
		{
			key[i] = (Math.random() * 0xFF) & 0xFF;
			this.decryption[i] = key[i];
			this.encryption[i] = key[i];
			this.decryption[i + 8] = add[i];
			this.encryption[i + 8] = add[i];
		}
		return key;
	}
}
module.exports = Crypt;