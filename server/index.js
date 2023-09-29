const express = require("express")
const cors = require("cors")
const bodyparser = require("body-parser")
const db = require("mysql")
const connect = express()
connect.use(cors())
connect.use(bodyparser.json())
connect.use(express.json())
connect.use(express.static('public'))
connect.use(bodyparser.urlencoded({ extended: true }))
let databaseconnection = db.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "Maadhu@17",
    database: "arele"
})
databaseconnection.connect(function (error) {
    if (error) {
        console.log(error)
    }
    else {
        console.log("database is connected")
    }
    //register
    connect.post('/register', (request, response) => {
        let { fname, lname, phone, email, city, state, password } = request.body
        let sql = 'insert into register(fname,lname,phone,email,city,state,username,password)values(?,?,?,?,?,?,?,?)'
        databaseconnection.query(sql, [fname, lname, phone, email, city, state, email, password], (error, result) => {
            if (error) {
                response.send({ "status": "error" })
                console.log(error)
            }
            else {

                response.send({ "status": "success" })
            }
        })

    })
    //login
    connect.post('/login', (request, response) => {
        let { username, password } = request.body
        let sql = 'select * from register where username=?'
        databaseconnection.query(sql, [username], (error, result) => {
            if (error) {
                response.send({ "status": "empty set" })
            }
            else if (result.length > 0) {
                let dbusername = result[0].username
                let dbpassword = result[0].password
                let id = result[0].id
                if (dbusername === username && dbpassword === password) {
                    response.send({ "status": "success", "id": id })
                }
                else {
                    response.send({ "status": "invalid_user" })
                }
            }
            else {
                response.send({ "status": "error" })
            }
        })
    })
    //add products
    connect.post('/addproduct', (request, response) => {
        let { pname, p_des, category, quantity, price, from_loc } = request.body
        let sql = 'insert into product(pname,p_des,category,quantity,price,from_loc)values(?,?,?,?,?,?)'
        databaseconnection.query(sql, [pname, p_des, category, quantity, price, from_loc], (error, result) => {
            if (error) {
                response.send({ "status": "error" })
                console.log(error)
            }
            else {

                response.send({ "status": "success" })
            }
        })
    })
    //get all details in product
    connect.get('/getallproduct', (request, response) => {
        let sql = 'select * from  product'
        databaseconnection.query(sql, (error, result) => {
            if (error) {
                response.send(error)
            }
            else {
                response.send(result)
            }
        })
    })
    // products Update
    connect.put('/productupdate/:product_id', (request, response) => {
        let { product_id } = request.params
        let { pname, p_des, category, quantity, price } = request.body
        let sql = 'update product set pname=?,p_des=?,category=?,quantity=?,price=? where product_id=?'
        databaseconnection.query(sql, [pname, p_des, category, quantity, price, product_id], (error, result) => {
            if (error) {
                response.send({ "status": "error" })
                console.log(error)
            }
            else {
                response.send({ "status": "update" })
            }
        })
    })
    //get single data
    connect.get('/getsingle/:product_id', (request, response) => {
        let { product_id } = request.params
        let sql = 'select * from product where product_id=?'
        databaseconnection.query(sql, [product_id], (error, result) => {
            if (error) {
                response.send(error)
            }
            else {
                response.send(result)
            }
        })
    })
    //product delete
    connect.post('/delete', (request, response) => {
        let product_id = request.body.product_id
        let sql = 'delete from product where product_id=?'
        databaseconnection.query(sql, [product_id], (error, result) => {
            if (error) {
                response.send({ "status": "error" })
                console.log(error);
            }
            else {
                response.send({ "status": "success" })
            }
        })
    })
    //location get data
    connect.get('/getlocation', (request, response) => {
        let sql = 'select * from location'
        databaseconnection.query(sql, (error, result) => {
            if (error) {
                response.send(error)
            }
            else {
                response.send(result)
            }
        })
    })
    //dispatch  
    connect.post('/dispatch/:product_id', (request, response) => {
        let { product_id } = request.params
        let { pname, p_des, category, d_quantity, quantity, from_loc, to_loc, dispatchtime } = request.body
        var r_quantity = quantity - d_quantity

        let sql = 'insert into product_movement(pname,p_des,category,d_quantity,from_loc,to_loc,product_id,dispatchtime)values(?,?,?,?,?,?,?,?)'
        databaseconnection.query(sql, [pname, p_des, category, d_quantity, from_loc, to_loc, product_id, dispatchtime], (error, result) => {
            if (error) {
                response.send({ "status": "error" })
                console.log(error)
            }
            else {

                response.send({ "status": "success" })
            }
        })
        let updatesql = 'update product set quantity=? where product_id=?'
        databaseconnection.query(updatesql, [r_quantity, product_id], (error, result) => {
            if (error) {
                console.log(error)

            }
            else {
                console.log("updated in product table")
            }
        })
    })
    //  admin getsingle
    connect.get('/getsingleadmin/:id', (request, response) => {
        let { id } = request.params
        let sql = 'select * from register where id=?'
        databaseconnection.query(sql, [id], (error, result) => {
            if (error) {
                response.send(error)
            }
            else {
                response.send(result)
            }
        })
    })

    connect.listen(3017, () => {
        console.log("Data base is connected your port number is 3017")
    })
})