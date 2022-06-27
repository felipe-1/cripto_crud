const express = require('express');
const app = express();
const mysql = require("mysql")
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: 'root',
  host: 'localhost',
  password: 'root',
  database: 'cripto',
  dateStrings: 'date'
});

app.post('/add', (req, res) => {
  const name = req.body.name;
  const cod = req.body.cod;
  const price = req.body.price;

  db.query(
    'INSERT INTO coins (name, code, price, insert_date) VALUES (?,?,?, CURDATE());', 
    [name, cod, price], 
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
      }
    }
  );

  db.query(
    'SELECT * FROM coins', 
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send(result)
      }
    }
  );
});

app.get('/coins', (req, res) => {

  db.query(
    'SELECT * FROM coins', 
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send(result)
      }
    }
  );
});

app.get('/coins/:name', (req, res) => {

  let name = req.params.name;

  name += '%';

  db.query(
    'select * from coins where name like ?;',
    [name],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        console.log(result)
        res.send(result)
      }
    }
  );
});


app.put('/update/:id', (req, res) => {
  
  const id = req.params.id;

  const name = req.body.name;
  const cod = req.body.cod;
  const price = req.body.price;

  let sqlCommand = 'UPDATE coins SET ';
  let values = [];

  if (name !== '') {
    sqlCommand += 'name = ?, ';
    values.push(name);
  }
  if (cod !== '') {
    sqlCommand += 'code = ?, ';
    values.push(cod);
  }
  if (price !== '') {
    sqlCommand += 'price = ?, ';
    values.push(price);
  }

  sqlCommand += 'update_date = CURDATE()  WHERE id = ?;';
  values.push(id);
  
  db.query(
    sqlCommand, 
    values, 
    (err, result) => {
      if (err) {
        console.log(err)
      }
    }
  );

  db.query(
    'SELECT * FROM coins', 
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send(result)
      }
    }
  );

});


app.delete('/delete/:id', (req, res) => {
  const id = req.params.id;

  db.query(
    'DELETE FROM coins WHERE id = ?;', 
    id, 
    (err, result) => {
      if (err) {
        console.log(err)
      }
    }
  );

  db.query(
    'SELECT * FROM coins', 
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send(result)
      }
    }
  );
});


app.listen(3001, ()=> {
  console.log("Server is running on port 3001");
});

