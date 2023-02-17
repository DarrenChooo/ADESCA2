/// ///////////////////////////////////////////////////
// INCLUDES
/// ///////////////////////////////////////////////////
const pool = require('./db'); // Import from db.js

// SQL query to create tables 
const sql = `
CREATE TABLE image (
    imageID SERIAL NOT NULL,
    imageURL VARCHAR(255) NOT NULL,
    imageName VARCHAR(255) NOT NULL,
    imageSorter VARCHAR(100) NULL,
    dateOfCreation TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (imageID)   
);

CREATE TABLE floors (
    floorID SERIAL NOT NULL,
    floorName VARCHAR(255) NOT NULL,
    imageID INT NULL,
    dateOfCreation TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (floorID),    
    FOREIGN KEY (imageID) REFERENCES image (imageID)  
);

CREATE TABLE items (
    itemID SERIAL NOT NULL,
    itemName VARCHAR(255) NOT NULL,
    cost INT NOT NULL,
    levelReq INT NOT NULL,
    imageID INT NULL,
	damage INT NULL,
	speed INT NULL,
	durability INT NULL,
	critrate INT NULL,
    dateOfCreation TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (itemID),
    FOREIGN KEY (imageID) REFERENCES image (imageID)
);

CREATE TABLE users (
    userID SERIAL NOT NULL,
    role VARCHAR(100) NOT NULL,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    imageID INT NULL, 
    floorID INT NULL,
    plotID INT NULL,
    equippeditem INT NULL,
    dateOfCreation TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    userStatus VARCHAR(255) NULL,
    lastLoggedIn VARCHAR(255) NULL DEFAULT CURRENT_TIMESTAMP, 
    lastspin VARCHAR(255) NULL,
    gameStatus VARCHAR(255) NULL, 
    PRIMARY KEY (userID),    
    FOREIGN KEY (imageID) REFERENCES image (imageID),
    FOREIGN KEY (floorID) REFERENCES floors (floorID),
    FOREIGN KEY (equippeditem) REFERENCES items (itemID)
);

CREATE TABLE npc (
    npcID SERIAL NOT NULL,
    npcName VARCHAR(255) NOT NULL,
    imageID INT NULL,
    floorID INT NULL,
    dateOfCreation TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    rewardItemId INT NULL,
    PRIMARY KEY (npcID),    
    FOREIGN KEY (imageID) REFERENCES image (imageID),
    FOREIGN KEY (floorID) REFERENCES floors (floorID), 
    FOREIGN KEY (rewardItemId) REFERENCES items (itemId)
);

CREATE TABLE inventory (
    inventoryID SERIAL NOT NULL,
    userID INT NULL,
    itemID INT NULL,
    quantity INT NOT NULL,
    PRIMARY KEY (inventoryID),
    FOREIGN KEY (itemID) REFERENCES items (itemID) ON DELETE CASCADE,
    FOREIGN KEY (userID) REFERENCES users (userID) ON DELETE CASCADE,
    CONSTRAINT itemid_unique UNIQUE (itemID,userID),
    CONSTRAINT check_qty_pos check (quantity>=0)
);

CREATE TABLE game (
    gameID SERIAL NOT NULL ,
    gameName VARCHAR(255) NOT NULL,
    npcID INT NULL,
    dateOfCreation TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (gameID),    
    FOREIGN KEY (npcID) REFERENCES npc (npcID)  
);

CREATE TABLE dialogue (
    dialogueID SERIAL NOT NULL,
    dialogueDesc VARCHAR(255) NULL,
    npcID INT NULL,
	plotid INT, 
	stateid INT,
    PRIMARY KEY (dialogueID),
    FOREIGN KEY (npcID) REFERENCES npc (npcID)
);

CREATE TABLE currency(
    currencyID SERIAL NOT NULL,
    quantity INT NULL,
    userID INT NULL UNIQUE,
    PRIMARY KEY (currencyID),
    FOREIGN KEY (userID) REFERENCES users (userID) ON DELETE CASCADE,
    CONSTRAINT check_qty_pos check (quantity>=0)
);

CREATE TABLE postboard (
    postID SERIAL NOT NULL,
    postDesc VARCHAR(255) NULL,
    userID INT NULL,
    PRIMARY KEY (postID),
    FOREIGN KEY (userID) REFERENCES users (userID) ON DELETE CASCADE
);

CREATE TABLE boss(
    bossID SERIAL NOT NULL,
    bossName VARCHAR(255) NOT NULL,
    bossHealth INT NOT NULL,
    bossReward INT NOT NULL,
    imageID INT NULL,
    dateOfCreation TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (bossID ),
    FOREIGN KEY (imageID) REFERENCES image (imageID) ON DELETE SET DEFAULT
);

CREATE TABLE gameplayduration(
    gameid INT NOT NULL,
    timeStart VARCHAR(255) NOT NULL,
    timeEnd VARCHAR(255) NULL,
    duration INT NULL,
    userid INT NOT NULL,
    attempt INT NOT NULL,
    PRIMARY KEY (gameid, userid, attempt),
    FOREIGN KEY (gameid) REFERENCES game (gameID) ON DELETE CASCADE,
    FOREIGN KEY (userid) REFERENCES users (userID) ON DELETE CASCADE 
);

CREATE TABLE spinwheel (
    spinid SERIAL NOT NULL, 
    itemID INT NULL, 
	rowcount INT NOT NULL,
    PRIMARY KEY (spinid),
    imageID INT NULL,
    FOREIGN KEY (imageID) REFERENCES image (imageID),
    FOREIGN KEY (itemID) REFERENCES items (itemID) ON DELETE CASCADE,
    CONSTRAINT itemid_spin_unique UNIQUE (itemid),
	CONSTRAINT Configuration_OnlySixRows CHECK (rowcount <= 5)
);

CREATE TABLE userRelations(
    relationID SERIAL NOT NULL,
    relationState VARCHAR(255) NOT NULL,
    initiateUserID INT NOT NULL,
    otherUserID INT NOT NULL,
    friendshipState VARCHAR(255) NULL,
    dateOfCreation TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (initiateUserID) references users(userID),
    FOREIGN KEY (otherUserID) references users(userID),
    PRIMARY KEY (initiateUserID, otherUserID)
    );

CREATE TABLE dialogueState(
    dialogueStateID SERIAL NOT NULL,
    npcId INT NOT NULL, 
    dialogueID INT NULL,
    userId INT NULL, 
    plotid INT NULL, 
    stateid INT NULL,
    rewardItemId INT NULL,
    PRIMARY KEY (npcId, userId), 
    FOREIGN KEY (rewardItemId) REFERENCES items (itemId), 
    FOREIGN KEY (npcId) REFERENCES npc (npcId), 
    FOREIGN KEY (userId) REFERENCES users (userId)
);
`

pool.query(sql)
    .then(() => {
        console.log(`Tables created`);
    })
    .catch((error) => {
        console.error(error)
    });