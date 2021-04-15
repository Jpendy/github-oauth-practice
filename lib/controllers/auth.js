const { Router } = require('express')
const { create } = require('../services/UserService')

module.exports = Router()
    .get('/login', (req, res, next) => {
        res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=${process.env.GITHUB_REDIRECT_URI}&scopes=read:user`)
    })

    .get('/login/callback', (req, res, next) => {
        create(req.query.code)
            .then(user => res.send(`
            <h1>Username - ${user.username}</h1>
            <img src=${user.photoUrl} width="200px"  />
            `))
            .catch(next)
    })