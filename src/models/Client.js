var Document = require('camo').Document;

export default class Client extends Document{
    constructor() {
        super();

        this.primary = Number
        this.name = String
        this.email = String
        this.address = String
        this.phone = String
        this.mobile = String
        this.info = String
        this.branch = Number
        this.fromServer = Boolean
        this.edited = Date
        this.deleted = Date
        this.created = Date
        
    }

    static collectionName() {
        return 'clients';
    }
}

