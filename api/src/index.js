// index.js
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import datastore from './datastore.js';
import inventory from './inventory.js';

const app = express();
const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const staticContentPath = path.join(__dirname, '../../web/dist');

app.set('json spaces', 2);

app.use(express.static(staticContentPath));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: '*' }));

// Middleware to authenticate a request by the Bearer token
async function authenticate(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Authorization header is required with a Bearer token' });
    }

    const token = authHeader.split(' ')[1];
    const session = await datastore.getSession(token);

    if (!session) {
        return res.status(401).json({ message: 'Invalid token!' });
    }

    req.session = session;

    next();
}

// Register an account with email and password
router.post('/register', async (req, res) => {
    const {username, password} = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    if (username.length < 3 || username.length > 50) {
        return res.status(400).json({ message: 'Username must be between 3 and 50 characters' });
    }

    if (password.length < 6 || password.length > 100) {
        return res.status(400).json({ message: 'Password must be between 6 and 100 characters' });
    }

    try {
        const account = await datastore.createAccount(username, password);
        const token = await datastore.createSession(account);

        return res.status(201).json({ message: 'Account created!', token });
    } catch (err) {
        return res.status(409).json({ message: err.message });
    }
});

// Log in to an existing account by username and password
router.post('/login', async (req, res) => {
    const {username, password} = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    const account = await datastore.findAccountByUsernameAndPassword(username, password);

    if (account) {
        const token = await datastore.createSession(account);

        res.status(200).json({
            message: 'Login successful!',
            token: token
        });
    } else {
        res.status(401).json({ message: 'Invalid credentials!' });
    }
});

// List all items available
router.get('/inventory', authenticate, (req, res) => {
    const query = req.query.q?.toLowerCase();

    if (query) {
        const result = inventory.filter(item => item.name.toLowerCase().includes(query));

        res.json(result);
    } else {
        res.json(inventory);
    }
});

// View the bag
router.get('/bag', authenticate, (req, res) => {
    res.json(req.session.bag);
});

// Add an item to the bag
router.post('/bag', authenticate, (req, res) => {
    const id = req.body.id;
    const item = inventory.find(item => item.id === id);

    if (item) {
        req.session.bag.push(item);
        res.json(req.session.bag);
    } else {
        res.status(404).json({ message: 'Item not found' });
    }
});

// Remove an item from the bag
router.delete('/bag/:id', authenticate, (req, res) => {
    const id = req.params.id || '';
    const index = req.session.bag.findIndex(item => item.id === id);

    if (index > -1) {
        req.session.bag.splice(index, 1);
        res.json(req.session.bag);
    } else {
        res.status(404).json({ message: 'Item not found in bag' });
    }
});

// Purchases items are in the bag with gold
router.post('/purchase', authenticate, (req, res) => {
    const account = req.session.account;
    const bag = req.session.bag;
    const gold = account.gold || 0;
    const goldRequired = bag.map(item => item.price || 0).reduce((a, b) => a + b, 0);

    if (gold >= goldRequired) {
        account.gold = account.gold - goldRequired;
        account.items.push(...bag);

        bag.splice(0);

        res.status(201).json({
            status: "success"
        });
    } else {
        res.status(409).json({ message: 'Not enough gold!' });
    }
});

// List possessions
router.get('/possessions', authenticate, (req, res) => {
    const account = req.session.account;

    res.json({
        gold: account.gold || 0,
        items: account.items || []
    });
});

// Use the router
app.use('/api', router);

// Start the server
app.listen(3001, () => {
    console.log('Server is running on port 3001');
});
