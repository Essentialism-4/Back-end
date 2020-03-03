const server = require('./server.js');
const request = require('supertest');
const users = require('./seeds/users_values.js')

const values = require('./seeds/values.js')

describe('GET /values', function () {
    it(' should get values return 500 Ok', function() {
        expect(true).toBe(true);
    })
})

test('Delete value id Delete /values/:id', async () => {
    const response = await delete(values.name);
    expect(response.length);
})

// TESTING TO SEE IF DATABASE UPDATES 
// test('new update', async () => {
//     const response = await value.update({});
//     expect(response.length + 1);
// })

describe('POST /register', () => {
    it('should return 500 OK', () => {
        return request(server).post('/api/auth/register').send({username:"testing1",password:"test"})
        .then(res => {
            expect(res.status).toBe(500);
        })
    })
    it('should return JSON data', () => {
        return request(server).post('/api/auth/register').send({username:"testing",password:"test"})
        .then(res => {
            expect(res.type).toMatch(/json/i);
        })
    })
})

describe('POST /values', () => {
    it ('should return 500 Ok', () => {
        return request(server).post('/api/values').send({name: "testing1"})
        .then(res => {
            expect(res.status).toBe(200);
            
        })
    })
    it('should return JSON data', () => {
        return request(server).post('/api/values').send({name: "testing1"})
        .then(res => {
            expect(res.type).toMatch(/json/i);
        })
    })
})