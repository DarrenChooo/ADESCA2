const user = require('../model/userModel');

module.exports.getAllUser= (req, res, next) => {
    // examples 

    user.getAllUserM()
    .then((result) => {
        res.status(200).send(result);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Failed to get users')
    })
}

module.exports.getUserID = (req, res, next) => {
    // Get params id 
    const {userid} = req.params

    user.getUser(userid)
    .then((result) => {
        res.status(200).send(result);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Failed to get user by id')
    })
}

module.exports.getUserIDJoin = (req, res, next) => {
    // Get params id 
    const {userid} = req.params

    user.getUserJoinM(userid)
    .then((result) => {
        res.status(200).send(result);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Failed to get user by id')
    })
}

module.exports.deleteUserID = (req,res,next) => {

    const {userid} = req.params

    user.deleteUser(userid)
    .then((result) =>{
        res.send(result)
    })
    .catch((err) =>{
        console.log(err);
        res.status(500).send('Failed to delete user. Please try again')
    })
}

module.exports.createUser = (req,res,next) => {
    const createUsername = req.body.username;
    const createPassword = req.body.password;
    const createRole = req.body.role;
    
    user.createUserM(createRole,createUsername,createPassword)
    .then((result) =>{
        console.log(result)
        res.status(201).json({result})
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Unable to create user.')
    })
}

module.exports.updateUser = (req, res, next) => {
    const {userid} = req.params;
    const {password} = req.body;

    user.updateUserM(password,userid)
    .then(() => {
        res.status(200).send(`Updated Successfully`);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Unable to update')
    })
};

module.exports.updateUserByAdmin = (req, res, next) => {
    const {userid} = req.body;
    const {password} = req.body;

    user.updateUserByAdminM(password,userid)
    .then(() => {
        res.status(200).send(`Updated Successfully`);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Unable to update')
    })
};

module.exports.updatePlotId = (req, res, next) => {
    const {plotid} = req.params;
    const {userid} = req.params;

    user.updatePlotIdModel(plotid, userid)
    .then(() => {
        res.status(200).json({message:'Updated Successfully'});
    })
    .catch((err) => {
        console.error(err);
        res.status(500).json({message:'Unable to update'});
    })
};

module.exports.updateUserFloor = (req, res, next) => {
    const userId = req.params.userid;
    const floorId = req.body.floorid;

    user.updateUserFloor(floorId,userId)
    .then(() => {
        res.status(200).send(`Updated Successfully`);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Unable to update')
    })
};

/// ///////////////////////////////////////////////////
// Export handling of request of updating user's spinwheel lastspin time
/// //////////////////////////////////////////////////
module.exports.updateLastSpinTime = (req, res, next) => {
    const lastSpin = req.body.lastspin;
    const userId = req.params.userid;

    user.updateLastSpinTimeM(lastSpin,userId)
    .then(() => {
        res.status(200).send(`Updated Successfully`);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Unable to update')
    })
};

/// ///////////////////////////////////////////////////
// Export handling of request of retrieving user's spinwheel lastspin time
/// //////////////////////////////////////////////////
module.exports.getLastSpinTime = (req, res, next) => {
    const userId = req.params.userid;

    user.getLastSpinTimeM(userId)
    .then((result) => {
        res.status(200).send(result.rows);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('user not found')
    })
};

module.exports.getPlotId = (req, res, next) => {
    // Get params id 
    const {userid} = req.params

    user.getPlotIdModel(userid)
    .then((result) => {
        res.status(200).send(result);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Failed to get user by id')
    })
}

module.exports.updateUserEquip = (req, res, next) => {
    const {userid} = req.params;
    const {itemid} = req.params;

    user.updateUserEquip(userid,itemid)
    .then(() => {
        res.status(200).send(`Equipped item ${itemid} successfully`);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Unable to equip item')
    })
};

/// ///////////////////////////////////////////////////
// Export handling of request of updating user's activity status
/// //////////////////////////////////////////////////
module.exports.updateUserTime = (req, res, next) => {
    // Get body 
    const {status} = req.body
    const lastloggedin = new Date()

    const userId = req.params.userid

    user.updateUserTime(status, lastloggedin, userId)
    // Success
    .then((result) => {
        res.status(201).send(result);
    })
    // Error
    .catch((err) => {
        console.error(err);
        res.status(400).send("Failed to update user's status")
    })
}

