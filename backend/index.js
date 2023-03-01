import express from 'express';
import mysql from 'mysql';
import cors from 'cors';

//Create an app
const app = express();
//allows to send any json data express
app.use(express.json());

//middleware
app.use(cors());

//mysql connection
//if there is auth problem
//ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password;
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'mernbook_db'
})

//reach the backend server
app.get('/', (req, res) => {
    res.json("hello this is the backend server");

});

app.get('/books', (req, res) => {
    const q = `SELECT * FROM books`;
    db.query(q, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })

})
//user book details ADD
app.post('/books', (req, res) => {
    const q = "INSERT INTO books (`title`,`desc`,`cover`) VALUES (?)";
    const value = [
        // "title from backend server",
        //  "desc from backend server", 
        //  "cover from backend server"
        req.body.title,
        req.body.desc,
        req.body.cover,
    ];

    db.query(q, [value], (err, data) => {
        if (err) return res.json(err)
        return res.json("Book has been created successfully")
    })

})
//Delete user books
app.delete('/books/:id', (req, res) => {
    const bookId = req.params.id;
    const q = "DELETE FROM books WHERE id =?";

    db.query(q, [bookId], (err, data) => {
        if (err) return res.json(err)
        return res.json("Book has been Deleted successfully")
    })
})
//Update user book details
app.put('/books/:id', (req, res) => {
    const bookId = req.params.id;
    const q = "UPDATE books SET `title` =?, `desc` =?, `cover` =? WHERE id =?";


    const value = [
        // "title from backend server",
        //  "desc from backend server", 
        //  "cover from backend server"
        req.body.title,
        req.body.desc,
        req.body.cover,
    ];

    db.query(q, [...value, bookId], (err, data) => {
        if (err) return res.json(err)
        return res.json("Book has been Updated successfully")
    })
})

//listen to port number
app.listen(3000, () => {
    console.log('Connected to backend listening on port');
})