
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('values').del()
    .then(function () {
      // Inserts seed entries
      return knex('values').insert([
        {id: 1, name:  'Friends and family'},
        {id: 2, name:  'Relationships'},
        {id: 3, name:  'Sports'},
        {id: 4, name:  'Athletic Ability'},
        {id: 5, name:  'Art & Literature'},
        {id: 6, name:  'Creativity/Discovery/Inventing'},
        {id: 7, name:  'Independence'},
        {id: 8, name:  'Kindness & Generosity'},
        {id: 9, name:  'Living In the Moment'},
        {id: 10, name: 'Membership in Social Club'},
        {id: 11, name: 'Music'},
        {id: 12, name: 'My Community'},
        {id: 13, name: 'My Moral Principles'},
        {id: 14, name: 'Nature and Environment'},
        {id: 15, name: 'Fundraising'},
        {id: 16, name: 'Sense of Humor'},
        {id: 17, name: 'Success in my Career'},
        {id: 18, name: 'Reading More Books'},
        {id: 19, name: 'Trying Diffrent Foods'},
        {id: 18, name: 'Other'}

      ]);
    });
};