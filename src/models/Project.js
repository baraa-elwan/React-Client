var Document = require('camo').Document;

export default class Project extends Document{
    constructor() {
        super();


        this.primary = Number
        this.name = String
		this.descrption=String
		this.startdate=Date
		this.enddate = Date
		this.status={
			type:String,
			choices:['active','overdue', 'canceled','finished']
		}
		this.fromServer = Boolean
        this.edited = Date
        this.deleted = Date
        this.created = Date
    }

    static collectionName() {
        return 'projects';
    }
}

