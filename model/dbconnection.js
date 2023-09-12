const mysql = require('mysql')

const db = mysql.createPool({
    host : 'localhost',
    user : 'root',
    paswword :"",
    database : 'todo_node',
    port: '3306'
})

exports.db = db

class QueryActions {

    async fetchItemFromDb() {
        try{
            const response = await new Promise((resolve,reject) => {
                const sqlQuery = 'SELECT * FROM tasks'
                
                db.query(sqlQuery,(err,res) => {
                    if (err) {
                        reject(new Error('fetchItemFromDb db.query failed'))
                    }else {
                        const taskObject = Object.values(JSON.parse(JSON.stringify(result)))
                    }
                })

            })

            console.log(response);

        }catch(er) {
            console.log(er);
    }
    }

    // async createItemToDb()  {

        // const response = 
    // }


}

const dbService = new QueryActions()

exports.dbService = dbService