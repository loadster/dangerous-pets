import crypto from 'crypto';
import bcrypt from 'bcrypt';

const accounts = [];
const sessions = {};

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