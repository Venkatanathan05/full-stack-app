const express = require('express')
const app = express()
const port = 3000

app.use(express.json());

const USERS = [];
const QUESTIONS = [{
    title: 'Two states',
    description: 'Given an array, return the maximum of the array',
    testCases: [{
        input: [1, 2, 3],
        output: 3
    }]
}];
const SUBMISSIONS = [];

app.post('/signup', function(req, res)  {
    const { email, password } = req.body;
    const userExists = USERS.some(user => user.email === email);
    if(userExists) return res.status(400).send("User already exists!");
    USERS.push({ email, password });
    res.status(200).send('Signup successful!');
});

app.post('/login', function(req, res)  {
    const { email, password } = req.body;
    const user = USERS.find(user => user.email === email);
    if(!user) return res.status(400).send("User does not exist");
    if(user.password !== password) return res.status(401).send("Invalid password");
    const token = math.random().toString(36).substring(7);
    res.status(200).send({ message: "Login successful", token });
});

app.get('/questions', function(req, res)  {
    res.status(200).json(QUESTIONS);
});

app.get('/submissions', function(req, res)  {
    res.status(200).json(SUBMISSIONS);
});

app.get('/submissions', function(req, res)  {
    const { userId, questionId, solution } = req.body;
    const isAccepted = Math.random() > 0.5;
    SUBMISSIONS.push({ userId, questionId, solution, isAccepted });
    res.status(200).json({ isAccepted });
});


app.listen(port, () => {
    console.log(`App listening on port ${port}`)
});