'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      'restaurants',
      [
        {
          name: 'Midwood Smokehouse',
          description:
            'Regional BBQ specialties served up on plates & in sandwiches in a roadhouselike setting.',
          image: 'https://i.imgur.com/lgaPJjB.jpg',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Jack in the Box',
          description:
            'Affordable NorthEast Charlotte spot, offering Shakes & Desserts, Burgers, Chicken & Salads and more.',
          image: 'https://i.imgur.com/j07zCcd.jpg',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Three Amigos Mexican Grill & Cantina',
          description:
            'Cozy Mexican eatery & cantina offering an array of classic dishes & combos in a cheerful setting.',
          image: 'https://i.imgur.com/uAazjwQ.jpg',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Starbucks',
          description:
            'Exceptional coffees from around the world. Sourced for the season, roasted at Starbucks Reserve Roasteries and crafted with care.',
          image: 'https://i.imgur.com/6gjgcN1.jpg',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Cook Out',
          description:
            'Branch of a fast-food chain known for its drive-thru BBQ, burgers & more than 40 milkshake flavors.',
          image: 'https://i.imgur.com/1neYDmM.jpg',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Queen City Wings',
          description:
            'Dishing up wings, tenders & burgers, plus sauces ranging from sweet to very spicy.',
          image: 'https://i.imgur.com/Cn9GN1Z.jpg',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('restaurants', null, {})
  }
}

// 'use strict'
// const falso = require('@ngneat/falso')

// /** @type {import('sequelize-cli').Migration} */
// module.exports = {
//   up: async (queryInterface, Sequelize) => {
//     const restaurants = [...Array(5)].map(() => ({
//       name: falso.randCompanyName(),
//       description: falso.randProductDescription(),
//       image: falso.randImg(),
//       createdAt: falso.randPastDate(),
//       updatedAt: falso.randRecentDate()
//     }))
//     await queryInterface.bulkInsert('restaurants', restaurants)
//   },

//   down: async (queryInterface, Sequelize) => {
//     await queryInterface.bulkDelete('restaurants')
//   }
// }
