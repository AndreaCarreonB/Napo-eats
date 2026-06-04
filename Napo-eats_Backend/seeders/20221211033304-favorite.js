'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      'favorites',
      [
        {
          customerId: 1,
          restaurantId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          customerId: 1,
          restaurantId: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          customerId: 2,
          restaurantId: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          customerId: 3,
          restaurantId: 3,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          customerId: 4,
          restaurantId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          customerId: 5,
          restaurantId: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('favorites', null, {})
  }
}

// 'use strict'
// const falso = require('@ngneat/falso')

// /** @type {import('sequelize-cli').Migration} */
// module.exports = {
//   async up(queryInterface, Sequelize) {
//     const favorites = [...Array(5)].map(() => ({
//       customerId: falso.randNumber({ min: 1, max: 5 }),
//       restaurantId: falso.randNumber({ min: 1, max: 5 }),
//       createdAt: falso.randPastDate(),
//       updatedAt: falso.randRecentDate()
//     }))
//     await queryInterface.bulkInsert('favorites', favorites)
//   },

//   down: async (queryInterface, Sequelize) => {
//     await queryInterface.bulkDelete('favorites')
//   }
// }
