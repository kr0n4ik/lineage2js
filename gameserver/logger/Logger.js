const config = require("../config");
const ignore = [
];
class Logger 
{
	constructor(title) 
	{
		this.title = title;
	}
	getLogger(title) 
	{
		this.title = title;
	}
	info(text)
	{
		console.log((">> ").green + this.title + " " + text);
	}
	warning(text)
	{
		console.log((">>").red  + this.title + " " + text);
	}
	error(text)
	{
		console.log((">> ").red + this.title + " " + text);
	}
	debug(text)
	{
		if (config.debug)
		{
			console.log((">> ").blue + this.title + " " + text);
		}
	}
}
module.exports = Logger;