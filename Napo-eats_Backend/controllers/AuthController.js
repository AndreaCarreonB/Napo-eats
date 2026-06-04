const { Customer } = require('../models')
const middleware = require('../middleware')

const Login = async (req, res) => {
  try {
    const customer = await Customer.findOne({
      where: { email: req.body.email },
      raw: true
    })
    if (
      customer &&
      (await middleware.comparePassword(
        customer.passwordDigest,
        req.body.password
      ))
    ) {
      let payload = {
        id: customer.id,
        email: customer.email,
        firstName: customer.firstName,
        address: customer.address
      }
      let token = middleware.createToken(payload)
      console.log(payload)
      return res.send({ customer: payload, token })
    }
    res.status(401).send({ status: 'Error', msg: 'Unauthorized' })
  } catch (error) {
    throw error
  }
}

const Register = async (req, res) => {
  try {
    const { firstName, lastName, address, email, password } = req.body
    let passwordDigest = await middleware.hashPassword(password)
    const customer = await Customer.create({
      firstName,
      lastName,
      address,
      email,
      passwordDigest
    })
    res.send(customer)
  } catch (error) {
    throw error
  }
}

const CheckSession = async (req, res) => {
  console.log('test', res.locals)
  const { payload } = res.locals
  res.send(payload)
}

module.exports = {
  Login,
  Register,
  CheckSession
}
