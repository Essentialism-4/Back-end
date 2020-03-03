const express = require('express');


const Values = require('../models/values-model.js')

const router = express.Router();

router.get('/', (req, res) => { //Working but should be put into a 'values-router' file
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

router.post('/', (req, res) => {
    Values.insert(req.body)
        .then(value => res.status(200).json({ value }))
        .catch(err => res.status(500).json({ message: 'Value cannot be added', Error: err }))
});

router.put('/:id', (req, res) => {
    Values.update(req.body, req.params.id)
        .then(value => res.status(200).json({ Updated: value }))
        .catch(err => res.status(500).json({ error: 'Failed to update value', Error: err }))
})

router.delete('/id:', (req, res) => {
    Values.remove(req.params.id)
    .then(count => {
        res.status(200).json({ message: 'could not delete selected value'})
    })
});

// router.delete('/values', (req, res) => {
//     Values.remove(req.params)
//     .then(count => {
//         res.status(200).json({ message: 'could not delete values'})
//     })
// });



module.exports = router