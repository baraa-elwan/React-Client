var Document = require('camo').Document;
var TaskLog = require('./TaskLog')

export default class Task extends Document{
    constructor() {
        super();


        this.primary = Number
        this.name = String;
        this.description=String
		this.startDate = Date
		this.dueDate=Date
		this.status={
			type:Sequelize.ENUM,
			choices: ['active', 'pending', 'cancelled', 'finished', 'overdue']
        }
        this.project = Number
        this.createdBy = Number
        this.users_assigned_tasks = [Number]
        this.log = [TaskLog]
        this.fromServer = Boolean
        this.edited = Date
        this.deleted = Date
        this.created = Date
    }

    static collectionName() {
        return 'tasks';
    }
}

