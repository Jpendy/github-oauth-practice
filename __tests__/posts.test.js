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

describe('github-oauth-practice routes', () => {
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

    it('creates a post using the POST route', () => {
        const post2 = {
            image: 'http://placekitten.com/200/300',
            caption: 'this is my second post',
            tags: ['first tag', 'second tag'],
            userId: user.username
        }

        return request(app)
            .post('/api/v1/posts')
            .send(post2)
            .then(res => {
                expect(res.body).toEqual({
                    id: '2',
                    ...post2
                })
            })
    })

    it('it gets a list of all posts with GET', () => {
        return request(app)
            .get('/api/v1/posts')
            .then(res => {
                expect(res.body).toEqual([{
                    ...post1,
                    comments: [{
                        id: 1,
                        body: 'This is my sweet comment',
                        postId: 1,
                        userId: user.username
                    }]
                }])
            })
    })

    it('it gets a post and all it\'s comments by id with GET', () => {
        return request(app)
            .get(`/api/v1/posts/${post1.id}`)
            .then(res => {
                expect(res.body).toEqual({
                    ...post1,
                    comments: [{
                        id: 1,
                        body: 'This is my sweet comment',
                        postId: 1,
                        userId: user.username
                    }]
                })
            })
    })

    it('it updates a post by id with PUT', () => {
        return request(app)
            .put(`/api/v1/posts/${post1.id}`)
            .send({
                caption: 'my new caption',
                ...post1
            })
            .then(res => {
                expect(res.body).toEqual({
                    caption: 'my new caption',
                    ...post1
                })
            })
    })

    it('it deletes a post by id with DELETE', () => {
        return request(app)
            .delete(`/api/v1/posts/${post1.id}`)
            .then(res => {
                expect(res.body).toEqual(post1)
            })
    })
});