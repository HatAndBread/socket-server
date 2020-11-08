const express = require('express');
const app = express();
const cors = require('cors');
const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
};
app.use(express.json());
app.use(cors(corsOptions));

const server = require('http').createServer(app);

const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true
  }
});

const PORT = process.env.PORT || 3001;

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`Listening to port ${PORT}👯‍♀️`);
});

app.get('/', (req, res) => {});

app.post('/', (req, res) => {
  if (req.body.type === 'pin') {
    //check if game valid
    console.log(req.body);
    res.send({ ok: true });
  } else if (req.body.type === 'name') {
    console.log(req.body);
    res.send({ ok: true });
  } else {
    console.log('unthinkable error');
  }
});
