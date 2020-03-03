const express = require('express');


const Values = require('../models/values-model.js');
const Users = require('../models/users-model.js');

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
            res.status(200).json({ message: 'could not delete selected value' })
        })
});

router.get('/:id', (req, res) => { //Get a specific user's values
    const { id } = req.params;

    Users.findByID(id)  //Is this even a real user? Checks here
    .then(response =>{
        console.log('User:', res);
        if(response === undefined){
            res.status(404).json({message: "User with specified ID does not exist"})
        }
    })


    // Values.getCustomValuesByID(id)   //Get the values that user added to their own profile
    //     .then(userCustomValues => {

    //         //Convert to a nice array for my front enders

    //         const userCustomValuesArray = userCustomValues[0].custom_values.split(",");
            
    //         res.status(200).json({ "This user's custom values": userCustomValuesArray});
    //     })
    //     .catch(err =>{
    //         res.status(500).json({message: "Unable to retrieve custom values for this user"})
    //     })
});

// router.post('/:id/custom', (req,res) =>{
//     const {id} = req.params;
//     const value = req.body; 
//     Values.insertCustomValue(value, id)
//     .then(response =>{
//         res.json(response);
//     })
//     .catch(err =>{
//         res.json(err)
//     })
// })

module.exports = router