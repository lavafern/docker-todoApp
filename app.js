const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const {dbService} = require('./model/dbconnection')

const app = express()
app.set("view engine","ejs")
const port = 3001

app.use(cors())
app.use(express.json())
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));
app.use(bodyParser.urlencoded({extended : true}))

app.get('/',(req,res) => {

    const urlPath = '../views/index.ejs'
    dbService.fetchItemFromDb()
    .then(taskObject => res.render(urlPath,{ mytaskObject : taskObject }) )

})

app.post('/createuser',(req,res) => {
    // const urlPath = '../views/index.ejs'
    const datanya = req.body.ftaks
    dbService.createItemToDb(datanya)
    .then(() =>  res.redirect('/'))
})


app.listen(port,() => {
    console.log(`berhasil connect ke port ${port}`);
})
