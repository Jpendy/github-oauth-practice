const { Router } = require("express");
const ensureAuth = require("../middleware/ensureAuth");
const Comment = require("../models/Comment");

module.exports = Router()
    .post('/', ensureAuth, (req, res, next) => {
        Comment
            .insert(req.body)
            .then(comment => res.send(comment))
            .catch(next)
    })

    .get('/:id', (req, res, next) => {
        Comment
            .findById(req.params.id)
            .then(comment => res.send(comment))
            .catch(next)
    })

    .delete('/:id', ensureAuth, (req, res, next) => {
        Comment
            .delete(req.params.id, req.user.username)
            .then(comment => res.send(comment))
            .catch(next)
    })