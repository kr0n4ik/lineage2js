const config = require("../../config");
const TableClassList = require("../../data/TableClassList");
const TableExperience = require("../../data/TableExperience");
const ItemGrade = require("../../enums/ItemGrade");
const ZoneId = require("../../enums/ZoneId");
const AttributeType = require("../../enums/AttributeType");
const UserInfoType = require("../../enums/UserInfoType");
const LOGGER = (new (require("../../logger/Logger"))("UserInfo"));

class UserInfo
{
	constructor(cha, all) 
	{
		this.code = [0x80,0x40,0x20,0x10,0x08,0x04,0x02,0x01];
		this.masks = [0x00, 0x00, 0x00];
		this.activeChar = cha;
		this.size = 5;

		this.flRunSpd = 1;
		this.flWalkSpd = 2;

		this.moveMultiplier = this.activeChar.getMovementSpeedMultiplier();
		this.runSpd = Math.round(this.activeChar.getRunSpeed() / this.moveMultiplier);
		this.walkSpd = Math.round(this.activeChar.getWalkSpeed() / this.moveMultiplier);
		this.swimRunSpd = Math.round(this.activeChar.getSwimRunSpeed() / this.moveMultiplier);
		this.swimWalkSpd = Math.round(this.activeChar.getSwimWalkSpeed() / this.moveMultiplier);
		this.flyRunSpd = this.activeChar.isFlying() ? this.runSpd : 8;
		this.flyWalkSpd = this.activeChar.isFlying() ? this.walkSpd : 9;
		this.enchantLevel = 0x00;//this.activeChar.getInventory().getWeaponEnchant();
		this.armorEnchant = 0x00;//this.activeChar.getInventory().getArmorMinEnchant();

		this.title = cha.getTitle();

		if (cha.isGM() && cha.isInvisible()) {
			this.title = "[Invisible]";
		}

		if (all == true) {
			for (let mask in UserInfoType) {
				this.add(UserInfoType[mask]);
			}
		}
	}

	add(data) {
		switch (data.id) {
			case UserInfoType.BASIC_INFO.id:
				{
					this.size += (this.activeChar.getVisibleName().length * 2);
					break;
				}
			case UserInfoType.CLAN.id:
				{
					this.sise += (this.title.length * 2);
					break;
				}
		}
		this.size += data.size;
		this.masks[data.mask >> 3] |= this.code[data.mask & 7];
	}

