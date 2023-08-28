const db = require('../config/dbpg')

class UserController{
    async getUsers(req,res){
        const user = await db.query('SELECT * FROM users')
        res.json(user.rows)
    }
    async getUserById(req,res){
        const id=req.params.id
        const user=await db.query('SELECT * FROM users where id=$1', [id])
        res.json(user.rows[0])
    }
    async createUser(req,res){
        const {fname, lname, email,password}=req.body
        const user = db.query(
            'INSERT INTO users (fname, lname, email, password) values ($1, $2, $3, $4) RETURNING *', [fname, lname, email, password]
        )
        res.json(user.rows)
    }
    async updateUser(req,res){
        const {fname, lname, email,password}=req.body
        const user=await db.query('UPDATE users set fname=$1, lname=$2, email=$3, password=$4',[fname, lname, email, password])
        res.json(user.rows[0])
    }
    async deleteUser(req,res){
        const id=req.params.id
        const user=await db.query('DELETE FROM users where id=$1', [id])
        res.json(user.rows[0])
    }
}

module.exports=new UserController()