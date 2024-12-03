const express = require('express');
const app = express();

app.use(express.json());

const PORT = 4000;
app.listen(process.env.PORT || PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

const songs = [
    {
        id: 1,
        Title: 'Treasure',
        Genre: 'Pop',
        ReleaseYear: 2024,
        Artist: 'Bruno Mars',
        Likes: 0
    },
    {
        id: 2,
        Title: 'Daylight',
        Genre: 'Rap',
        ReleaseYear: 2023,
        Artist: 'Maroon 5',
        Likes: 0
    },
    {
        id: 3,
        Title: 'Viva la Vida',
        Genre: 'Reggae',
        ReleaseYear: 2022,
        Artist: 'Coldplay',
        Likes: 0
    }
];

let songId = songs.length;

//Get all songs
app.get('/songs', (req, res) => {
    res.status(200).json(songs);
});

//Get song by ID
app.get('/songs/:id', (req, res) => {
    const { id } = req.params;
    const song = songs.find(s => s.id == id);
    if (song) {
        res.status(200).json(song);
    } else {
        res.status(404).json({ message: 'Song not found' });
    }
});

//Create
app.post('/songs', (req, res) => {
    const { Title, Genre, ReleaseYear, Artist, Likes } = req.body;

    if (!Title || !Genre || !ReleaseYear || !Artist) {
        return res.status(400).json({ message: 'All fields (Title, Genre, ReleaseYear, Artist) are required' });
    }

    songId++;
    const newSong = {
        id: songId,
        Title,
        Genre,
        ReleaseYear,
        Artist,
        Likes: Likes || 0 
    };

    songs.push(newSong);
    res.status(201).json(newSong);
});

//Update
app.put('/songs/:id', (req, res) => {
    const { id } = req.params;
    const { Title, Genre, ReleaseYear, Artist, Likes } = req.body;
    
    const songIndex = songs.findIndex(s => s.id == id);
    if (songIndex !== -1) {
        const updatedSong = {
            ...songs[songIndex],
            Title: Title || songs[songIndex].Title,
            Genre: Genre || songs[songIndex].Genre,
            ReleaseYear: ReleaseYear || songs[songIndex].ReleaseYear,
            Artist: Artist || songs[songIndex].Artist,
            Likes: (Likes !== undefined) ? Likes : songs[songIndex].Likes
        };

        songs[songIndex] = updatedSong;
        res.status(200).json(updatedSong);
    } else {
        res.status(404).json({ message: 'Song not found' });
    }
});

//Delete
app.delete('/songs/:id', (req, res) => {
    const { id } = req.params;
    const songIndex = songs.findIndex(s => s.id == id);
    
    if (songIndex !== -1) {
        songs.splice(songIndex, 1);
        res.status(204).send();
    } else {
        res.status(404).json({ message: 'Song not found' });
    }
});
