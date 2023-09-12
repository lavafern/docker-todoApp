const mysql = require('mysql')

const db = mysql.createPool({
    host : 'localhost',
    user : 'root',
    paswword :"",
    database : 'todo_node',
    port: '3306'
})



class QueryActions {

    fetchItemFromDb() {
        try{
            return new Promise((resolve,reject) => {
                const sqlQuery = 'SELECT * FROM tasks'
                console.log('before sqlQuery');

                db.query(sqlQuery,(err,result) => {
                    console.log('after Querying');
                    if (err) {
                        console.log('rejected')
                        reject(new Error('fetchItemFromDb db.query failed'))
                    }else {
                        console.log('good')
                        resolve(Object.values(JSON.parse(JSON.stringify(result))))
                    }
                })

            })

        }catch(er) {
            console.log(er);
    }
    }

    createItemToDb(task_name)  {

        try{
            return new Promise((resolve,reject) => {
                const taksStatus = 0
                const sqlQuery = 'INSERT INTO tasks(task_name,taks_status) values (?,?)'
                const value = [task_name,taksStatus]

                db.query(sqlQuery,value,(err,result) => {
                    if (err) {
                        reject(new Error('query failed!'))
                    } else {
                        resolve(result)
                    }
                })
            })
            }catch (er) {
                console.log(er);
            }
    }


}

const dbService = new QueryActions()

exports.db = db
exports.dbService = dbService