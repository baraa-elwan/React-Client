var connect = require('camo').connect;
 
var Client = require('./Client')
var Project = require('./Project')
var File = require('./File')
var Version = require('./Version')
var Task = require('./Task')

var {   clients_doc,
        files_doc,
        versions_doc,
        tasks_doc,
        projects_doc } = require('./constants')