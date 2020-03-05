const express = require('express');

const User = require('../models/users-model.js');
const Values = require('../models/values-model.js');
const Prompts = require('../models/prompts-model.js');

const router = express.Router();

// we would like this to be protected 
router.get('/', (req, res) => {
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

router.get('/:id/values/top', (req,res) =>{  
    const {id} = req.params;
    
    Values.getTop3ByID(id)   //Get the values that user added to their own profile
    .then(top3=> {

        //Convert to a nice array for my front enders

        const usertop3Array = top3[0].top3_values.split(",");

        res.status(200).json({ "This user's top 3 values": usertop3Array});
    })
    .catch(err => {
        res.status(500).json({ message: "Unable to retrieve top 3 for this user", Error: err })
    })

})

router.put('/:id/values/top', (req, res) => {

    console.log(req.body);
    const {id} = req.params;

    const top3String = req.body.top3_values.toString();

    console.log(top3String);

    Values.insertTop3(top3String, id)
        .then(value => res.status(200).json({ message: "Value added to profile", value }))
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'Value cannot be added', Error: err })})
});


//==============================================================================================================================
//Prompt editing 

router.put('/:id/prompt', (req, res) => {

    const {id} = req.params;


    User.findByID(id)  //Is this even a real user? Checks here
    .then(response => {
        if (response === undefined) {
            res.status(404).json({ message: "User with specified ID does not exist" })
        }
    })

    const prompt = req.body.prompt

    Prompts.updateImportancePrompt(prompt, id)
        .then(value => res.status(200).json({ message: `Importance prompt updated for user ${id} ` }))
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'Prompt failed to update', Error: err })})
});

router.put('/:id/involvement', (req, res) => {

    const {id} = req.params;

    User.findByID(id)  //Is this even a real user? Checks here
    .then(response => {
        // console.log('User:', res);
        if (response === undefined) {
            res.status(404).json({ message: "User with specified ID does not exist" })
        }
    })

    const prompt = req.body.prompt

    Prompts.updateInvolvementPrompt(prompt, id)
        .then(value => res.status(200).json({ message: `Involvement prompt updated for user ${id} ` }))
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'Prompt failed to update', Error: err })})
});

//==============================================================================================================================

router.post('/user-values', (req, res) => {

    Values.addValueToProfile(req.body)
        .then(value => res.status(200).json({ message: "Value added to profile" }))
        .catch(err => res.status(500).json({ message: 'Value cannot be added', Error: err }))
});

router.delete('/:id', (req, res) => {
    User.remove(req.params.id)
        .then(count => {
            res.status(200).json({ message: 'could not delete user' })
        })
});


module.exports = router; 