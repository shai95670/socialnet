async function profileEducationValidatorMid(req, res, next) {
    const {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    } = req.body.education;

    let profileEducationFields = {};
    if (school && degree && fieldofstudy &&
        from && to && current && description) {

        profileEducationFields.school = school;
        profileEducationFields.degree = degree;
        profileEducationFields.fieldofstudy = fieldofstudy;
        profileEducationFields.from = from;
        profileEducationFields.to = to;
        profileEducationFields.current = current;
        profileEducationFields.description = description;

        req.profileEducationFields = profileEducationFields;
        next();
    } else {
        res.status(400).json({
            "msg": "All fields need to be filled for education"
        });
    }
}

module.exports = {
    profileEducationValidatorMid: profileEducationValidatorMid
};