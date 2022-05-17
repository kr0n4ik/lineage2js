const data = require("./src/class_list");
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
		if (title.parent != null) {
			title = this.getClassById(data[title.parent].id);
			if (title.parent != null) {
				title = this.getClassById(data[title.parent].id);
				if (title.parent != null) {
					title = this.getClassById(data[title.parent].id);
					if (title.parent != null) {
						title = this.getClassById(data[title.parent].id);
						if (title.parent != null) {
							title = this.getClassById(data[title.parent].id);
							if (title.parent != null) {
								title = this.getClassById(data[title.parent].id);
								if (title.parent != null) {
									title = this.getClassById(data[title.parent].id);
								} else {
									return title;
								}
							} else {
								return title;
							}
						} else {
							return title;
						}
					} else {
						return title;
					}
				} else {
					return title;
				}
			} else {
				return title;
			}
		} else {
			return title;
		}
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