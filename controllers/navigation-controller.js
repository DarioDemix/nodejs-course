const fs = require('fs');
const path = require('path');
const rootDir = require('../util/path');
const Link = require('../models/Link');

exports.setLinksMiddleware = (req, res, next) => {
    const linksPath = path.join(rootDir, 'data', 'links.json');
    
    fs.readFile(linksPath, (err, links) => {
        links = JSON.parse(links);
        req.links = links.map(link => new Link(link.href, link.label));
        next();
    });
}