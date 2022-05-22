const crypto = require("crypto");
const fs = require("fs");
const Generator = require("../../commons/generator/Generator");
const LOGGER = (new (require("../logger/Logger"))("TableChar"));
const TableBaseStats = require("./TableBaseStats");


class TableChar
{
	constructor()
	{
		this.characters = JSON.parse(fs.readFileSync("cache/characters.json", "utf8"));
	}

	getCharacters(account) {
		let chracters = [];
		for (let chr of this.characters) {
			if (chr.account == account) {
				chracters.push(chr);
			}
		}
		return chracters;
	}

	getCharacterById(id) {
		for (let chr of this.characters) {
			if (chr.id == id) {
				return chr;
			}
		}
		return null;
	}

	getIdByName(name) {
		for (let chr of this.characters) {
			if (chr.name == name) {
				return chr.id;
			}
		}
		return null;
	}

	createCharacter(json) {
		this.characters.push(json);
		this.saveCache();
	}

	deleteCharacter(account, slot) {
		
	}

	setOnlineStatus(id) {
		let col = this.getCharacterById(id);
		if (col != null) {
			col.last = Date.now();
			col.online = true;
		}
	}

	saveCache() {
		fs.writeFileSync("cache/characters.json", JSON.stringify(this.characters));
	}
}
module.exports = new TableChar;