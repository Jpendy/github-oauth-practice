const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const User = require('../lib/models/User');

describe('github-oauth-practice routes', () => {
    beforeEach(() => {
        return setup(pool);
    });
    let user;
    beforeEach(async () => {
        user = await User.insert({
            username: 'Jake',
            photoUrl: 'http://placekitten.com/200/300'
        })
    })

    it('creates a post using the post route', () => {

        return request(app)
            .post('/api/v1/posts')
            .send({

            })
            .then(res => {
                expect(res.body).toEqual({

                })
            })

    })
});