const Profile = require("../../models/profile");
const User = require("../../models/user");
const request = require("request");
const config = require("../../config/default");

//TODO: Check error handling for each controller
async function getMyProfile(req, res) {
  const {
    id
  } = req.user;

  try {
    const profile = await Profile.findOne({
      user: id
    }).populate("user", ["name", "avatar"]);

    if (!profile) {
      return res.status(404).json({
        msg: "No Such profile"
      });
    }

    return res.status(200).json(profile);
  } catch (error) {
    console.error(error);
    return res.status(500).send("server error");
  }
}

async function getProfileById(req, res) {
  const {
    user_object_id
  } = req.params;

  try {
    const profile = await Profile.findOne({
      user: user_object_id
    }).populate("user", ["name", "avatar"]);

    if (!profile) {
      return res.status(404).json({
        msg: "No Such profile"
      });
    }

    return res.status(200).json(profile);
  } catch (error) {
    console.error(error);
    if (error.kind === "ObjectId") {
      return res.status(404).json({
        msg: "No Such profile"
      });
    }
    return res.status(500).send("server error");
  }
}

async function createProfile(req, res) {
  // Ok
  try {
    let userProfile = await Profile.findOne({
      user: req.user.id
    });

    // if profile already exists update it and return it
    if (userProfile) {
      await Profile.findOneAndUpdate({
        user: req.user.id
      }, {
        $set: req.userProfileFields
      }, {
        new: true
      });
      return res.status(201).json(userProfile);
    }
    if (!userProfile) {
      // if profile does not exist create a new one, save it and return it
      userProfile = new Profile(req.userProfileFields);
      await userProfile.save();
      return res.status(201).json(userProfile);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "server error"
    });
  }
}

async function getAllProfiles(res) {
  //ok
  try {
    const profilesArray = await Profile.find().populate("user", [
      "name",
      "avatar"
    ]);
    if (!profilesArray) {
      res.status(400).json({
        msg: "Problem fetching profiles"
      });
    }
    res.status(200).json(profilesArray);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "server error"
    });
  }
}

//TODO: Update them by profileEducation id
// find one profile matching the user id
// get the education filed array
// find with in the array the correct education object,
// via the education id given by the url parameters, Model.findByIdAndUpdate()
async function updateProfilesEducation(req, res) {
  const {
    edu_id
  } = req.params;
  const {
    id
  } = req.user;

  try {
    let educationArray = await Profile.findOne({
        user: id
      },
      "education"
    );

    let educationToUpdateIndex = educationArray.education.findIndex(
      educationceObject => {
        return educationceObject.id === edu_id;
      }
    );

    if (educationToUpdateIndex === -1) {
      res.status(404).json({
        msg: "Resource not found"
      });
    }

    educationArray.education[educationToUpdateIndex] =
      req.profileEducationFields;
    await educationArray.save();
    return res.status(201).json(educationArray);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "server error"
    });
  }
}

//TODO: Update them by profileExpirience id
// Two solutions:
// 1. get the index of the expirience object to update
//    use the index to access it with in the array and
//    mutate its value
// 2.
async function updateProfilesExpirience(req, res) {
  const {
    exp_id
  } = req.params;
  const {
    id
  } = req.user;

  try {
    let experienceArray = await Profile.findOne({
        user: id
      },
      "experience"
    );

    let experienceToUpdateIndex = experienceArray.experience.findIndex(
      experienceObject => {
        return experienceObject.id === exp_id;
      }
    );

    console.log(experienceToUpdateIndex);
    if (experienceToUpdateIndex === -1) {
      res.status(404).json({
        msg: "Resource not found"
      });
    }

    experienceArray.experience[experienceToUpdateIndex] =
      req.profileExpirienceFields;
    await experienceArray.save();
    return res.status(201).json(experienceArray);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "server error"
    });
  }
}

async function deleteProfileAndUser(req, res) {
  try {
    const stringCountForProfile = await Profile.deleteOne({
      user: req.user.id
    });
    const stringCountForUser = await User.deleteOne({
      _id: req.user.id
    });
    // `1` if MongoDB deleted a doc, `0` if no docs matched the filter `{ name: ... }`
    if (
      stringCountForProfile.deletedCount === "0" &&
      stringCountForUser.deletedCount === "0"
    ) {
      res.status(404).json({
        msg: "No profile and user have been found"
      });
    }
    res.status(200).json({
      msg: "Profile and associated user have been deleted"
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "server error"
    });
  }
}

// TODO: re do the controllers below, they will need to delete a specific expirience
// Or education object from an array, by specifying an id
// async function deleteSpecificProfileFields(key, id, optionObject, response) {

