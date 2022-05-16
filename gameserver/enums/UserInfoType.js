let UserInfoType = {
	'RELATION': { 'mask': 0x00, 'size': 4 },
	'BASIC_INFO': { 'mask': 0x01, 'size': 16 },
	'BASE_STATS': { 'mask': 0x02, 'size': 18 },
	'MAX_HPCPMP': { 'mask': 0x03, 'size': 14 },
	'CURRENT_HPMPCP_EXP_SP': { 'mask': 0x04, 'size': 38 },
	'ENCHANTLEVEL': { 'mask': 0x05, 'size': 4 },
	'APPAREANCE': { 'mask': 0x06, 'size': 15 },
	'STATUS': { 'mask': 0x07, 'size': 6 },

	'STATS': { 'mask': 0x08, 'size': 56 },
	'ELEMENTALS': { 'mask': 0x09, 'size': 14 },
	'POSITION': { 'mask': 0x0A, 'size': 18 },
	'SPEED': { 'mask': 0x0B, 'size': 18 },
	'MULTIPLIER': { 'mask': 0x0C, 'size': 18 },
	'COL_RADIUS_HEIGHT': { 'mask': 0x0D, 'size': 18 },
	'ATK_ELEMENTAL': { 'mask': 0x0E, 'size': 5 },
	'CLAN': { 'mask': 0x0F, 'size': 32 },

	'SOCIAL': { 'mask': 0x10, 'size': 22 },
	'VITA_FAME': { 'mask': 0x11, 'size': 15 },
	'SLOTS': { 'mask': 0x12, 'size': 9 },
	'MOVEMENTS': { 'mask': 0x13, 'size': 4 },
	'COLOR': { 'mask': 0x14, 'size': 10 },
	'INVENTORY_LIMIT': { 'mask': 0x15, 'size': 9 },
	'TRUE_HERO': { 'mask': 0x16, 'size': 9 }
}
module.exports = UserInfoType;