module.exports.getAllUserByFloor= (req, res, next) => {
    const floorId = req.params.floorid

    user.getAllUserByFloor(floorId)
    .then((result) => {
        res.status(200).send(result);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Failed to get users')
    })
}

/// ///////////////////////////////////////////////////
// Export handling of request of updating user's game status
/// //////////////////////////////////////////////////
module.exports.updateUserGameStatus = (req, res, next) => {
    // Get body 
    const {status} = req.body

    const userId = req.body.userid

    user.updateUserGameStatus(status, userId)
    // Success
    .then((result) => {
        res.status(201).send(result);
    })
    // Error
    .catch((err) => {
        console.error(err);
        res.status(400).send("Failed to update user's status")
    })
}

/// ///////////////////////////////////////////////////
// Export handling of request of retrieve user's friends list
/// //////////////////////////////////////////////////
module.exports.getFriendsList = (req, res, next) => {

    const userId = req.params.userid

    user.getFriendsList(userId)
    .then((result) => {
        res.status(200).send(result);
    })
    // Error
    .catch((err) => {
        console.error(err);
        res.status(400).send("Failed to retrieve friends list")
    })
}

/// ///////////////////////////////////////////////////
// Export handling of request of retrieve user's friends request list
/// //////////////////////////////////////////////////
module.exports.getFriendRequests = (req, res, next) => {

    const userId = req.params.userid

    user.getFriendRequests(userId)
    .then((result) => {
        res.status(200).send(result);
    })
    // Error
    .catch((err) => {
        console.error(err);
        res.status(400).send("Failed to retrieve friends requests")
    })
}

/// ///////////////////////////////////////////////////
// Export handling of request of create friend request
/// //////////////////////////////////////////////////
module.exports.createFriendRequest = (req,res,next) => {

    const requesterUserId = req.params.requesteruserid;
    const requestedUserId = req.body.requesteduserid;
    
    console.log(requesterUserId, requestedUserId)
    user.createFriendRequest(requesterUserId, requestedUserId)
    .then((result) =>{
        console.log(result)
        res.status(201).json({result})
    })
    .catch((err) => {
        console.error(err);
        res.status(500).json({Error: err.message})
    })
}

/// ///////////////////////////////////////////////////
// Export handling of request of accept friend request
/// //////////////////////////////////////////////////
module.exports.acceptFriendRequest = (req,res,next) => {
    
    const requesterUserId = req.body.requesteruserid;
    const requestedUserId = req.params.requesteduserid;
    
    user.acceptFriendRequest(requesterUserId, requestedUserId)
    .then((result) =>{
        console.log(result)
        res.status(200).json({result})
    })
    .catch((err) => {
        console.error(err);
        res.status(500).json({Error: err.message})
    })
}


/// ///////////////////////////////////////////////////
// Export handling of request of delete friend request/friend
/// //////////////////////////////////////////////////
module.exports.deleteFriend = (req,res,next) => {
    
    const requestedUserId = req.params.requesteduserid;
    const requesterUserId = req.params.requesteruserid;
    
    user.deleteRelation(requesterUserId, requestedUserId)
    .then((result) =>{
        console.log(result)
        res.status(200).json({result})
    })
    .catch((err) => {
        console.error(err);
        res.status(500).json({Error: err.message})
    })
}


/// ///////////////////////////////////////////////////
// Export handling of request of unblock users
/// //////////////////////////////////////////////////
module.exports.deleteBlock = (req,res,next) => {
    
    const requesterUserId = req.params.requesteruserid;
    const requestedUserId = req.params.requesteduserid;

    console.log(requesterUserId, requestedUserId)
    user.deleteRelation(requesterUserId, requestedUserId)
    .then((result) =>{
        console.log(result)
        res.status(200).json({result})
    })
    .catch((err) => {
        console.error(err);
        res.status(500).json({Error: err.message})
    })
}

