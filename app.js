const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const {db} = require('./model/dbconnection')

const app = express()
app.set("view engine","ejs")
const port = 3001

app.use(cors())
app.use(express.json())
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));
app.use(bodyParser.urlencoded({extended : true}))

app.get('/',(req,res) => {
    const sqlQuery = 'SELECT * FROM tasks'

    db.query(sqlQuery, (err,result) => {
        if (err) {
            console.log(err);
        }else {
            const taskObject = Object.values(JSON.parse(JSON.stringify(result)))
            console.log(taskObject);
            res.render('../views/index.ejs',{ mytaskObject : taskObject })
        }
    })

    

})

app.get('/api/test',(req,res) => {

    // const sqlQuery = 'SELECT * FROM tasks'

    // db.query(sqlQuery,(err,result) => {
        // if (err) {
            // console.log(err);
        // }else {
            // res.send(result)
        // }
    // })
    
    res.render('../views/index.ejs')
})


app.listen(port,() => {
    console.log(`berhasil connect ke port ${port}`);
})
