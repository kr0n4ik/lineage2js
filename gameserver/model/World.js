class World 
{
	constructor() 
	{
		this.map = [];
	}
	add(obj) 
	{
		this.map.push(obj);
	}
	timer()
	{
		for (let obj of this.map)
		{
			if (obj.ai && obj.ai.timer)
			{
				obj.ai.timer(); //в обертку
			}
		}
	}
	read(socket, buffer) 
	{
		for (let client of this.map) 
		{
			if (client.socket && client.socket == socket){
				client.read(buffer);
				return;
			}
		}
		return;
	}
	write(buffer, guid = null) 
	{
		for (let client of world.map) 
		{
			if (client && client.socket && client.online && client.guid != guid) 
			{
				client.write(buffer);
			}
		}
	}
}
let world = new World();
module.exports = world;