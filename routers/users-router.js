const express = require('express');

const User = require('../models/users-model.js');
const Values = require('../models/values-model.js');

const router = express.Router();

const authenticate = require('../auth/auth-router')



// we would like this to be protected 
router.get('/', authenticate, (req, res) => {
    User.getAll()
        .then(users => {
            res.json(users);
        })
        .catch(err => res.send(err));
})

router.get('/:id/values', (req, res) => {
    let { id } = req.params; //Get the values a specific user has saved from the default list of values

    console.log('ID:', id);

    User.findByID(id)
        .then(user => {
            console.log(user)
            if (user === undefined) {
                res.status(404).json({ Error: "User with specified ID does not exist" });
            }
        })
        .catch(err => {
            res.status(500).json({ message: `Server error: ${err}` });
        })

    Values.findValuesByUserID(id)
        .then(userValues => {
            res.status(200).json({ "This user's values": userValues })

        })
        .catch(err => {
            console.log(`${err}`);
            res.status(400).json({
                message: "Failed to retrieve values for this user",
                Error: err
            })
        })
})

// router.get('/:id/values/custom', (req, res) => {
//     const { id } = req.params;

//     Values.getCustomValuesByID(id)   //Get the values that user added to their own profile
//         .then(userCustomValues => {

//             //Convert to a nice array for my front enders

//             const userCustomValuesArray = userCustomValues[0].custom_values.split(",");

//             res.status(200).json({ "This user's custom values": userCustomValuesArray });
//         })
//         .catch(err => {
//             res.status(500).json({ message: "Unable to retrieve custom values for this user", Error: err })
//         })

// });

router.post('/user-values', (req, res) => {

    Values.addValueToProfile(req.body)
        .then(value => res.status(200).json({message: "Value added to profile", value }))
        .catch(err => res.status(500).json({ message: 'Value cannot be added', Error: err }))
});

router.delete('/:id', (req, res) => {
    User.remove(req.params.id)
        .then(count => {
            res.status(200).json({ message: 'could not delete user' })
        })
});


module.exports = router; 