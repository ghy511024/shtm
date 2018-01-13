const Node = require ("./Node");

class CustomTag extends Node {
    constructor (qName, prefix, localName, uri, attrs, start, parent) {
        super (qName, localName, attrs, start, parent);

        this.prefix = prefix;
        this.uri = uri;
        this.name = "customTag"
    }
}

CustomTag.prototype = {
    uri: null,
    prefix: null,
    tagData: null,//tagData
    tagHandlerPoolName: null,
    tagInfo: null,
    tagFileInfo: null,
    tagHandlerClass: null,
    varInfos: null,
    customNestingLevel: null,
    childInfo: null,
    implementsBodyTag: null,
    atBeginScriptingVars: null,
    atEndScriptingVars: null,
    nestedScriptingVars: null,
    customTagParent: null,
    numCount: null,
    useTagPlugin: null,
    tagPluginContext: null,
    jspId: null,
    tempVars: null,
    atSTag: null,// node.Nodes
    atETag: null,// node.Nodes
}
module.exports = CustomTag;