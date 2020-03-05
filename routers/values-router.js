const express = require('express');


const Values = require('../models/values-model.js');
const Users = require('../models/users-model.js');

const router = express.Router();

router.get('/', (req, res) => {
    Values.getAllValues()
        .then(values => {
            res.status(200).json({ "All values": values })
        })
        .catch(err => {
            res.status(500).json({
                message: "Error retrieving values",
                Error: err
            })
        })
})

router.get('/:id', (req, res) => {
    const { id } = req.params;

    Values.getValueByID(id)
        .then(value => {
            res.status(200).json({ "Specified Value": value })
        })
        .catch(err => {
            res.status(500).json({
                message: "Error retrieving value",
                Error: err
            })
        })
})


router.get('/custom', (req, res) => {
    Values.viewAllCustomValues()
        .then(values => {
            res.status(200).json({ "All user submitted values": values })
        })
        .catch(err => {
            res.status(500).json({
                message: "Error retrieving values",
                Error: err
            })
        })
})

router.get('/:id/custom', (req, res) => {
    const { id } = req.params;

    Users.findByID(id)  //Is this even a real user? Checks here
        .then(response => {
            // console.log('User:', res);
            if (response === undefined) {
                res.status(404).json({ message: "User with specified ID does not exist" })
            }
        })

    Values.getCustomValuesByID(id)
        .then(values => {
            res.status(200).json({ "This user's submitted values": values })
        })
        .catch(err => {
            res.status(500).json({
                message: "Error retrieving this user's values",
                Error: err
            })
        })
})

router.post('/', (req, res) => {
    Values.insert(req.body)
        .then(value => res.status(200).json({ value }))
        .catch(err => res.status(500).json({ message: 'Value cannot be added', Error: err }))
});

router.post('/custom', (req, res) => {
    Values.insertCustomValue(req.body)
        .then(value => res.status(200).json({ value }))
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'Value cannot be added', Error: err })
        })
});

router.put('/:id', (req, res) => {
    Values.update(req.body, req.params.id)
        .then(value => res.status(200).json({ Updated: value }))
        .catch(err => res.status(500).json({ error: 'Failed to update value', Error: err }))
})

router.put('/custom/:id', (req, res) => { //Update a user's custom value
    Values.updateCustomValue(req.body, req.params.id)
        .then(value => res.status(200).json({ Updated: value }))
        .catch(err => res.status(500).json({ error: 'Failed to update value', Error: err }))
})

router.delete('/custom/:id', (req, res) => {
    Values.deleteCustomValue(req.params.id)
        .then(response => {
            res.status(200).json({ message: 'Value deleted', response })
        })
});


// CUSTOM VALUES ENDPOINTS ========================================================================================



module.exports = router