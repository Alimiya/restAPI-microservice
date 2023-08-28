const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../restPostgre/index')
const expect = chai.expect
const {describe, it} = require('mocha')
require("dotenv").config({ path: "./restPostgre/config/.env" })


chai.use(chaiHttp)

const userId = '1'

describe('User Controller for PG', () => {
    describe('GET /api/pg/users', () => {
        it('should get all users', (done) => {
            chai.request(app)
                .get('/api/pg/users')
                .end((err, res) => {
                    expect(res.status).to.equal(200)
                    expect(res.body).to.be.an('array')
                    done()
                })
        }).timeout(10000)
        describe('GET /api/pg/users/:id', () => {
            it('should get a user by ID', (done) => {
                chai.request(app)
                    .get(`/api/pg/users/${userId}`)
                    .end((err,res)=>{
                        expect(res.status).to.equal(200)
                        expect(res.body).to.be.an('object')
                        done()
                    })
            })
        })
    })
    describe('POST /api/pg/users', () => {
        it('should create a new user', (done) => {
            const newUser = {
                fname: 'John',
                lname: 'Doe',
                email: 'john@example.com',
                password: 'password',
            }
            chai.request(app)
                .post('/api/pg/users')
                .send(newUser)
                .end((err,res)=>{
                    expect(res.status).to.equal(200)
                    done()
                })
        })
    })
    describe('PUT /api/pg/users/:id', () => {
        it('should update a user by ID', (done) => {
            const updatedUser = {
                fname: 'Updated John',
                lname: 'Updated Doe',
                email: 'updated_john@example.com',
                password: 'updated_password',
            }
            chai.request(app)
                .put(`/api/pg/users/${userId}`)
                .send(updatedUser)
                .end((err,res)=>{
                    expect(res.status).to.equal(200)
                    done()
                })

        })
    })
     // describe('DELETE /api/pg/users/:id', () => {
     //     it('should delete a user by ID', (done) => {
     //         chai.request(app)
     //             .delete(`/api/pg/users/${userId}`)
     //             .end((err,res)=>{
     //                 expect(res.status).to.equal(200)
     //                 done()
     //             })
     //
     //     })
     // })
})