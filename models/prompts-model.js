const db = require('../config/db-config.js');

module.exports = {
    updateImportancePrompt,
    updateInvolvementPrompt
}


function updateImportancePrompt(prompt, id){
    return db('users')
    .where('id', Number(id))
    .select("importance_prompt")
    .update({importance_prompt : prompt});
}

function updateInvolvementPrompt(prompt, id){
    return db('users')
    .where('id', Number(id))
    .select("involvement_prompt")
    .update({involvement_prompt : prompt});
}