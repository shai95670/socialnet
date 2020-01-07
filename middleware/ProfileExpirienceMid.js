async function profileExpirienceValidatorMid(req, res, next) {
    const {
        company,
        from,
        location,
        to,
        current,
        title,
        description
    } = req.body.experience;
    //console.log(req.body.experience);
    let profileExpirienceFields = {};

    if (company && from && location &&
        to && current && title && description) {
        profileExpirienceFields.company = company;
        profileExpirienceFields.location = location;
        profileExpirienceFields.from = from;
        profileExpirienceFields.to = to;
        profileExpirienceFields.current = current;
        profileExpirienceFields.title = title;
        profileExpirienceFields.description = description;
        req.profileExpirienceFields = profileExpirienceFields;
        next();
    } else {
        res.status(400).json({
            "msg": "All fields need to be filled for a user profile"
        });
    }
}

module.exports = {
    profileExpirienceValidatorMid: profileExpirienceValidatorMid
};