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
    //github auth login
    .get('/github-login', (req, res, next) => {
        res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=${process.env.GITHUB_REDIRECT_URI}&scopes=read:user`)
            .catch(next)
    })

    //github auth login callback
    .get('/login/github-callback', (req, res, next) => {
        UserService
            .githubLoginCreate(req.query.code)
            .then(user => {
                attachCookie(res, user)
                res.redirect('/')
            })
            .catch(next)
    })

    //google auth login
    .get('/google-login', (req, res, next) => {
        res.redirect(`https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${process.env.GOOGLE_REDIRECT_URI}&response_type=code&scope=https://www.googleapis.com/auth/userinfo.profile`)
    })

    // google auth login callback
    .get('/login/google-callback', (req, res, next) => {
        UserService
            .googleLoginCreate(req.query.code)
            .then(user => {
                attachCookie(res, user)
                res.redirect('/')
            })
            .catch(next)
    })

    .get('/logout', (req, res) => {
        res.clearCookie('session', {
            httpOnly: true,
            samesite: 'strict',
            secure: false
        })
        res.redirect('/')
    })

    .get('/verify', ensureAuth, (req, res) => {
        res.send(req.user)
    })
