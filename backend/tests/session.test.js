const SessionController = require('../controllers/sessionController');
const VotingSession = require('../models/sessionModel');

beforeEach(() => {
    jest.mock('../models/sessionModel');
});

describe('SessionController', () => {
    test('Should list all voting sessions', async () => {
        // Mocking the behavior of VotingSession.find
        jest.spyOn(VotingSession, 'find').mockResolvedValue([
            {
                module_name: 'Module1',
                expiration_date: new Date(),
            },
            {
                module_name: 'Module2',
                expiration_date: new Date(),
            },
        ]);

        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await SessionController.listAllVotingSessions(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith([
            {
                module_name: 'Module1',
                expiration_date: expect.any(Date),
            },
            {
                module_name: 'Module2',
                expiration_date: expect.any(Date),
            },
        ]);
    });

    test('Should create a voting session', async () => {
        const saveMock = jest.fn().mockResolvedValue({
            module_name: 'Module3',
            expiration_date: new Date(),
        });
        jest.spyOn(VotingSession.prototype, 'save').mockImplementation(saveMock);

        const req = {
            body: {
                module_name: 'Module3',
            },
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await SessionController.createAVotingSession(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
            module_name: 'Module3',
            expiration_date: expect.any(Date),
        });
        expect(saveMock).toHaveBeenCalled();
    });

    test('Should get a voting session by id', async () => {
        jest.spyOn(VotingSession, 'findById').mockResolvedValue({
            module_name: 'Module1',
            expiration_date: new Date(),
        });

        const req = {
            params: {
                id_voting_session: '123456',
            },
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await SessionController.getAVotingSession(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            module_name: 'Module1',
            expiration_date: expect.any(Date),
        });
    });
});
