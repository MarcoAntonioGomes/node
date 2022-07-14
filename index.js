const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database:'nodedb'
};

const mysql = require('mysql')
const connection = mysql.createConnection(config)


var sqlCreateTable = "CREATE TABLE IF NOT EXISTS people (id int  NOT NULL PRIMARY KEY AUTO_INCREMENT,  name VARCHAR(255))";
connection.query(sqlCreateTable)


const sql = `INSERT INTO people(name) values('Wesley')`
connection.query(sql)


const sqlNames = `SELECT name FROM people;`
var namesFormated = ''
connection.query(sqlNames, function (error, results) {
    if (error) {
      console.log("Erro ao obter os nomes cadastrados!" + error) 
    }
    else {
        results.forEach(formattNames)
    }

});
connection.end()

function formattNames(element) {
  namesFormated = namesFormated + element.name + '<br> '
}

app.get('/', (req, res) => {
    res.send('<h1>Full Cycle</h1> <br> Lista de Nomes: <br>' +  namesFormated)
})

app.listen(port, ()=> {
    console.log('Rodando na porta ' + port)
})