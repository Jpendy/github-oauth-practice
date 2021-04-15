const { Router } = require("express");
const ensureAuth = require("../middleware/ensureAuth");
const Post = require("../models/Post");

module.exports = Router()
    .post('/', ensureAuth, (req, res, next) => {
        Post
            .insert({
                userId: req.user.username,
                ...req.body
            })
            .then(post => res.send(post))
            .catch(next)
    })

    .get('/', (req, res, next) => {
        Post
            .find()
            .then(posts => res.send(posts))
            .catch(next)
    })

    .get('/:id', (req, res, next) => {
        Post
            .findById(req.params.id)
            .then(post => res.send(post))
            .catch(next)
    })

    .put('/:id', ensureAuth, (req, res, next) => {
        Post
            .update(req.params.id, { userId: req.user.username, ...req.body })
            .then(post => res.send(post))
            .catch(next)
    })

    .delete('/:id', ensureAuth, (req, res, next) => {
        Post
            .delete(req.params.id, req.user.username)
            .then(post => res.send(post))
            .catch(next)
    })