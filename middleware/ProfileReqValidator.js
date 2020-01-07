async function profileValidatorMid(req, res, next) {
    const {
        company,
        website,
        location,
        jobttitle,
        bio,
        githubusername,
        skills,
        social,
    } = req.body;
    let userProfileFields = {};

    if (company && website && location &&
        jobttitle && bio && githubusername &&
        skills && social.youtube && social.twitter &&
        social.facebook && social.linkdin && social.instagram) {
        userProfileFields.user = req.user.id;
        userProfileFields.company = company;
        userProfileFields.website = website;
        userProfileFields.location = location;
        userProfileFields.jobttitle = jobttitle;
        userProfileFields.bio = bio;
        userProfileFields.githubusername = githubusername;
        userProfileFields.skills = skills.split(",").map(skill => skill.trim());
        userProfileFields.social = social;
        req.userProfileFields = userProfileFields;
        next();
    } else {
        res.status(400).json({
            "msg": "All fields need to be filled for a user profile"
        });
    }
}

module.exports = {
    profileValidatorMid: profileValidatorMid
};