const Profile = require("../../models/profile");
const User = require("../../models/user");
const Post = require("../../models/posts");

//TODO: Check error handling for each controller

// Protected routhe
// Post should be associated to a specific user,
// a user can have multiple posts
async function createPost(req, res) {
    const {
        postFields
    } = req;

    try {
        newUserPost = new Post(postFields);
        await newUserPost.save();
        return res.status(201).json(newUserPost);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            "msg": "Server Error"
        });
    }
};

// public route
// get all the user posts by the users id
async function getPostsByUserId(req, res) {
    const {
        userId
    } = req.params;
    try {
        const currentUsersPosts = await Post.find({
            'user': userId
        });
        console.log(currentUsersPosts);
        if (!currentUsersPosts) {
            res.status(404).json({
                "msg": "Resource not found!"
            });
        }

        res.status(200).json(currentUsersPosts);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            "msg": "Server Error"
        });
    }
};

// current implementation will be a delete by post id
// protected
async function deletePostByPostId(req, res) {
    try {
        const {
            postId
        } = req.params;
        // `1` if MongoDB deleted a doc, `0` if no docs matched the filter `{ name: ... }`
        const stringCountForPost = await Post.deleteOne({
            "_id": postId
        });
        console.log(stringCountForPost);
        if (stringCountForPost.deletedCount === 0) {
            return res.status(404).json({
                msg: "No Post has been found"
            });
        }
        res.status(200).json({
            msg: "Post has been deleted"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            "msg": "Server Error"
        });
    }
};

// protected
// should take the postObjectId 
async function addLikeToPost(req, res) {
    try {
        const updatedPost = await Post.findOneAndUpdate({
            _id: req.params.postId
        }, {
            $inc: {
                'likes': 1
            }
        });

        if (!updatedPost) {
            return res.status(404).json({
                "msg": "No Post has been found"
            });
        };
        res.status(201).json(updatedPost);
    } catch (error) {
        console.error(eror);
        res.status(500).json({
            "msg": "Server Error"
        });
    }
}

// protected
// like count cannot be <= 0
async function unlikePost(req, res) {
    let PartialPostObject = await Post.findById({
        _id: req.params.postId
    }, 'likes');
    try {
        if (PartialPostObject.likes > 0) {
            const updatedPost = await Post.findOneAndUpdate({
                _id: req.params.postId
            }, {
                $inc: {
                    'likes': -1
                }
            });
            if (!updatedPost) { //bug
                return res.status(404).json({
                    "msg": "No Post has been found"
                });
            };
            res.status(201).json(updatedPost);
        }
        console.error("Cannot set likes field less then zero");
        return res.status(405).json({
            "msg": "Not allowed"
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            "msg": "Server Error"
        });
    }
}

// protected
// add comments to a post
// different user should be able to comment on a 
// different users post
// comment by current logged in user
// comment on a specific postId
// add post counting functionality
async function addCommentToPostAndUpdateCommentCount(req, res) {
    const {
        postId
    } = req.params;
    const {
        textString
    } = req.body;

    let commentsFields = {};
    try {
        let PartialPostObject = await Post.findById({
            _id: postId
        }, 'comments');
        if (!PartialPostObject.comment) { // bug not entering this block of code
            res.status(404).json({
                "msg": "Resource not found"
            });
        }
        if (!textString) {
            res.status(400).json({
                "msg": "Bad Request!"
            });
        }

        commentsFields.user = req.user.id;
        commentsFields.textString = textString;
        PartialPostObject.comments.unshift(commentsFields);
        await PartialPostObject.save();

        const updatedPost = await Post.findOneAndUpdate({
            _id: postId
        }, {
            $inc: {
                'numberOfComments': 1
            }
        });
        res.status(201).json({
            "msg": "A new cooment has been created!"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            "msg": "Server Error"
        });
    }
};

//protected
// delete a comment by postId and CommentId
// dec comment count foor the post
async function deleteCommentToPost(req, res) {
    try {
        const {
            postId,
            commentId
        } = req.params;
        let PartialPostObject = await Post.findById({
            _id: postId
        }, 'comments');
    } catch (error) {
        console.error(error);
        res.status(500).json({
            "msg": "Server Error"
        });
    }
};

module.exports = {
    createPost: createPost,
    getPostsByUserId: getPostsByUserId,
    deletePostByPostId: deletePostByPostId,
    addLikeToPost: addLikeToPost,
    unlikePost: unlikePost,
    addCommentToPostAndUpdateCommentCount: addCommentToPostAndUpdateCommentCount,
    deleteCommentToPost: deleteCommentToPost
};