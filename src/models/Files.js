var Document = require('camo').Document;
var Version = require('./Version')
export default class File extends Document{
    constructor() {
        super();


        this.name = String
        this.type = String
        this.primary = Number
        this.versions = [Version]
        this.project = Number
        this.fromServer = Boolean
        this.edited = Date
        this.deleted = Date
        this.created = Date
    }

    static collectionName() {
        return 'files';
    }
}

