const Race = require('../enums/Race');
const data = {
	'fighter': { 'id': 0, 'mage': false, 'race': Race.HUMAN, 'parent': null },
	'warrior': { 'id': 1, 'mage': false, 'race': Race.HUMAN, 'parent': 'fighter' },
	'gladiator': { 'id': 2, 'mage': false, 'race': Race.HUMAN, 'parent': 'warrior' },
	'warlord': { 'id': 3, 'mage': false, 'race': Race.HUMAN, 'parent': 'warrior' },
	'knight': { 'id': 4, 'mage': false, 'race': Race.HUMAN, 'parent': 'fighter' },
	'paladin': { 'id': 5, 'mage': false, 'race': Race.HUMAN, 'parent': 'knight' },
	'dark_avenger': { 'id': 6, 'mage': false, 'race': Race.HUMAN, 'parent': 'knight' },
	'rogue': { 'id': 7, 'mage': false, 'race': Race.HUMAN, 'parent': 'fighter' },
	'treasure_hunter': { 'id': 8, 'mage': false, 'race': Race.HUMAN, 'parent': 'rogue' },
	'hawkeye': { 'id': 9, 'mage': false, 'race': Race.HUMAN, 'parent': 'rogue' },
	'mage': { 'id': 10, 'mage': true, 'race': Race.HUMAN, 'parent': null },
	'wizard': { 'id': 11, 'mage': true, 'race': Race.HUMAN, 'parent': 'mage' },
	'sorcerer': { 'id': 12, 'mage': true, 'race': Race.HUMAN, 'parent': 'wizard' },
	'necromancer': { 'id': 13, 'mage': true, 'race': Race.HUMAN, 'parent': 'wizard' },
	'warlock': { 'id': 14, 'mage': true, 'race': Race.HUMAN, 'parent': 'wizard' },
	'cleric': { 'id': 15, 'mage': true, 'race': Race.HUMAN, 'parent': 'mage' },
	'bishop': { 'id': 16, 'mage': true, 'race': Race.HUMAN, 'parent': 'cleric' },
	'prophet': { 'id': 17, 'mage': true, 'race': Race.HUMAN, 'parent': 'cleric' },
	'elven_fighter': { 'id': 18, 'mage': false, 'race': Race.ELF, 'parent': null },
	'elven_knight': { 'id': 19, 'mage': false, 'race': Race.ELF, 'parent': 'elven_fighter' },
	'temple_knight': { 'id': 20, 'mage': false, 'race': Race.ELF, 'parent': 'elven_knight' },
	'swordsinger': { 'id': 21, 'mage': false, 'race': Race.ELF, 'parent': 'elven_knight' },
	'elven_scout': { 'id': 22, 'mage': false, 'race': Race.ELF, 'parent': 'elven_fighter' },
	'plains_walker': { 'id': 23, 'mage': false, 'race': Race.ELF, 'parent': 'elven_scout' },
	'silver_ranger': { 'id': 24, 'mage': false, 'race': Race.ELF, 'parent': 'elven_scout' },
	'elven_mage': { 'id': 25, 'mage': true, 'race': Race.ELF, 'parent': null },
	'elven_wizard': { 'id': 26, 'mage': true, 'race': Race.ELF, 'parent': 'elven_mage' },
	'spellsinger': { 'id': 27, 'mage': true, 'race': Race.ELF, 'parent': 'elven_wizard' },
	'elemental_summoner': { 'id': 28, 'mage': true, 'race': Race.ELF, 'parent': 'elven_wizard' },
	'oracle': { 'id': 29, 'mage': true, 'race': Race.ELF, 'parent': 'elven_mage' },
	'elder': { 'id': 30, 'mage': true, 'race': Race.ELF, 'parent': 'oracle' },
	'dark_fighter': { 'id': 31, 'mage': false, 'race': Race.DARK_ELF, 'parent': null },
	'palus_knight': { 'id': 32, 'mage': false, 'race': Race.DARK_ELF, 'parent': 'dark_fighter' },
	'shillien_knight': { 'id': 33, 'mage': false, 'race': Race.DARK_ELF, 'parent': 'palus_knight' },
	'bladedancer': { 'id': 34, 'mage': false, 'race': Race.DARK_ELF, 'parent': 'palus_knight' },
	'assassin': { 'id': 35, 'mage': false, 'race': Race.DARK_ELF, 'parent': 'dark_fighter' },
	'abyss_walker': { 'id': 36, 'mage': false, 'race': Race.DARK_ELF, 'parent': 'assassin' },
	'phantom_ranger': { 'id': 37, 'mage': false, 'race': Race.DARK_ELF, 'parent': 'assassin' },
	'dark_mage': { 'id': 38, 'mage': true, 'race': Race.DARK_ELF, 'parent': null },
	'dark_wizard': { 'id': 39, 'mage': true, 'race': Race.DARK_ELF, 'parent': 'dark_mage' },
	'spellhowler': { 'id': 40, 'mage': true, 'race': Race.DARK_ELF, 'parent': 'dark_wizard' },
	'phantom_summoner': { 'id': 41, 'mage': true, 'race': Race.DARK_ELF, 'parent': 'dark_wizard' },
	'shillien_oracle': { 'id': 42, 'mage': true, 'race': Race.DARK_ELF, 'parent': 'dark_mage' },
	'shillien_elder': { 'id': 43, 'mage': true, 'race': Race.DARK_ELF, 'parent': 'shillien_oracle' },
	'orc_fighter': { 'id': 44, 'mage': false, 'race': Race.ORC, 'parent': null },
	'orc_raider': { 'id': 45, 'mage': false, 'race': Race.ORC, 'parent': 'orc_fighter' },
	'destroyer': { 'id': 46, 'mage': false, 'race': Race.ORC, 'parent': 'orc_raider' },
	'orc_monk': { 'id': 47, 'mage': false, 'race': Race.ORC, 'parent': 'orc_fighter' },
	'tyrant': { 'id': 48, 'mage': false, 'race': Race.ORC, 'parent': 'orc_monk' },
	'orc_mage': { 'id': 49, 'mage': true, 'race': Race.ORC, 'parent': null },
	'orc_shaman': { 'id': 50, 'mage': true, 'race': Race.ORC, 'parent': 'orc_mage' },
	'overlord': { 'id': 51, 'mage': true, 'race': Race.ORC, 'parent': 'orc_shaman' },
	'warcryer': { 'id': 52, 'mage': true, 'race': Race.ORC, 'parent': 'orc_shaman' },
	'dwarven_fighter': { 'id': 53, 'mage': false, 'race': Race.DWARF, 'parent': null },
	'scavenger': { 'id': 54, 'mage': false, 'race': Race.DWARF, 'parent': 'dwarven_fighter' },
	'bounty_hunter': { 'id': 55, 'mage': false, 'race': Race.DWARF, 'parent': 'scavenger' },
	'artisan': { 'id': 56, 'mage': false, 'race': Race.DWARF, 'parent': 'dwarven_fighter' },
	'warsmith': { 'id': 57, 'mage': false, 'race': Race.DWARF, 'parent': 'artisan' },
	'dummy_entry_1': { 'id': 58, 'mage': false, 'race': null, 'parent': null },
	'dummy_entry_2': { 'id': 59, 'mage': false, 'race': null, 'parent': null },
	'dummy_entry_3': { 'id': 60, 'mage': false, 'race': null, 'parent': null },
	'dummy_entry_4': { 'id': 61, 'mage': false, 'race': null, 'parent': null },
	'dummy_entry_5': { 'id': 62, 'mage': false, 'race': null, 'parent': null },
	'dummy_entry_6': { 'id': 63, 'mage': false, 'race': null, 'parent': null },
	'dummy_entry_7': { 'id': 64, 'mage': false, 'race': null, 'parent': null },
	'dummy_entry_8': { 'id': 65, 'mage': false, 'race': null, 'parent': null },
	'dummy_entry_9': { 'id': 66, 'mage': false, 'race': null, 'parent': null },
	'dummy_entry_10': { 'id': 67, 'mage': false, 'race': null, 'parent': null },
	'dummy_entry_11': { 'id': 68, 'mage': false, 'race': null, 'parent': null },
	'dummy_entry_12': { 'id': 69, 'mage': false, 'race': null, 'parent': null },
	'dummy_entry_13': { 'id': 70, 'mage': false, 'race': null, 'parent': null },
	'dummy_entry_14': { 'id': 71, 'mage': false, 'race': null, 'parent': null },
	'dummy_entry_15': { 'id': 72, 'mage': false, 'race': null, 'parent': null },
	'dummy_entry_16': { 'id': 73, 'mage': false, 'race': null, 'parent': null },
	'dummy_entry_17': { 'id': 74, 'mage': false, 'race': null, 'parent': null },
	'dummy_entry_18': { 'id': 75, 'mage': false, 'race': null, 'parent': null },
	'dummy_entry_19': { 'id': 76, 'mage': false, 'race': null, 'parent': null },
	'dummy_entry_20': { 'id': 77, 'mage': false, 'race': null, 'parent': null },
	'dummy_entry_21': { 'id': 78, 'mage': false, 'race': null, 'parent': null },
	'dummy_entry_22': { 'id': 79, 'mage': false, 'race': null, 'parent': null },
	'dummy_entry_23': { 'id': 80, 'mage': false, 'race': null, 'parent': null },
	'dummy_entry_24': { 'id': 81, 'mage': false, 'race': null, 'parent': null },
	'dummy_entry_25': { 'id': 82, 'mage': false, 'race': null, 'parent': null },
	'dummy_entry_26': { 'id': 83, 'mage': false, 'race': null, 'parent': null },
	'dummy_entry_27': { 'id': 84, 'mage': false, 'race': null, 'parent': null },
	'dummy_entry_28': { 'id': 85, 'mage': false, 'race': null, 'parent': null },
	'dummy_entry_29': { 'id': 86, 'mage': false, 'race': null, 'parent': null },
	'dummy_entry_30': { 'id': 87, 'mage': false, 'race': null, 'parent': null },
	'duelist': { 'id': 88, 'mage': false, 'race': Race.HUMAN, 'parent': 'gladiator' },
	'dreadnought': { 'id': 89, 'mage': false, 'race': Race.HUMAN, 'parent': 'warlord' },
	'phoenix_knight': { 'id': 90, 'mage': false, 'race': Race.HUMAN, 'parent': 'paladin' },
	'hell_knight': { 'id': 91, 'mage': false, 'race': Race.HUMAN, 'parent': 'dark_avenger' },
	'sagittarius': { 'id': 92, 'mage': false, 'race': Race.HUMAN, 'parent': 'hawkeye' },
	'adventurer': { 'id': 93, 'mage': false, 'race': Race.HUMAN, 'parent': 'treasure_hunter' },
	'archmage': { 'id': 94, 'mage': true, 'race': Race.HUMAN, 'parent': 'sorcerer' },
	'soultaker': { 'id': 95, 'mage': true, 'race': Race.HUMAN, 'parent': 'necromancer' },
	'arcana_lord': { 'id': 96, 'mage': true, 'race': Race.HUMAN, 'parent': 'warlock' },
	'cardinal': { 'id': 97, 'mage': true, 'race': Race.HUMAN, 'parent': 'bishop' },
	'hierophant': { 'id': 98, 'mage': true, 'race': Race.HUMAN, 'parent': 'prophet' },
	'eva_templar': { 'id': 99, 'mage': false, 'race': Race.ELF, 'parent': 'temple_knight' },
	'sword_muse': { 'id': 100, 'mage': false, 'race': Race.ELF, 'parent': 'swordsinger' },
	'wind_rider': { 'id': 101, 'mage': false, 'race': Race.ELF, 'parent': 'plains_walker' },
	'moonlight_sentinel': { 'id': 102, 'mage': false, 'race': Race.ELF, 'parent': 'silver_ranger' },
	'mystic_muse': { 'id': 103, 'mage': true, 'race': Race.ELF, 'parent': 'spellsinger' },
	'elemental_master': { 'id': 104, 'mage': true, 'race': Race.ELF, 'parent': 'elemental_summoner' },
	'eva_saint': { 'id': 105, 'mage': true, 'race': Race.ELF, 'parent': 'elder' },
	'shillien_templar': { 'id': 106, 'mage': false, 'race': Race.DARK_ELF, 'parent': 'shillien_knight' },
	'spectral_dancer': { 'id': 107, 'mage': false, 'race': Race.DARK_ELF, 'parent': 'bladedancer' },
	'ghost_hunter': { 'id': 108, 'mage': false, 'race': Race.DARK_ELF, 'parent': 'abyss_walker' },
	'ghost_sentinel': { 'id': 109, 'mage': false, 'race': Race.DARK_ELF, 'parent': 'phantom_ranger' },
	'storm_screamer': { 'id': 110, 'mage': true, 'race': Race.DARK_ELF, 'parent': 'spellhowler' },
	'spectral_master': { 'id': 111, 'mage': true, 'race': Race.DARK_ELF, 'parent': 'phantom_summoner' },
	'shillien_saint': { 'id': 112, 'mage': true, 'race': Race.DARK_ELF, 'parent': 'shillien_elder' },
	'titan': { 'id': 113, 'mage': false, 'race': Race.ORC, 'parent': 'destroyer' },
	'grand_khavatari': { 'id': 114, 'mage': false, 'race': Race.ORC, 'parent': 'tyrant' },
	'dominator': { 'id': 115, 'mage': true, 'race': Race.ORC, 'parent': 'overlord' },
	'doomcryer': { 'id': 116, 'mage': true, 'race': Race.ORC, 'parent': 'warcryer' },
	'fortune_seeker': { 'id': 117, 'mage': false, 'race': Race.DWARF, 'parent': 'bounty_hunter' },
	'maestro': { 'id': 118, 'mage': false, 'race': Race.DWARF, 'parent': 'warsmith' },
	'dummy_entry_31': { 'id': 119, 'mage': false, 'race': null, 'parent': null },
	'dummy_entry_32': { 'id': 120, 'mage': false, 'race': null, 'parent': null },
	'dummy_entry_33': { 'id': 121, 'mage': false, 'race': null, 'parent': null },
	'dummy_entry_34': { 'id': 122, 'mage': false, 'race': null, 'parent': null },
	'male_soldier': { 'id': 123, 'mage': false, 'race': Race.KAMAEL, 'parent': null },
	'female_soldier': { 'id': 124, 'mage': false, 'race': Race.KAMAEL, 'parent': null },
	'trooper': { 'id': 125, 'mage': false, 'race': Race.KAMAEL, 'parent': 'male_soldier' },
	'warder': { 'id': 126, 'mage': false, 'race': Race.KAMAEL, 'parent': 'female_soldier' },
	'berserker': { 'id': 127, 'mage': false, 'race': Race.KAMAEL, 'parent': 'trooper' },
	'male_soulbreaker': { 'id': 128, 'mage': false, 'race': Race.KAMAEL, 'parent': 'trooper' },
	'female_soulbreaker': { 'id': 129, 'mage': false, 'race': Race.KAMAEL, 'parent': 'warder' },
	'arbalester': { 'id': 130, 'mage': false, 'race': Race.KAMAEL, 'parent': 'warder' },
	'doombringer': { 'id': 131, 'mage': false, 'race': Race.KAMAEL, 'parent': 'berserker' },
	'male_soul_hound': { 'id': 132, 'mage': false, 'race': Race.KAMAEL, 'parent': 'male_soulbreaker' },
	'female_soul_hound': { 'id': 133, 'mage': false, 'race': Race.KAMAEL, 'parent': 'female_soulbreaker' },
	'trickster': { 'id': 134, 'mage': false, 'race': Race.KAMAEL, 'parent': 'arbalester' },
	'inspector': { 'id': 135, 'mage': false, 'race': Race.KAMAEL, 'parent': 'warder' },
	'judicator': { 'id': 136, 'mage': false, 'race': Race.KAMAEL, 'parent': 'inspector' },
	'dummy_entry_35': { 'id': 137, 'mage': false, 'race': null, 'parent': null },
	'dummy_entry_36': { 'id': 138, 'mage': false, 'race': null, 'parent': null },
	'sigel_knight': { 'id': 139, 'mage': false, 'race': null, 'parent': null },
	'tyrr_warrior': { 'id': 140, 'mage': false, 'race': null, 'parent': null },
	'othell_rogue': { 'id': 141, 'mage': false, 'race': null, 'parent': null },
	'yul_archer': { 'id': 142, 'mage': false, 'race': null, 'parent': null },
	'feoh_wizard': { 'id': 143, 'mage': false, 'race': null, 'parent': null },
	'iss_enchanter': { 'id': 144, 'mage': false, 'race': null, 'parent': null },
	'wynn_summoner': { 'id': 145, 'mage': false, 'race': null, 'parent': null },
	'aeore_healer': { 'id': 146, 'mage': false, 'race': null, 'parent': null },
	'dummy_entry_37': { 'id': 147, 'mage': false, 'race': null, 'parent': null },
	'sigel_phoenix_knight': { 'id': 148, 'mage': false, 'race': Race.HUMAN, 'parent': 'phoenix_knight' },
	'sigel_hell_knight': { 'id': 149, 'mage': false, 'race': Race.HUMAN, 'parent': 'hell_knight' },
	'sigel_eva_templar': { 'id': 150, 'mage': false, 'race': Race.ELF, 'parent': 'eva_templar' },
	'sigel_shillien_templar': { 'id': 151, 'mage': false, 'race': Race.DARK_ELF, 'parent': 'shillien_templar' },
	'tyrr_duelist': { 'id': 152, 'mage': false, 'race': Race.HUMAN, 'parent': 'duelist' },
	'tyrr_dreadnought': { 'id': 153, 'mage': false, 'race': Race.HUMAN, 'parent': 'dreadnought' },
	'tyrr_titan': { 'id': 154, 'mage': false, 'race': Race.ORC, 'parent': 'titan' },
	'tyrr_grand_khavatari': { 'id': 155, 'mage': false, 'race': Race.ORC, 'parent': 'grand_khavatari' },
	'tyrr_maestro': { 'id': 156, 'mage': false, 'race': Race.DWARF, 'parent': 'maestro' },
	'tyrr_doombringer': { 'id': 157, 'mage': false, 'race': Race.KAMAEL, 'parent': 'doombringer' },
	'othell_adventurer': { 'id': 158, 'mage': false, 'race': Race.HUMAN, 'parent': 'adventurer' },
	'othell_wind_rider': { 'id': 159, 'mage': false, 'race': Race.ELF, 'parent': 'wind_rider' },
	'othell_ghost_hunter': { 'id': 160, 'mage': false, 'race': Race.DARK_ELF, 'parent': 'ghost_hunter' },
	'othell_fortune_seeker': { 'id': 161, 'mage': false, 'race': Race.DWARF, 'parent': 'fortune_seeker' },
	'yul_sagittarius': { 'id': 162, 'mage': false, 'race': Race.HUMAN, 'parent': 'sagittarius' },
	'yul_moonlight_sentinel': { 'id': 163, 'mage': false, 'race': Race.ELF, 'parent': 'moonlight_sentinel' },
	'yul_ghost_sentinel': { 'id': 164, 'mage': false, 'race': Race.DARK_ELF, 'parent': 'ghost_sentinel' },
	'yul_trickster': { 'id': 165, 'mage': false, 'race': Race.KAMAEL, 'parent': 'trickster' },
	'feoh_archmage': { 'id': 166, 'mage': true, 'race': Race.HUMAN, 'parent': 'archmage' },
	'feoh_soultaker': { 'id': 167, 'mage': true, 'race': Race.HUMAN, 'parent': 'soultaker' },
	'feoh_mystic_muse': { 'id': 168, 'mage': true, 'race': Race.ELF, 'parent': 'mystic_muse' },
	'feoh_storm_screamer': { 'id': 169, 'mage': true, 'race': Race.DARK_ELF, 'parent': 'storm_screamer' },
	'feoh_soul_hound': { 'id': 170, 'mage': true, 'race': Race.KAMAEL, 'parent': 'male_soul_hound' }, // fix me ?
	'iss_hierophant': { 'id': 171, 'mage': true, 'race': Race.HUMAN, 'parent': 'hierophant' },
	'iss_sword_muse': { 'id': 172, 'mage': false, 'race': Race.ELF, 'parent': 'sword_muse' },
	'iss_spectral_dancer': { 'id': 173, 'mage': false, 'race': Race.DARK_ELF, 'parent': 'spectral_dancer' },
	'iss_dominator': { 'id': 174, 'mage': true, 'race': Race.ORC, 'parent': 'dominator' },
	'iss_doomcryer': { 'id': 175, 'mage': true, 'race': Race.ORC, 'parent': 'doomcryer' },
	'wynn_arcana_lord': { 'id': 176, 'mage': true, 'race': Race.HUMAN, 'parent': 'arcana_lord' },
	'wynn_elemental_master': { 'id': 177, 'mage': true, 'race': Race.ELF, 'parent': 'elemental_master' },
	'wynn_spectral_master': { 'id': 178, 'mage': true, 'race': Race.DARK_ELF, 'parent': 'spectral_master' },
	'aeore_cardinal': { 'id': 179, 'mage': true, 'race': Race.HUMAN, 'parent': 'cardinal' },
	'aeore_eva_saint': { 'id': 180, 'mage': true, 'race': Race.ELF, 'parent': 'eva_saint' },
	'aeore_shillien_saint': { 'id': 181, 'mage': true, 'race': Race.DARK_ELF, 'parent': 'shillien_saint' },
	'ertheia_fighter': { 'id': 182, 'mage': false, 'race': Race.ERTHEIA, 'parent': null },
	'ertheia_wizard': { 'id': 183, 'mage': true, 'race': Race.ERTHEIA, 'parent': null },
	'marauder': { 'id': 184, 'mage': false, 'race': Race.ERTHEIA, 'parent': 'ertheia_fighter' },
	'cloud_breaker': { 'id': 185, 'mage': true, 'race': Race.ERTHEIA, 'parent': 'ertheia_wizard' },
	'ripper': { 'id': 186, 'mage': false, 'race': Race.ERTHEIA, 'parent': 'marauder' },
	'stratomancer': { 'id': 187, 'mage': true, 'race': Race.ERTHEIA, 'parent': 'cloud_breaker' },
	'eviscerator': { 'id': 188, 'mage': false, 'race': Race.ERTHEIA, 'parent': 'ripper' },
	'sayha_seer': { 'id': 189, 'mage': true, 'race': Race.ERTHEIA, 'parent': 'stratomancer' }
};

class TableClassList
{
	getClassById(id) {
		for (let key in data) {
			if (data[key].id == id) {
				return data[key];
			}
		}
		return null;
	}
	
	getRootClassById(id)
	{
		let title = this.getClassById(id);
		if (title == null) {
			return null;
		}
		if (title.parent == null) 
		{
			return title;
		}
		return this.getRootClassById(data[title.parent].id);
	}

	getRandomClass() {
		for (let i = 0; i < 100; i++) {
			let id = Math.round(Math.random() * 189);
			let classid = this.getClassById(id);
			if (classid != null && classid.race != null && classid.parent != null) {
				return classid;
			}
		}
		return null;
	}
}
module.exports = new TableClassList();