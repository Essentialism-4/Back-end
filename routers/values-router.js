// Imports
// ==============================================================================================
const express = require('express');
const Values = require('../models/values-model.js');
const Users = require('../models/users-model.js');
// ==============================================================================================

const router = express.Router();

// Get preset values
// ==============================================================================================
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
});
// ==============================================================================================

// Get all custom user - entered values
// ==============================================================================================
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
});


// Get a specific value by ID
// ==============================================================================================
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
});
// ==============================================================================================

// Get a specific user's custom values
// ==============================================================================================
router.get('/:id/custom', (req, res) => {
    const { id } = req.params;

    Users.findByID(id)  //Is this even a real user? Checks here
        .then(response => {
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
// ==============================================================================================

// Add a new value to the list (Not really used by client)
// ==============================================================================================
router.post('/', (req, res) => {
    Values.insert(req.body)
        .then(value => res.status(200).json({ value }))
        .catch(err => res.status(500).json({ message: 'Value cannot be added', Error: err }))
});
// ==============================================================================================

// Add a new custom value to the list (Contains relevant user_id foreign key)
// ==============================================================================================
router.post('/custom', (req, res) => {
    Values.insertCustomValue(req.body)
        .then(value => res.status(200).json({ value }))
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'Value cannot be added', Error: err })
        })
});
// ==============================================================================================

// Update a value by ID (Not needed by client)
// ==============================================================================================
router.put('/:id', (req, res) => {
    Values.update(req.body, req.params.id)
        .then(value => res.status(200).json({ Updated: value }))
        .catch(err => res.status(500).json({ error: 'Failed to update value', Error: err }))
})
// ==============================================================================================

// Update a custom value by ID
// ==============================================================================================
router.put('/custom/:id', (req, res) => { //Update a user's custom value
    Values.updateCustomValue(req.body, req.params.id)
        .then(value => res.status(200).json({ Updated: value }))
        .catch(err => res.status(500).json({ error: 'Failed to update value', Error: err }))
})
// ==============================================================================================

// Delete a specific custom value
// ==============================================================================================
router.delete('/custom/:id', (req, res) => {
    Values.deleteCustomValue(req.params.id)
        .then(response => {
            res.status(200).json({ message: 'Value deleted', response })
        })
});
// ==============================================================================================


module.exports = router