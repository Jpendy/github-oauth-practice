const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const User = require('../lib/models/User');
const Post = require('../lib/models/Post');
const Comment = require('../lib/models/Comment');

jest.mock('../lib/middleware/ensureAuth.js', () => (req, res, next) => {
    req.user = {
        username: 'Jake',
        photoUrl: 'http://placekitten.com/200/300'
    }
    console.log('MOOOOOOCK MOCK')
    next()
})

describe('comment tests', () => {
    beforeEach(() => {
        return setup(pool);
    });

    let user;
    let post1;
    let comment;
    beforeEach(async () => {
        user = await User.insert({
            username: 'Jake',
            photoUrl: 'http://placekitten.com/200/300'
        })

        post1 = await Post.insert({
            image: 'http://placekitten.com/200/300',
            caption: 'this is my first post',
            tags: ['first tag', 'second tag'],
            userId: user.username
        })

        comment = await Comment.insert({
            body: 'This is my sweet comment',
            postId: post1.id,
            userId: user.username
        })
    })

    it('it can post a comment using POST', () => {
        const comment2 = {
            body: 'this is my sweet second comment',
            postId: post1.id,
            userId: user.username
        }
        return request(app)
            .post('/api/v1/comments')
            .send(comment2)
            .then(res => {
                expect(res.body).toEqual({
                    id: "2",
                    ...comment2
                })
            })
    })

    it('it gets a comment by id with GET', () => {
        return request(app)
            .get(`/api/v1/comments/${comment.id}`)
            .then(res => {
                expect(res.body).toEqual(comment)
            })
    })

    it('it deletes a comment by id with DELETE', () => {
        return request(app)
            .delete(`/api/v1/comments/${comment.id}`)
            .then(res => {
                expect(res.body).toEqual(comment)
            })
    })

})