/// ///////////////////////////////////////////////////
// INCLUDES
/// ///////////////////////////////////////////////////
const currency = require('../model/currencyModel.js'); 

/// ///////////////////////////////////////////////////
// Export handling of request of GET all currency
/// //////////////////////////////////////////////////
module.exports.getAllCurrency = (req, res, next) => {
    // Function to get all currency
    currency.getAllCurrencyM()
    // Success
    .then((result) => {
        res.status(200).send(result);
    })
    // Error
    .catch((err) => {
        console.error(err);
        res.status(500).send('Failed to get all currency')
    })
}

/// ///////////////////////////////////////////////////
// Export handling of request of GET currency by userid
/// //////////////////////////////////////////////////
module.exports.getCurrencyById = (req, res, next) => {
    // Get params id
    const {userid} = req.params

    // Function to get currency by userid
    currency.getCurrencyByIdM(userid)
    .then((result) => {
        // If userid does not exist
        if (result.rowCount == 0) {
            res.status(404).send(`Userid: ${userid} not found`)
        }
        // If userid exists
        else {
        res.status(200).send(result.rows);
        }
    })
    // Error
    .catch((err) => {
        res.status(500).send('Failed to get currency by userid') 
        console.error(err);
    })
}

/// ///////////////////////////////////////////////////
// Export handling of request of PUT currency by userid
/// //////////////////////////////////////////////////
module.exports.putCurrencyById = (req, res, next) => {
    // Get params id
    const {userid} = req.params
    const {quantity} = req.body

    // Function to update currency by userid
    currency.putCurrencyByIdM(userid, quantity)
    // Success
    .then((result) => {
        const message = `Userid: ${userid}, Coins: ${quantity} has been updated`
        console.log(result)
        res.status(200).json({message, updatedCurrency: result[0]});
    })
    // Error
    .catch((err) => {
        // If userid is not a number
        if (isNaN(quantity)) {
            res.status(404).send(`quantity: ${quantity} is not an integer`)
        }
        // Error
        else {
            res.status(500).send(`Failed to update currency of userid: ${userid}, Coins: ${quantity}`) 
        }        
        console.error(err);
    })
}

/// ///////////////////////////////////////////////////
// Export handling of request of POST currency by userid
/// //////////////////////////////////////////////////
module.exports.insertCurrency = (req, res, next) => {
    // Get params id
    const {userid} = req.params
    // Function to insert currency by userid
    currency.insertCurrencyM(userid)
    // Success
    .then((result) => {
        const message = `Userid: ${userid} Coins: 100 coins has been inserted`
        console.log(result)
        res.status(200).json({message, insertedCurrency: result[0]});
    })
    // Error
    .catch((err) => {
        res.status(500).send(`Failed to insert userid: ${userid} Coins: 100 coins`)
        console.error(err);
    })
}	

/// ///////////////////////////////////////////////////
// Export handling of request for retrieve Item by search
/// //////////////////////////////////////////////////
module.exports.getCurrencyByUsername = (req, res, next) => {

    const {username} = req.params

    currency.getCurrencyByUsernameM(username)
    .then((result) => {
        res.status(200).json(result);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send("Error retrieving currency by username")
    })
};