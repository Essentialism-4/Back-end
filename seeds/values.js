
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('values').del()
    .then(function () {
      // Inserts seed entries
      return knex('values').insert([
        {id: 1, name: 'Friends and family'},
        {id: 2, name: 'Relationships'},
        {id: 3, name: 'Sports'}
      ]);
    });
};