//   try {
//     const deleteResponse = await Profile.updateOne({
//       key: id
//     }, {
//       $unset: optionObject
//     });

//     if (deleteResponse.ok != 1) {
//       response.status(404).json({
//         "msg": "Unable to locate the field"
//       });
//     }
//     response.status(200).json({
//       "msg": "field for the profile has been deleted"
//     });
//   } catch (error) {
//     console.error(error);
//     response.status(500).json({
//       "msg": "Server Error"
//     });
//   }
// };

async function deleteProfileExpirience(req, res) {
  const {
    exp_id
  } = req.params;

  try {
    const profilesExperienceArray = await Profile.findOne({
        user: req.user.id
      },
      "experience"
    );

    const indexOfExperienceField = profilesExperienceArray.experience.findIndex(
      experienceObject => {
        return experienceObject.id === exp_id;
      }
    );

    if (indexOfExperienceField === -1) {
      res.status(404).json({
        msg: "Unable to locate the field"
      });
    }

    profilesExperienceArray.experience.splice(indexOfExperienceField, 1);
    await profilesExperienceArray.save();

    res.status(200).json({
      profilesExperienceArray
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Server Error"
    });
  }
}

async function deleteProfileEducation(req, res) {
  const {
    edu_id
  } = req.params;

  try {
    const profilesEducationArray = await Profile.findOne({
        user: req.user.id
      },
      "education"
    );

    const indexOfEducationField = profilesEducationArray.education.findIndex(
      educationObject => {
        return educationObject.id === edu_id;
      }
    );
    console.log(indexOfEducationField);
    if (indexOfEducationField === -1) {
      res.status(404).json({
        msg: "Unable to locate the field"
      });
    }

    profilesEducationArray.education.splice(indexOfEducationField, 1);
    await profilesEducationArray.save();

    res.status(200).json({
      profilesEducationArray
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Server Error"
    });
  }
}

// Add An expirience field to the current users profile
// User needs to be able to add multiple Expirience objects
// The expirience field itself is an array
async function addProfileExperience(req, res) {
  const {
    id
  } = req.user;

  try {
    const currentUsersProfile = await Profile.findOne({
        user: id
      },
      "experience"
    );

    if (!currentUsersProfile) {
      res.status(404).json({
        msg: "Resource not found"
      });
    }
    currentUsersProfile.experience.unshift(req.profileExpirienceFields);
    const isFieldSaved = await currentUsersProfile.save();

    if (isFieldSaved) {
      res.status(201).json({
        currentUsersProfile
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json("Server Error!");
  }
}

// Add An expirience field to the current users profile
// User needs to be able to add multiple education objects
// The education field itself is an array
async function addProfileEducation(req, res) {
  const {
    id
  } = req.user;

  try {
    const currentUsersProfile = await Profile.findOne({
      user: id
    });
    console.log(currentUsersProfile);

    if (!currentUsersProfile) {
      res.status(404).json({
        msg: "Resource not found"
      });
    }
    currentUsersProfile.education.unshift(req.profileEducationFields);
    const isFieldSaved = await currentUsersProfile.save();

    if (isFieldSaved) {
      res.status(201).json({
        currentUsersProfile
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json("Server Error!");
  }
}

async function getUserRepoByUserName(req, res) {
  try {
    const options = {
      url: `https://api.github.com/users/${req.params.user_name}/repos?client_id=${config.clientId}&client_secret=${config.client_secret}&per_page=5&sort=created:asc`,
      headers: {
        'User-Agent': 'node.js'
      },
      method: 'GET'
    };
    request(options, (error, response, body) => {
      if (error) console.error(error);
      if (response.statusCode !== 200) {
        return res.status(404).json({
          "msg": "Resource not found!"
        });
      }
      res.status(200).json(JSON.parse(body));
    });
  } catch (error) {
    console.error(error);
    res.status(500).json("Server Error!");
  }
}

module.exports = {
  getMyProfile: getMyProfile,
  createProfile: createProfile,
  getAllProfiles: getAllProfiles,
  updateProfilesEducation: updateProfilesEducation,
  updateProfilesExpirience: updateProfilesExpirience,
  getProfileById: getProfileById,
  deleteProfileAndUser: deleteProfileAndUser,
  deleteProfileExpirience: deleteProfileExpirience,
  deleteProfileEducation: deleteProfileEducation,
  addProfileExperience: addProfileExperience,
  addProfileEducation: addProfileEducation,
  getUserRepoByUserName: getUserRepoByUserName
};