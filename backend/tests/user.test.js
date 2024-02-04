const UserController = require('../controllers/userController');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

beforeEach(() => {
    jest.mock('../models/userModel');
    jest.mock('jsonwebtoken');
    jest.mock('bcrypt');
});

describe('UserController', () => {
    test('Should register a new user', async () => {
        // Mocking the behavior of bcrypt.hash and User.save
        const hashedPassword = 'hashedPassword';
        jest.spyOn(bcrypt, 'hash').mockResolvedValue(hashedPassword);
        jest.spyOn(User.prototype, 'save').mockResolvedValue({
            _id: 'userId',
            email: 'test@example.com',
            password: hashedPassword,
        });

        const req = {
            body: {
                email: 'test@example.com',
                password: 'password123',
            },
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await UserController.userRegister(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Utilisateur créé: test@example.com',
        });
    });

    test('Should login a user', async () => {
        // Mocking the behavior of User.findOne, bcrypt.compare, and jwt.sign
        jest.spyOn(User, 'findOne').mockResolvedValue({
            _id: 'userId',
            email: 'test@example.com',
            password: 'hashedPassword',
        });
        jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);
        jest.spyOn(jwt, 'sign').mockResolvedValue('fakeToken');

        const req = {
            body: {
                email: 'test@example.com',
                password: 'password123',
            },
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await UserController.userLogin(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            token: 'fakeToken',
        });
    });  
});
