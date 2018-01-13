class TagInfo {
    // static BODY_CONTENT_JSP = "JSP";
    // static BODY_CONTENT_TAG_DEPENDENT = "tagdependent";
    // static BODY_CONTENT_EMPTY = "empty";
    // static BODY_CONTENT_SCRIPTLESS = "BODY_CONTENT_SCRIPTLESS";


    constructor() {

    }
}

TagInfo.BODY_CONTENT_JSP = "JSP";
TagInfo.BODY_CONTENT_PARAM = "BODY_CONTENT_PARAM";

TagInfo.prototype = {
    tagName: null,
    tagClassName: null,
    bodyContent: null,
    infoString: null,
    tagLibrary: null,
    tagExtraInfo: null,
    attributeInfo: null,
    displayName: null,
    smallIcon: null,
    largeIcon: null,
    tagVariableInfo: null,
    dynamicAttributes: null,
}
module.exports = TagInfo;