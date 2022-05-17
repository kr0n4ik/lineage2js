const data = require("./src/experience");
class TableExperience
{
	getExp(id)
	{
		return data[id].exp;
	}
	
	getRate(id)
	{
		return data[id].rate;
	}
}
module.exports = new TableExperience();