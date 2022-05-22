class Generator 
{
	constructor() 
	{
		this.ids = [];
		
	}
	
	getNextId()
	{
		for (let i = 0; i < 100; ++i)
		{
			let id = Math.floor(Math.random() * 0x7FFFFFFF);
			if (!this.ids.includes(id))
			{
				this.ids.push(id);
				return id;
			}
		}
		return null;
	}
	
	addId(id)
	{
		if (!this.ids.includes(id))
		{
			this.ids.push(id);
		}
	}
}
module.exports = new Generator();