/// ///////////////////////////////////////////////////
// Export handling of request of block users
/// //////////////////////////////////////////////////
module.exports.createBlock = (req,res,next) => {
    
    const initiateUserId = req.params.requesteruserid;
    const targetUserId = req.body.requesteduserid;

    user.blockUser(initiateUserId, targetUserId)
    .then((result) =>{
        console.log(result)
        res.status(200).json({result})
    })
    .catch((err) => {
        console.error(err);
        res.status(500).json({Error: err.message})
    })
}

/// ///////////////////////////////////////////////////
// Export handling of request of retrieve all users and relations with the user
/// //////////////////////////////////////////////////
module.exports.getAllUsersAndRelations = (req, res, next) => {

    const userId = req.params.userid

    user.getAllUsersAndRelations(userId)
    .then((result) => {
        res.status(200).send(result);
    })
    // Error
    .catch((err) => {
        console.error(err);
        res.status(400).send("Failed to retrieve users list")
    })
}

/// ///////////////////////////////////////////////////
// Export handling of request of retrieve user's blocked list
/// //////////////////////////////////////////////////
module.exports.getBlockedUsers = (req, res, next) => {

    const userId = req.params.userid

    user.getBlockedUsers(userId)
    .then((result) => {
        res.status(200).send(result);
    })
    // Error
    .catch((err) => {
        console.error(err);
        res.status(400).send("Failed to retrieve blocked users list")
    })
}

/// ///////////////////////////////////////////////////
// Export handling of request of retrieve user's blocked list
/// //////////////////////////////////////////////////
module.exports.getBlockedUsers = (req, res, next) => {

    const userId = req.params.userid

    user.getBlockedUsers(userId)
    .then((result) => {
        res.status(200).send(result);
    })
    // Error
    .catch((err) => {
        console.error(err);
        res.status(400).send("Failed to retrieve blocked users list")
    })
}


/// ///////////////////////////////////////////////////
// Export handling of request of user's standing
/// //////////////////////////////////////////////////
module.exports.userStandingC = (req, res, next) => {
    // Get body 
    const {floorid} = req.params
    user.userStanding(floorid)
    // Success
    .then((result) => {
        res.status(201).send(result);
    })
    // Error
    .catch((err) => {
        console.error(err);
        res.status(400).send("Failed to get user's standing status")
    })
}

/// ///////////////////////////////////////////////////
// Export handling of request of user's standing
/// //////////////////////////////////////////////////
// module.exports.userGameProgressC = (req, res, next) => {
//     // Get body 
//     const userid = req.body.userid
//     const progress = req.body.progress
//     //TODO get user play state
//     //check if user has data
//     //IF not data create new user
//     //else +1 to play state pass new play state to user.userGameprogress
//     user.getGameProgressValue(userid)
//     .then((result) => {
//         if(result.gameprogress > 0){
//             let progressValue = result.gameprogress
//             user.userGameprogress(progressValue, userid)
//             .then((result) => {
//                 console.log(result)
//                 res.status(201).send(result);
//             })
//             .catch((err) => {
//                 console.error(err);
//                 res.status(400).send("Failed to update user's game progress")
//             });
//         }else{ 
//             user.userGameprogress(userid)
//             .then((result) => {
//                 console.log(result);
//                 res.status(201).send(result);
//             })
//             //Error
//             .catch((err) => {
//                 console.error(err);
//                 res.status(400).send("Failed to update user's game progress")
//             })
//         }
//     })
// }

module.exports.userGameProgressC = (req,res,next) => {
    const {userid} = req.params
    const {gameprogress} = req.body

    user.userGameprogress(userid, gameprogress)
    .then((result) =>{
        console.log(result)
        res.status(201).json({result})
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Unable to give state.')
    })
}


/// ///////////////////////////////////////////////////
// Export handling of request of adding usergame state
/// //////////////////////////////////////////////////
module.exports.addUserGameProgressC = (req,res,next) => {
    const {userid} = req.body;

    
    user.addUserGameProgressM(userid)
    .then((result) =>{
        console.log(result)
        res.status(201).json({result})
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Unable to add game progress for user.')
    })
}