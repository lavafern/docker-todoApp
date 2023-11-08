require("dotenv").config()
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const {dbService} = require('./model/dbconnection')

const app = express()
app.set("view engine","ejs")
const port = 3002

app.use(cors())
app.use(express.json())
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));
app.use(bodyParser.urlencoded({extended : true}))

app.get("/tes", (req,res) => {
    res.json({
        data : "hello world"
    })
})

//read

app.get('/', async (req,res) => {
    const urlPath = '../views/index.ejs'
    const taskObject = await dbService.fetchItemFromDb()
    res.render(urlPath,{ mytaskObject : taskObject })

})

//create
app.post('/createtask',async (req,res) => {
    const datanya = req.body.ftaks
    if (datanya) {
        await dbService.createItemToDb(datanya)
    }
    res.redirect('/')
})

//delete
app.post('/deletetask',async (req,res) => {
    const datanya = req.body.taskid
    await dbService.deleteItem(datanya)
    res.redirect('/')
})

// update
app.post('/edittask', async (req,res) => {
    const id = req.body.taskid
    const name = req.body.taskname
    await dbService.updateItem(name,id)
    res.redirect('/')
    
})

// update status
app.post('/updataskstatus', async (req,res) => {
    const id = req.body.taskid
    const status = req.body.taskstatus
    await dbService.updateTaskStatus(status,id)
    res.redirect('/')
    
})

app.listen(port,() => {
    console.log(`berhasil connect ke port ${port}`);
})
