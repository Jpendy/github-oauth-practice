const User = require('../models/User')
const { exchangeCodeForToken, getUserProfileInfo } = require('../utils/github')

module.exports = class UserService {

    static create(code) {

        return exchangeCodeForToken(code)
            .then(getUserProfileInfo)
            .then(User.insert)
    }

}