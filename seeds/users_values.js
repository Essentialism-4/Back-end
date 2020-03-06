// Seeding for our dummy 'admin' user to attribute some values to them
// ======================================================================================
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users_values').del()
    .then(function () {
      // Inserts seed entries
      return knex('users_values').insert([
        {id: 1, user_id: 1, value_id: 1},
        {id: 2, user_id: 1, value_id: 2},
        {id: 3, user_id: 1, value_id: 5},
        {id: 4, user_id: 1, value_id: 8},
        {id: 5, user_id: 1, value_id: 12},
        {id: 6, user_id: 1, value_id: 9},
      ]);
    });
};
