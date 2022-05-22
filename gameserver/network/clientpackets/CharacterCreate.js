const Generator = require("../../../commons/generator/Generator");
const TableBaseStats = require("../../data/TableBaseStats");
const TableChar = require("../../data/TableChar");
const TableInitialEquipment = require("../../data/TableInitialEquipment");
const CharCreateOk = require("../serverpackets/CharCreateFail");
const CharCreateFail = require("../serverpackets/CharCreateFail");

const LOGGER = (new (require("../../logger/Logger"))("CharacterCreate"));

class CharacterCreate
{
	run(client, packet) 
	{
		let name = packet.readS();
		let race = packet.readD();
		let sex = packet.readD();
		let classId = packet.readD();
		let int = packet.readD();
		let str = packet.readD();
		let con = packet.readD();
		let men = packet.readD();
		let dex = packet.readD();
		let wit = packet.readD();
		let hairStyle = packet.readD();
		let hairColor = packet.readD();
		let face = packet.readD();

		if ((name.length < 1) || (name.length > 16)) {
			client.write(new CharCreateFail(CharCreateFail.REASON_16_ENG_CHARS));
			return;
		}

		if ((face > 2) || (face < 0)) {
			LOGGER.warning("Character Creation Failure: Character face " + face + " is invalid. Possible client hack. ");

			client.write(new CharCreateFail(CharCreateFail.REASON_CREATION_FAILED));
			return;
		}

		if ((hairStyle < 0) || ((sex == 0) && (hairStyle > 4)) || ((sex != 0) && (hairStyle > 6))) {
			LOGGER.warning("Character Creation Failure: Character hair style " + hairStyle + " is invalid. Possible client hack. ");

			client.write(new CharCreateFail(CharCreateFail.REASON_CREATION_FAILED));
			return;
		}

		if ((hairColor > 3) || (hairColor < 0)) {
			LOGGER.warning("Character Creation Failure: Character hair color " + hairColor + " is invalid. Possible client hack. ");

			client.write(new CharCreateFail(CharCreateFail.REASON_CREATION_FAILED));
		}

		let stats = TableBaseStats.getStatsById(classId);
		let rndPosition = Math.round(Math.random() * (stats.staticData.creationPoints.length - 1));
		let HP = stats.lvlUpgainData[1].hp;
		let MP = stats.lvlUpgainData[1].mp;

		

		let json = {};
		json.account = client.getAccountName();
		json.id = Generator.getNextId();
		json.name = name;
		json.race = race;
		json.baseclass = classId;
		json.classid = classId;
		json.sex = sex;
		json.x = parseFloat(stats.staticData.creationPoints[rndPosition].x);
		json.y = parseFloat(stats.staticData.creationPoints[rndPosition].y);
		json.z = parseFloat(stats.staticData.creationPoints[rndPosition].z);
		json.level = 1;
		json.hp = HP;
		json.HP = HP;
		json.mp = MP;
		json.MP = MP;
		json.sp = 0;
		json.exp = 0;
		json.karma = 0;
		json.pk = 0;
		json.pvp = 0;
		json.face = face;
		json.hair_style = hairStyle;
		json.hair_color = hairColor;
		json.vp = 0;
		json.cp = 0;
		json.CP = 0;
		json.deletetime = 0;
		json.last = Date.now();
		json.nobless = 0;
		json.access = Date.now();

		let initialItems = TableInitialEquipment.getEquipmentList(classId);

		json.inventory = initialItems;

		TableChar.createCharacter(json);

		client.write(CharCreateOk.STATIC_PACKET);
	}
}
module.exports = CharacterCreate;