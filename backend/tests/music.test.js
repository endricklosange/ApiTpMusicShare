const MusicController = require('../controllers/musicController');
const Music = require('../models/musicModel');
const Session = require('../models/sessionModel');

beforeEach(() => {
    jest.mock('../models/musicModel');
    jest.mock('../models/sessionModel');
});

describe('MusicController', () => {
    test('Should create a music', async () => {
        jest.spyOn(Session, 'findById').mockResolvedValue({
            _id: '12345684795',
            module_name: 'Module1',
            expiration_date: new Date(),
        });

        const saveMock = jest.fn().mockResolvedValue({
            _id: 'validMusicId',
            title: 'Song1',
            artist: 'Artist1',
            music_url: 'http://example.com/song1.mp3',
            id_voting_session: '12345684795',
        });
        jest.spyOn(Music.prototype, 'save').mockImplementation(saveMock);

        const req = {
            body: {
                title: 'Song1',
                artist: 'Artist1',
                music_url: 'http://example.com/song1.mp3',
                id_voting_session: '12345684795',
            },
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await MusicController.createAMusic(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Musique créée avec succès.',
            music: {
                _id: 'validMusicId',
                title: 'Song1',
                artist: 'Artist1',
                music_url: 'http://example.com/song1.mp3',
                id_voting_session: '12345684795',
            },
        });
        expect(saveMock).toHaveBeenCalled();
    });

    test('Should list all musics for a voting session', async () => {
        jest.spyOn(Music, 'find').mockResolvedValue([
            {
                _id: 'musicId1',
                title: 'Song1',
                artist: 'Artist1',
                music_url: 'http://example.com/song1.mp3',
                id_voting_session: '12345684795',
            },
            {
                _id: 'musicId2',
                title: 'Song2',
                artist: 'Artist2',
                music_url: 'http://example.com/song2.mp3',
                id_voting_session: '12345684795',
            },
        ]);

        const req = {
            params: {
                id_voting_session: '12345684795',
            },
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await MusicController.listAllMusics(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            musics: [
                {
                    _id: 'musicId1',
                    title: 'Song1',
                    artist: 'Artist1',
                    music_url: 'http://example.com/song1.mp3',
                    id_voting_session: '12345684795',
                },
                {
                    _id: 'musicId2',
                    title: 'Song2',
                    artist: 'Artist2',
                    music_url: 'http://example.com/song2.mp3',
                    id_voting_session: '12345684795',
                },
            ],
        });
    });

    test('Should list all musics', async () => {
        jest.spyOn(Music, 'find').mockResolvedValue([
            {
                _id: 'musicId1',
                title: 'Song1',
                artist: 'Artist1',
                music_url: 'http://example.com/song1.mp3',
                id_voting_session: 'session1',
            },
            {
                _id: 'musicId2',
                title: 'Song2',
                artist: 'Artist2',
                music_url: 'http://example.com/song2.mp3',
                id_voting_session: 'session2',
            },
        ]);

        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await MusicController.findAll(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Toutes les musiques récupérées avec succès.',
            musics: [
                {
                    _id: 'musicId1',
                    title: 'Song1',
                    artist: 'Artist1',
                    music_url: 'http://example.com/song1.mp3',
                    id_voting_session: 'session1',
                },
                {
                    _id: 'musicId2',
                    title: 'Song2',
                    artist: 'Artist2',
                    music_url: 'http://example.com/song2.mp3',
                    id_voting_session: 'session2',
                },
            ],
        });
    });
});
