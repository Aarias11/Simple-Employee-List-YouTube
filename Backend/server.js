const express = require('express')
const mysql = require('mysql')
const cors = require('cors')


// connect to express app
const app = express();


//connect to mysql
const db = mysql.createConnection({ 
    user: 'root',
    host: 'localhost',
    password: 'password',
    database: 'employee_info'
})

app.listen(3001, () => {
    console.log('Server is running on port 3001')
})

// middleware
app.use(express.json())
app.use(cors())



//Routes
//POST REQUEST
app.post('/create', (req, res) => {
    const { name, age } = req.body
    db.query(
        'INSERT INTO employees (name, age) VALUES (?, ?)',
        [ name, age ],
        (err, result) => {
            if(err) {
                console.log('Values were successfully inserted')
            } else {
                res.send('The Values were successfully inserted')
            }
        }
    )
})


//GET REQUEST
app.get('/employees', (req, res) => {
    db.query('SELECT * FROM employees', (err, result) => {
        if(err) {
            console.log(err)
        } else {
            res.json(result)
        }
    })
})


//UPDATE REQUEST
app.put('/employees', (req, res) => {
    const { id } = req.body
    const { name } = req.body
    db.query(
        'UPDATE employees SET name = ? WHERE id = ?', [ name, id ],
        (err, result) => {
            if(err) {
                console.log(err)
            } else {
                res.send(result)
            }
        }
    )
})




//DELETE REQUEST
app.delete('/employees/:id', (req, res) => {
    const { id } = req.params
    db.query('DELETE FROM employees WHERE id = ?', id, (err, result) => {
        if(err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
})



// Create // POST REQUEST
// Reading // GET REQUEST
// Updating // PUT or PATCH REQUEST
// Delete // DELETE REQUEST