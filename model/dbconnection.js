const mysql = require("mysql2")
const {DB_HOST,DB_PORT,DB_USER,DB_PASSWORD,DB_NAME,DB_CONNECTION_LIMIT,SERVER_PORT} = process.env

const db = mysql.createPool({
    host : DB_HOST,
    user : DB_USER,
    password :DB_PASSWORD,
    database : DB_NAME,
    port: DB_PORT
})



class QueryActions {

    fetchItemFromDb() {
        try{
            return new Promise((resolve,reject) => {
                const sqlQuery = 'SELECT * FROM tasks'

                db.query(sqlQuery,(err,result) => {
                    if (err) {
                        console.log();
                        reject(new Error(err.message))
                    }else {
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
                const taskStatus = 0
                const sqlQuery = 'INSERT INTO tasks(task_name,task_status) values (?,?)'
                const value = [task_name,taskStatus]

                db.query(sqlQuery,value,(err,result) => {
                    if (err) {
                        reject(new Error(err.message))
                    } else {
                        resolve(result)
                    }
                })
            })
            }catch (er) {
                console.log(er);
            }
    }

    deleteItem(task_id) {

        try{
        return new Promise((resolve, reject) => {
            const sqlQuery = 'DELETE FROM tasks WHERE task_id = ?'
            db.query(sqlQuery,task_id,(err,result) => {
                if (err) {
                    reject(new Error(err.message))
                }else {
                    resolve(result)
                }
            })
        })} catch (er) {
            console.log(er);
        }
    }

    updateItem(task_name,task_id) {
        try {
            return new Promise((resolve, reject) => {

                const sqlQuery = 'UPDATE tasks set task_name=? where task_id=?'
                const value=[task_name,task_id]

                db.query(sqlQuery,value,(err,result) => {
                    if (err) {
                        reject(new Error(err.message))
                    }else {
                        resolve(result)
                    }
                })
            })
        }catch (er) {
            console.log(er);
        }

    }

    updateTaskStatus(task_status,task_id) {

        try {
            return new Promise((resolve, reject) => {
                const sqlQuery = 'UPDATE tasks set task_status=? where task_id=?'
                const value=[task_status,task_id]
                db.query(sqlQuery,value,(err,result) => {
                    if (err) {
                        reject(new Error(err.message))
                    }else {
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

exports.dbService = dbService