var EmbeddedDocument = require('camo').EmbeddedDocument;

export default class TaskLog extends EmbeddedDocument{
    constructor() {
        super();


        this.primary = Number

		this.status={
			type:Sequelize.ENUM,
			values: ['active', 'pending', 'cancelled', 'finished', 'overdue']
		},
		this.date=Date
        this.fromServer = Boolean
        this.edited = Date
        this.deleted = Date
        this.created = Date
    }

    static collectionName() {
        return 'tasklogs';
    }
}

