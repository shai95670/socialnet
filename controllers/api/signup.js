const User = require("../../models/user");

//TODO: CHECK ERROR HANDLING FOR CONTROLLER - passed

const saveNewUser = (user, response) => {
  user.save((err) => {
    if (err) console.error(err);
    return response.status(200).json({
      success: "user saved to collection"
    });
  });
};

const createNewUser = (username, useremail, userhash, userAvatar) => {
  let user = new User({
    name: username,
    email: useremail,
    hash: userhash,
    avatar: userAvatar,
    userCreationDate: new Date()
  });

  return user;
};

// use asynch await syntax
async function handleSignUp(req, res, bcrypt) {
  const {
    Username,
    Useremail,
    UserAvatar,
    Userpassword
  } = req.body;

  try {
    let userEmail = await User.findOne({
      email: Useremail
    });

    if (userEmail) {
      return res.status(400).send("User already in use!");
    } else {
      let userHash = await bcrypt.hash(Userpassword, 8);
      saveNewUser(createNewUser(Username, Useremail, userHash, UserAvatar), res);
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  handleSignUp: handleSignUp
};