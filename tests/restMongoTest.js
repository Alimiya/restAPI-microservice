const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../restMongo/index')
const expect = chai.expect
const {describe, it} = require('mocha')
require("dotenv").config({ path: "./restMongo/config/.env" })

chai.use(chaiHttp)

const userId = '64ece7f134ee94bc7a3f0060'

describe('User Controller for MongoDB', () => {
    describe('GET /api/mongo/users', () => {
        it('should get all users', (done) => {
            chai.request(app)
                .get('/api/mongo/users')
                .end((err, res) => {
                    expect(res.status).to.equal(200)
                    done()
        })
    }).timeout(100000)
    })
    describe('GET /api/mongo/users/:id', () => {
        it('should get a user by ID', (done) => {
            chai.request(app)
                .get(`/api/mongo/users/${userId}`)
                .end((err,res)=>{
                    expect(res.status).to.equal(200)
                    expect(res.body).to.be.an('object')
                    done()
                })
        })
    })
    describe('POST /api/mongo/users', () => {
        it('should create a new user', (done) => {
            const newUser = {
                fname: 'John',
                lname: 'Doe',
                email: 'john@example.com',
                password: 'password',
            }
            chai.request(app)
                .post('/api/mongo/users')
                .send(newUser)
                .end((err,res)=>{
                    expect(res.status).to.equal(201)
                    expect(res.body).to.be.an('object')
                    done()
                })
        })
    })
    describe('PUT /api/mongo/users/:id', () => {
        it('should update a user by ID', (done) => {
            const updatedUser = {
                fname: 'Updated John',
                lname: 'Updated Doe',
                email: 'updated_john@example.com',
                password: 'updated_password',
            }
            chai.request(app)
                .put(`/api/mongo/users/${userId}`)
                .send(updatedUser)
                .end((err,res)=>{
                    expect(res.status).to.equal(200)
                    expect(res.body).to.be.an('object')
                    done()
                })

        })
    })
    // describe('DELETE /api/mongo/users/:id', () => {
    //     it('should delete a user by ID', (done) => {
    //         chai.request(app)
    //             .delete(`/api/mongo/users/${userId}`)
    //             .end((err,res)=>{
    //                 expect(res.status).to.equal(200)
    //                 expect(res.body).to.be.an('object')
    //                 done()
    //             })
    //
    //     })
    // })
})