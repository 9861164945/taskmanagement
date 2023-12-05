const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3000;

const saltRounds = 10;

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'S@24onut',
    database: 'Sambit'
});

app.use(bodyParser.json());

app.post("/storetask", (req, resp) => {
    const data = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    };

    bcrypt.hash(data.password, saltRounds, (err, hash) => {
        if (err) throw err;
        data.password = hash;

        pool.query('INSERT INTO users SET ?', data, (error, result) => {
            if (error) throw error;
            resp.send(result);
            console.warn("task added successfully");
        });
    });
});

app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    pool.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else if (results.length > 0) {
            const user = results[0];

            if (await bcrypt.compare(password, user.password)) {
                const token = jwt.sign({ username: user.username }, 'your-secret-key');
                res.json({ token });
            } else {
                res.status(401).json({ error: 'Invalid credentials' });
            }
        } else {
            res.status(401).json({ error: 'User not found' });
        }
    });
});

app.post("/storedata", (req, resp) => {
    const item = { title: "car detection", description: "this is a machine learning project", due_date: "22-12-2002", status: "complete" };

    pool.query('INSERT INTO task_management SET ?', item, (error, result) => {
        if (error) {
            console.warn("error", error);
        } else {
            console.warn("inserted successfully:", result);
        }
    });
});

app.put("/storedata/:id", (req, resp) => {
    const itemId = req.params.id;
    const item = { title: "car", description: "machine learning project", due_date: "22-12-2002", status: "complete" };

    pool.query("UPDATE task_management SET ? WHERE id = ?", [item, itemId], (err, result) => {
        if (err) {
            console.warn("error", err);
        } else {
            console.warn("updated successfully:", result);
        }
    });
});

app.delete("/:title", (req, resp) => {
    const titleToDelete = req.params.title;
    resp.send(titleToDelete);

    pool.query("DELETE FROM task_management WHERE title = ?", [titleToDelete], (error, result) => {
        if (error) {
            console.warn("error", error);
        } else {
            console.warn("deleted successfully", result);
        }
    });
});
app.get("/sambit",(req,resp)=>{
    resp.send('<h1>sambit kumar swain</h1>');
})

app.listen(port, () => {
    console.log('Server is running on port ${port}');
});