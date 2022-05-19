const TableChar = require("../data/TableChar");
const Character = require("./Character");

class Player extends Character {
	constructor(json) {
		super(json);
		this.isOnline = false;
		this.clan = null;
		this.is_gm = false;
		this.isInvisible = false;
	}

	setOnlineStatus(isOnline, updateInDb) {
		if (this.isOnline != isOnline) {
			this.isOnline = isOnline;
		}

		if (updateInDb) {
			TableChar.setOnlineStatus(this.id);
		}
	}

	getClanId() {
		return 0;
	}

	getClan() {
		return this.clan;
	}

	isGM() {
		return this.is_gm;
	}

	isInvisible() {
		return this.isInvisible;
	}

	getPledgeType() {
		return 0;
	}

	getClanPrivileges() {
		return 0;
	}

	getClanCrestLargeId() {
		return 0;
	}

	getClanCrestId() {
		return 0;
	}

	isClanLeader() {
		return true;
	}

	getAllyId() {
		return 0;
	}

	getAllyCrestId() {
		return 0;
	}

	isInMatchingRoom() {
		return false;
	}

	getPvpFlag() {
		return 0;
	}

	getReputation() {
		return this.karma;
	}

	getPkKills() {
		return this.pk;
	}

	getPvpKills() {
		return this.pvp;
	}

	getNobleLevel() {
		return 0;
	}

	isHero() {
		return false;
	}

	isTrueHero() {
		return false;
	}

	getPledgeClass() {
		return 0;
	}

	getRecomLeft() {
		return 0;
	}

	getRecomHave() {
		return 0;
	}

	getTeam() {
		return 0;
	}
}
module.exports = Player;