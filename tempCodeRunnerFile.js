
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