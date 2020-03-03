exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries 
      return knex('users').insert([
        {id: 1, username: 'admin', password: "test", top3_values:"School,Friends,Escaping the simulation", importance_prompt: "These things are important to me because reasons", involvement_prompt: "I have been involved in over 300 secret missions" },
      ]);
    });
};