	write(packet) {
		packet.writeC(0x32);
		packet.writeD(this.activeChar.getId());
		packet.writeD(this.size);
		packet.writeH(23);
		packet.writeB(this.masks);

		if (this.contains(UserInfoType.RELATION))
		{
			packet.writeD(0x00);
		}

		if (this.contains(UserInfoType.BASIC_INFO))
		{
			packet.writeH(16 + (this.activeChar.getVisibleName().length * 2));
			packet.writeT(this.activeChar.getVisibleName());
			packet.writeC(this.activeChar.isGM() ? 0x01 : 0x00);
			packet.writeC(this.activeChar.getRace());
			packet.writeC(this.activeChar.getSex());
			packet.writeD(TableClassList.getRootClassById(this.activeChar.getClassId()).id);
			packet.writeD(this.activeChar.getClassId());
			packet.writeC(this.activeChar.getLevel());
		}

		if (this.contains(UserInfoType.BASE_STATS)) {
			packet.writeH(18);
			packet.writeH(this.activeChar.getSTR());
			packet.writeH(this.activeChar.getDEX());
			packet.writeH(this.activeChar.getCON());
			packet.writeH(this.activeChar.getINT());
			packet.writeH(this.activeChar.getWIT());
			packet.writeH(this.activeChar.getMEN());
			packet.writeH(this.activeChar.getLUC());
			packet.writeH(this.activeChar.getCHA());
		}

		if (this.contains(UserInfoType.MAX_HPCPMP)) //MAX_HPCPMP
		{
			packet.writeH(14);
			packet.writeD(this.activeChar.getHP());
			packet.writeD(this.activeChar.getMP());
			packet.writeD(this.activeChar.getCP());
		}

		if (this.contains(UserInfoType.CURRENT_HPMPCP_EXP_SP)) {
			packet.writeH(38);
			packet.writeD(Math.round(this.activeChar.getHp()));
			packet.writeD(Math.round(this.activeChar.getMp()));
			packet.writeD(Math.round(this.activeChar.getCp()));
			packet.writeQ(this.activeChar.getSp());
			packet.writeQ(this.activeChar.getExp());
			packet.writeF((this.activeChar.getExp() - TableExperience.getExp(this.activeChar.getLevel())) / (TableExperience.getExp(this.activeChar.getLevel() + 1) - TableExperience.getExp(this.activeChar.getLevel())));
		}

		if (this.contains(UserInfoType.ENCHANTLEVEL)) {
			packet.writeH(4);
			packet.writeC(this.enchantLevel);
			packet.writeC(this.armorEnchant);
		}

		if (this.contains(UserInfoType.APPAREANCE)) {
			packet.writeH(15);
			packet.writeD(this.activeChar.getVisualHair());
			packet.writeD(this.activeChar.getVisualHairColor());
			packet.writeD(this.activeChar.getVisualFace());
			packet.writeC(this.activeChar.isHairAccessoryEnabled() ? 0x01 : 0x00);
			console.log(this.activeChar.getVisualHairColor());
		}

		if (this.contains(UserInfoType.STATUS)) {
			packet.writeH(6);
			packet.writeC(this.activeChar.getMountType());
			packet.writeC(this.activeChar.getPrivateStoreType());
			packet.writeC(this.activeChar.getCrystallizeGrade() != ItemGrade.NONE ? 1 : 0);
			packet.writeC(this.activeChar.getAbilityPoints() - this.activeChar.getAbilityPointsUsed());
		}

		if (this.contains(UserInfoType.STATS)) {
			packet.writeH(56);
			packet.writeH(this.activeChar.getActiveWeaponItem() != null ? 40 : 20);
			packet.writeD(this.activeChar.getPAtk());
			packet.writeD(this.activeChar.getPAtkSpd());
			packet.writeD(this.activeChar.getPDef());
			packet.writeD(this.activeChar.getEvasionRate());
			packet.writeD(this.activeChar.getAccuracy());
			packet.writeD(this.activeChar.getCriticalHit());
			packet.writeD(this.activeChar.getMAtk());
			packet.writeD(this.activeChar.getMAtkSpd());
			packet.writeD(this.activeChar.getPAtkSpd()); // Seems like atk speed - 1
			packet.writeD(this.activeChar.getMagicEvasionRate());
			packet.writeD(this.activeChar.getMDef());
			packet.writeD(this.activeChar.getMagicAccuracy());
			packet.writeD(this.activeChar.getMCriticalHit());
		}

		if (this.contains(UserInfoType.ELEMENTALS)) {
			packet.writeH(14);
			packet.writeH(this.activeChar.getDefenseElementValue( AttributeType.FIRE));
			packet.writeH(this.activeChar.getDefenseElementValue(AttributeType.WATER));
			packet.writeH(this.activeChar.getDefenseElementValue(AttributeType.WIND));
			packet.writeH(this.activeChar.getDefenseElementValue(AttributeType.EARTH));
			packet.writeH(this.activeChar.getDefenseElementValue(AttributeType.HOLY));
			packet.writeH(this.activeChar.getDefenseElementValue(AttributeType.DARK));
		}

		if (this.contains(UserInfoType.POSITION)) {
			packet.writeH(18);
			packet.writeD(this.activeChar.getX());
			packet.writeD(this.activeChar.getY());
			packet.writeD(this.activeChar.getZ());
			packet.writeD(this.activeChar.isInVehicle() ? this.activeChar.getVehicle().getObjectId() : 0);
		}

		if (this.contains(UserInfoType.SPEED)) {
			packet.writeH(18);
			packet.writeH(this.runSpd);
			packet.writeH(this.walkSpd);
			packet.writeH(this.swimRunSpd);
			packet.writeH(this.swimWalkSpd);
			packet.writeH(this.flRunSpd);
			packet.writeH(this.flWalkSpd);
			packet.writeH(this.flyRunSpd);
			packet.writeH(this.flyWalkSpd);
		}

		if (this.contains(UserInfoType.MULTIPLIER)) {
			packet.writeH(18);
			packet.writeF(this.moveMultiplier);
			packet.writeF(this.activeChar.getAttackSpeedMultiplier());
		}

		if (this.contains(UserInfoType.COL_RADIUS_HEIGHT)) {
			packet.writeH(18);
			packet.writeF(this.activeChar.getCollisionRadius());
			packet.writeF(this.activeChar.getCollisionHeight());
		}

		if (this.contains(UserInfoType.ATK_ELEMENTAL)) {
			packet.writeH(5);
			let attackAttribute = this.activeChar.getAttackElement();
			packet.writeC(0);
			packet.writeH(0);
		}

		if (this.contains(UserInfoType.CLAN)) {
			packet.writeH(32 + (this.title.length * 2));
			packet.writeT(this.title);
			packet.writeH(this.activeChar.getPledgeType());
			packet.writeD(this.activeChar.getClanId());
			packet.writeD(this.activeChar.getClanCrestLargeId());
			packet.writeD(this.activeChar.getClanCrestId());
			packet.writeD(this.activeChar.getClanPrivileges());
			packet.writeC(this.activeChar.isClanLeader() ? 0x01 : 0x00);
			packet.writeD(this.activeChar.getAllyId());
			packet.writeD(this.activeChar.getAllyCrestId());
			packet.writeC(this.activeChar.isInMatchingRoom() ? 0x01 : 0x00);
		}

		if (this.contains(UserInfoType.SOCIAL)) {
			packet.writeH(22);
			packet.writeC(this.activeChar.getPvpFlag());
			packet.writeD(this.activeChar.getReputation()); // Reputation
			packet.writeC(this.activeChar.getNobleLevel());
			packet.writeC(this.activeChar.isHero() || (this.activeChar.isGM() && config.gm_hero_aura) ? 1 : 0);
			packet.writeC(this.activeChar.getPledgeClass());
			packet.writeD(this.activeChar.getPkKills());
			packet.writeD(this.activeChar.getPvpKills());
			packet.writeH(this.activeChar.getRecomLeft());
			packet.writeH(this.activeChar.getRecomHave());
		}

		if (this.contains(UserInfoType.VITA_FAME)) {
			packet.writeH(15);
			packet.writeD(this.activeChar.getVitalityPoints());
			packet.writeC(0x00); // Vita Bonus
			packet.writeD(this.activeChar.getFame());
			packet.writeD(this.activeChar.getRaidbossPoints());
		}

		if (this.contains(UserInfoType.SLOTS)) {
			packet.writeH(9);
			packet.writeC(this.activeChar.getInventory().getTalismanSlots()); // Confirmed
			packet.writeC(this.activeChar.getInventory().getBroochJewelSlots()); // Confirmed
			packet.writeC(this.activeChar.getTeam()); // Confirmed
			packet.writeC(0x00); // (1 = Red, 2 = White, 3 = White Pink) dotted ring on the floor
			packet.writeC(0x00);
			packet.writeC(0x00);
			packet.writeC(0x00);
		}

		if (this.contains(UserInfoType.MOVEMENTS)) {
			packet.writeH(4);
			packet.writeC(this.activeChar.isInsideZone(ZoneId.WATER) ? 1 : this.activeChar.isFlyingMounted() ? 2 : 0);
			packet.writeC(this.activeChar.isRunning() ? 0x01 : 0x00);
		}

		if (this.contains(UserInfoType.COLOR)) {
			packet.writeH(10);
			packet.writeD(this.activeChar.getNameColor());
			packet.writeD(this.activeChar.getTitleColor());
		}

		if (this.contains(UserInfoType.INVENTORY_LIMIT)) {
			packet.writeH(9);
			packet.writeH(0x00);
			packet.writeH(0x00);
			packet.writeH(this.activeChar.getInventoryLimit());
			packet.writeC(0);//_activeChar.isCursedWeaponEquipped() ? CursedWeaponsManager.getInstance().getLevel(_activeChar.getCursedWeaponEquippedId()) : 0);
		}

		if (this.contains(UserInfoType.TRUE_HERO)) {
			packet.writeH(9);
			packet.writeD(0x00);
			packet.writeH(0x00);
			packet.writeC(this.activeChar.isTrueHero() ? 100 : 0x00);
		}
	}


	contains(data) {
		return (this.masks[data.mask >> 3] & this.code[data.mask & 7]) != 0;
	}

}
module.exports = UserInfo;