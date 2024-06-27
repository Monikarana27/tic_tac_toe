const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());
const PORT = 3000;

let users = [];
if (fs.existsSync('users.json')) {
    users = JSON.parse(fs.readFileSync('users.json'));
}

app.post('/signup', (req, res) => {
    const { username, password } = req.body;
    if (users.find(user => user.username === username)) {
        return res.status(400).send('User already exists');
    }
    users.push({ username, password });
    fs.writeFileSync('users.json', JSON.stringify(users));
    res.status(200).send('Sign up successful');
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(user => user.username === username && user.password === password);
    if (!user) {
        return res.status(400).send('Invalid credentials');
    }
    res.status(200).send('Login successful');
});

app.post('/result', (req, res) => {
    const { username } = req.body;
    console.log('Game over for user: ${username}');
    res.status(200).send('Result recorded');
});

app.listen(PORT, () => {
    console.log('Server is running on http://localhost:${PORT}');
});