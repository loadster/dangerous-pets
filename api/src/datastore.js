import crypto from 'crypto';
import bcrypt from 'bcrypt';

const MAX_ACCOUNTS = 100000;
const MAX_SESSIONS = 100000;

const accounts = [];
const sessions = {};
const sessionTokensInOrder = [];

async function createAccount(username, password) {
    const existingAccount = accounts.find(a => a.username === username);

    if (existingAccount) {
        throw new Error('Username taken!');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const account = {
        username,
        password: hashedPassword,
        gold: 5000,
        items: []
    };

    accounts.push(account);

    // FIFO: Remove oldest account if we exceed the limit
    if (accounts.length > MAX_ACCOUNTS) {
        accounts.shift();
    }

    return account;
}

async function findAccountByUsernameAndPassword(username, password) {
    const account = accounts.find(a => a.username === username);

    if (!account) {
        return null;
    }

    const isValid = await bcrypt.compare(password, account.password);
    return isValid ? account : null;
}

async function createSession(account) {
    const token = crypto.randomBytes(16).toString('hex');

    sessions[token] = {
        account,
        bag: []
    };

    sessionTokensInOrder.push(token);

    // FIFO: Remove oldest session if we exceed the limit
    if (sessionTokensInOrder.length > MAX_SESSIONS) {
        const oldestToken = sessionTokensInOrder.shift();
        delete sessions[oldestToken];
    }

    return token;
}

async function getSession(token) {
    return sessions[token];
}

export default {
    createAccount,
    findAccountByUsernameAndPassword,
    createSession,
    getSession
};