module.exports = class Link {
    constructor(href, label) {
        this.href = href;
        this.label = label;
    }

    calculateClass(path) {
       return path === this.href ? 'active': '';
    }
}