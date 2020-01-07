const express = require("express");
const {
    validationResult,
    check
} = require("express-validator");
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 3001;
const connectDB = require("./config/db");
const posts = require("./controllers/api/posts");
const profile = require("./controllers/api/profile");
const signin = require("./controllers/api/signin");
const signup = require("./controllers/api/signup");
const post = require("./controllers/api/posts");
const validateEmail = require("./controllers/Validations/validEmail");
const validatePassword = require("./controllers/Validations/validPassword");
const validateUserName = require("./controllers/Validations/validUserName");
const jwtMiddleware = require("./middleware/jwtAuthMid");
const profileMiddleware = require("./middleware/ProfileReqValidator");
const profileEducationValidatorMiddleware = require("./middleware/ProfileEducationValidatorMidd");
const profileExpirienceValidatorMiddleware = require("./middleware/ProfileExpirienceMid");
const postValidatorMiddleware = require("./middleware/PostValidatorMiddleware");

connectDB();

app.use(bodyParser.json());

app.get("/", (req, res) => res.send("Hello World!"));

async function checkErrorsInReq(request, response) {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(422).json({
            errors: errors.array()
        });
    }
}

app.post(
    "/signup",
    [
        validateEmail.isValidEmail("Useremail"),
        validatePassword.isValidPassword("Userpassword"),
        validateUserName.isValidUserName("Username")
    ],
    async (req, res) => {
        await checkErrorsInReq(req, res);
        signup.handleSignUp(req, res, bcrypt);
        // if (!error) {
        //     signup.handleSignUp(req, res, bcrypt);
        // }
        // res.json(error);
    }
);

// Token returned from sigin needs to be stored within the browser
// front end work!
app.post("/signin", [
    validateEmail.isValidEmail("Useremail"),
    validatePassword.isValidPassword("Userpassword"),
], async (req, res) => {
    signin.handleSignIn(req, res, bcrypt);
});

// protected routhes
app.get("/profile/me", jwtMiddleware.verifyUsersJwt, async (req, res) => {
    profile.getMyProfile(req, res);
});

app.delete("/profile/delete", jwtMiddleware.verifyUsersJwt, async (req, res) => {
    profile.deleteProfileAndUser(req, res);
});

app.post("/profile/create", [
    jwtMiddleware.verifyUsersJwt,
    profileMiddleware.profileValidatorMid,
    check('jobttitle', 'Job title is required')
    .not()
    .isEmpty(),
    check('skills', 'Skills is required')
    .not()
    .isEmpty()
], async (req, res) => {
    await checkErrorsInReq(req);
    profile.createProfile(req, res);
});

app.post("/profile/updateProfileEducation/:edu_id",
    [
        jwtMiddleware.verifyUsersJwt,
        profileEducationValidatorMiddleware.profileEducationValidatorMid
    ],
    async (req, res) => {
        profile.updateProfilesEducation(req, res);
    }
);

app.post("/profile/updateProfileExpirience/:exp_id",
    [
        jwtMiddleware.verifyUsersJwt,
        profileExpirienceValidatorMiddleware.profileExpirienceValidatorMid
    ],
    async (req, res) => {
        profile.updateProfilesExpirience(req, res);
    }
);

app.delete("/profile/deleteProfileExpirience/:exp_id", jwtMiddleware.verifyUsersJwt, async (req, res) => {
    profile.deleteProfileExpirience(req, res);
});

app.delete("/profile/deleteProfileEducation/:edu_id", jwtMiddleware.verifyUsersJwt, async (req, res) => {
    profile.deleteProfileEducation(req, res);
});

app.post("/profile/addProfileExpirience",
    [
        jwtMiddleware.verifyUsersJwt,
        profileExpirienceValidatorMiddleware.profileExpirienceValidatorMid
    ],
    async (req, res) => {
        profile.addProfileExperience(req, res);
    }
);

app.post("/profile/addProfileEducation",
    [
        jwtMiddleware.verifyUsersJwt,
        profileEducationValidatorMiddleware.profileEducationValidatorMid
    ],
    async (req, res) => {
        profile.addProfileEducation(req, res);
    }
);

app.post("/post/create",
    [
        jwtMiddleware.verifyUsersJwt,
        postValidatorMiddleware.validatePostFields
    ],
    async (req, res) => {
        posts.createPost(req, res);
    }
);


app.put("/post/like/:postId",
    jwtMiddleware.verifyUsersJwt,
    async (req, res) => {
        posts.addLikeToPost(req, res);
    }
);

app.put("/post/unlike/:postId",
    jwtMiddleware.verifyUsersJwt,
    async (req, res) => {
        posts.unlikePost(req, res);
    }
);

app.put("/post/:postId/comment",
    jwtMiddleware.verifyUsersJwt,
    async (req, res) => {
        posts.addCommentToPostAndUpdateCommentCount(req, res);
    }
);

app.delete("/post/delete/:postId", jwtMiddleware.verifyUsersJwt, async (req, res) => {
    posts.deletePostByPostId(req, res);
})

// public profile route
app.get("/profile/getProfiles", async (req, res) => {
    profile.getAllProfiles(res);
});

app.get("/profile/:user_object_id", async (req, res) => {
    profile.getProfileById(req, res);
});

app.get("/profile/repos/:user_name", async (req, res) => {
    profile.getUserRepoByUserName(req, res);
});

app.get("/post/:userId", async (req, res) => {
    posts.getPostsByUserId(req, res);
});

app.listen(PORT, () => console.log(`api listening on port ${PORT}!`));