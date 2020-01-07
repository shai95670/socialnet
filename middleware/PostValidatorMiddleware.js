async function validatePostFields(req, res, next) {
    const {
        textString,
        postCreator,
        postCreatedDate
    } = req.body
    if (textString) {
        let postFieldsObject = {};
        postFieldsObject.user = req.user.id;
        postFieldsObject.textString = textString;
        postFieldsObject.postCreator = postCreator;
        postFieldsObject.postCreatedDate = postCreatedDate;
        req.postFields = postFieldsObject;
        next();
    } else {
        res.json({
            "msg": "Post Missing fields!"
        });
    }
}

module.exports = {
    validatePostFields: validatePostFields
};