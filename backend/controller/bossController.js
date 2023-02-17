const boss = require('../model/bossModel')

/// ///////////////////////////////////////////////////
// Export handling of request of insert Boss
/// //////////////////////////////////////////////////
module.exports.createBoss = (req, res, next) => {

    const {bossname} = req.body;
    const {bosshealth} = req.body;
    const {bossreward} = req.body;
    const {imageid} = req.body;

    boss.createBoss(bossname, bosshealth, bossreward, imageid)
    .then((result) => {
        console.log(result)
        res.status(201).json(result);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Unable to create item')
    })
};

/// ///////////////////////////////////////////////////
// Export handling of request of retrieve Boss
/// //////////////////////////////////////////////////
module.exports.getBoss = (req, res, next) => {

    const bossid = req.params.id

    boss.getBoss(bossid)
    .then((result) => {
        res.status(200).json(result);
    })
    .catch((err) => {
        console.error(err);
        res.status(404).send('Unable to find item')
    })
};

/// ///////////////////////////////////////////////////
// Export handling of request of update Boss
/// //////////////////////////////////////////////////
module.exports.updateBoss = (req, res, next) => {

    const bossid = req.params.id
    const {bossname} = req.body;
    const {bosshealth} = req.body;
    const {bossreward} = req.body;
    const {imageid} = req.body;

    boss.updateBoss(bossid, bossname, bosshealth, bossreward, imageid)
    .then((result) => {
        res.status(200).json(result);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Unable to update item')
    })
};

/// ///////////////////////////////////////////////////
// Export handling of request of delete Boss
/// //////////////////////////////////////////////////
module.exports.deleteBoss = (req, res, next) => {

    const bossid = req.params.id

    boss.deleteBoss(bossid)
    .then(() => {
        res.status(200).json(`{message: Boss ${bossid} has been deleted!}`);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('unable to delete item')
    })
};