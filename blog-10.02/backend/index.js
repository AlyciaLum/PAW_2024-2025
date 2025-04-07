const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());


const postsPath = './backend/data/posts.json';
const commentsPath = './backend/data/comments.json';


app.get('/posts', (req, res) => {
    const posts = JSON.parse(fs.readFileSync(postsPath));
    res.json(posts);
});


app.get('/posts/:id', (req, res) => {
    const posts = JSON.parse(fs.readFileSync(postsPath));
    const comments = JSON.parse(fs.readFileSync(commentsPath));
    const post = posts.find(p => p.id == req.params.id);
    const postComments = comments.filter(c => c.postId == req.params.id);
    res.json({ post, comments: postComments });
});


app.post('/comments', (req, res) => {
    const comments = JSON.parse(fs.readFileSync(commentsPath));
    const newComment = {
        id: Date.now(),
        postId: req.body.postId,
        author: req.body.author,
        content: req.body.content
    };
    comments.push(newComment);
    fs.writeFileSync(commentsPath, JSON.stringify(comments, null, 2));
    res.status(201).json(newComment);
});

app.listen(PORT, () => {
    console.log(`Backend działa na http://localhost:${PORT}`);
});
