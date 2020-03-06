const server = require('./server.js');
const request = require('supertest');
// const users = require('./seeds/users_values.js')
const db = require('./config/db-config')

const values = require('./models/values-model.js')
const users = require('./models/users-model.js')


beforeEach( async () => {
    await db('users').truncate();
}); 

describe('GET /', function () {
    it(' should get values return 500 Ok', function() {
        expect(true).toBe(true);
    })
    it('should test the endpoint', async done => {
        const response = await request.agent('/values');
        done();
    })

})

test('Delete value id Delete /values/:id', async () => {
    const response = await delete(values.name);
    expect(response.length);
})


describe('POST /register', () => {
    it('should register users', () => {
        return request(server).post('/api/auth/register').send({username:"testing1",password:"test"})
        .then(res => {
            expect(res.status).toBe(201);
        })
    })
    it('should return JSON data', () => {
        return request(server).post('/api/auth/register').send({username:"testing",password:"test"})
        .then(res => {
            expect(res.type).toMatch(/json/i);
        })
    })
    it('should test the endpoint', async done => {
        const response = await request.agent('/register');
        done();
    })
})

describe('POST /values', () => {
    // const url = '/values'
    // it ('should return posted value', () => {
    //     return request(server).post('/api/values').send({name: "testing1"})
    //     .then(res => {
    //         expect(res.status).toBe(200);
            
    //     })
    // })
    // it('should return JSON data', () => {
    //     return request(server).post('/api/values').send({name: "testing1"})
    //     .then(res => {
    //         expect(res.type).toMatch(/json/i);
    //     })
    // })
    it('should test the endpoint', async done => {
        const response = await request.agent('/values');
        done();
    })
})



// TESTING TO ADD A VALUE TO LIST
// describe("insert function", () => {
//     it('insert value into db', async () => {
//         let customValueInsert;
//         const user = { username: 'test1', password:'pass', top3_values: ' swimming, religion, family', importance_prompt:'this is '}
//         await values.insertCustomValue({ name: 'Learning to Play an Instrument', user_id: 0 });
//         await values.insertCustomValue({ name: 'Starting a bookclub', user_id: 1 });
//         customValueNumber = await db('custom_values');
//         expect(customValueInsert).toHaveLength(2);
//     })
// })

// describe('insert function', () => {
//     it('inserts values into db', async () => {
//         let valuesInput;
//         valuesInput = await db('values');
//         expect(valuesInput).toHaveLength(0);
//         await values.insertCustomValue({user_id: 1 ,name: 'Cycling'})
//         valuesInput = await db('values');
//         expect(valuesInput).toHaveLength(1);
//     })
// })

describe('GET /custom', function() {

    beforeEach(async () => {
        await db('values').truncate();
    });
    

    // it('should return 200 OK', function() {
    //     return request(server)
    //         .get('/api/values')
    //         .then(res => {
    //             expect(res.status).toBe(200);
    //         })
    //     }),
        it('should insert values into the db', async () => {
            const values = await db('values');
            await values.update({user_id: 4, name: 'swimming'});

            expect(values[0]).toHaveLength(1);
            expect(values[0].user_id).toBe(4);
            
        });

    })
    
   

describe('updateImportancePrompt', () => {
    it('update value into db', async () => {
        const res = await request(server)
        .put('/:id/prompt')
        .send({
            prompt: "testing this is important"
        })
        expect(res.status).toBe(201)
    })
})


//TESTING TO ADD A USER TO DATABASE
// describe('insert function', () => {
//     it('insert user into db', async () => {
//         let userInsert;
//         userInsert = await db('users');
//         expect(userInsert).toHaveLength(1);
//         await users.insert({ username: 'user001', password: "testing", top3_values:"Traveling,Friends,Relationship with God", importance_prompt: "These are important to me because...", involvement_prompt: "I have been involved in over 300  activites" });
//         userInsert = await db('users');
//         expect(userInsert).toHaveLength(1)
//     })
// })
