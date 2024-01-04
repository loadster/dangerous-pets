import crypto from 'crypto';

const accounts = [];
const sessions = {};

async function createAccount(username, password) {
    if (await findAccountByUsernameAndPassword(username, password)) {
        throw new Error('Username taken!');
    } else {
        const account = {
            username,
            password,
            gold: 5000,
            items: []
        };

        accounts.push(account);

        return account;
    }
}

async function findAccountByUsernameAndPassword(username, password) {
    return accounts.find(a => a.username === username && a.password === password);
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