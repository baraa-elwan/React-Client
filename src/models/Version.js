var EmbeddedDocument = require('camo').EmbeddedDocument;

export default class Versions extends EmbeddedDocument{
    constructor() {
        super();

        this.name = String
        this.primary =  Number
		this.size= Number
		this.versionNo =Number
        this.path =String
        this.user = Number
        this.fromServer = Boolean
        this.edited = Date
        this.deleted = Date
        this.created = Date
    }

    static collectionName() {
        return 'versions';
    }
}

