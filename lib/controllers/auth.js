const { Router } = require('express')
const ensureAuth = require('../middleware/ensureAuth')
const UserService = require('../services/UserService')
const { createToken } = require('../utils/jwt')

const ONE_DAY = 1000 * 60 * 60 * 24

const attachCookie = (res, user) => {
    res.cookie('session', createToken(user), {
        httpOnly: true,
        maxAge: ONE_DAY,
        samesite: 'strict',
        secure: false
    })
}

module.exports = Router()
    .get('/login', (req, res, next) => {
        res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=${process.env.GITHUB_REDIRECT_URI}&scopes=read:user`)
            .catch(next)
    })

    .get('/login/callback', (req, res, next) => {
        UserService
            .create(req.query.code)
            .then(user => {
                attachCookie(res, user)
                res.redirect('/')
            })
            .catch(next)
    })

    .get('/verify', ensureAuth, (req, res) => {
        res.send(req.user)
    })