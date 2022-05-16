class AbstractMaskPacket {

	constructor(masks) {
		this.code = [
			0x80,
			0x40,
			0x20,
			0x10,
			0x08,
			0x04,
			0x02,
			0x01
		];
		this.masks = masks;
	}

	add(mask) {
		this.masks[mask.mask >> 3] |= this.code[mask.mask & 7];
	}

	contains(mask) {
		return (this.masks[mask.mask >> 3] & this.code[mask.mask & 7]) != 0;
	}
}
module.exports = AbstractMaskPacket;