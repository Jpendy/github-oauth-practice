const User = require('../models/User')
const { exchangeCodeForToken, getUserProfileInfo } = require('../utils/github')
const { exchangeGoogleCodeForToken, getGoogleUserProfileInfo } = require('../utils/google')

module.exports = class UserService {

    static githubLoginCreate(code) {

        return exchangeCodeForToken(code)
            .then(getUserProfileInfo)
            .then(User.insert)
    }

    static googleLoginCreate(code) {
        return exchangeGoogleCodeForToken(code)
            .then(getGoogleUserProfileInfo)
            .then(User.insert)
    }
}