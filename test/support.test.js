const request = require('supertest');
const fs = require('fs');
const path = require('path');

const app = require('../src/index');

const storePath = path.join(__dirname, '..', 'messages.json');

beforeEach(() => {
    // reset messages file
    fs.writeFileSync(storePath, JSON.stringify([]));
});

test('POST /support-message stores message and returns success', async() => {
    const res = await request(app).post('/support-message').send({ name: 'Alice', email: 'a@x.com', message: 'Help me' });
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    const raw = fs.readFileSync(storePath, 'utf8');
    const arr = JSON.parse(raw);
    expect(arr.length).toBe(1);
    expect(arr[0].name).toBe('Alice');
});

test('POST /support-message missing field returns 400', async() => {
    const res = await request(app).post('/support-message').send({ name: 'Bob', email: '' });
    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
});