const express = require('express');


const Values = require('../models/values-model.js')

const router = express.Router();

router.get('/values', (req,res) =>{ //Working but should be put into a 'values-router' file
    Values.getAllValues()
    .then(values =>{
        res.status(200).json({"All values": values})
    })
    .catch(err =>{
        res.status(500).json({message: "Error retrieving values",
    Error: err
    })
    })
})

router.post('/values',  (req, res) => {

    Values.update(req.user)
    .then(value => res.json(value))
    .catch(err => res.status(500).json({ message: 'Value cannot be created', Error: err }))
});

router.put('/:id/values', (req, res) => {

    Values.update(req.params.id, req.user)
    .then(value => res.json(value))
    .catch(err => res.status(500).json({ error: 'valuse cannot be made', Error: err}))
})

router.delete('/id:/values', (req, res) => {
    Values.remove(req.params.id)
    .then(count => {
        res.status(200).json({ message: 'could not delete selected value'})
    })
});

router.delete('/values', (req, res) => {
    Values.remove(req.params)
    .then(count => {
        res.status(200).json({ message: 'could not delete values'})
    })
});



module.exports = router