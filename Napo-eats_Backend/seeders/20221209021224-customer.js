'use strict'
const falso = require('@ngneat/falso')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const customers = [...Array(5)].map(() => {
      const address = `${falso.randStreetAddress()} ${falso.randCity()}, ${falso.randState()}`
      return {
        firstName: falso.randFirstName(),
        lastName: falso.randLastName(),
        email: falso.randEmail(),
        passwordDigest: falso.randPassword(),
        address: address,
        createdAt: falso.randPastDate(),
        updatedAt: falso.randRecentDate()
      }
    })
    await queryInterface.bulkInsert('customers', customers)
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('customers')
  }
}
