// Dynamic filter
const express = require('express');
const app = express();

const elections = [
  { id: 1, name: 'President', type: 'SSG', year: 2024 },
  { id: 2, name: 'Governor', type: 'SSG', year: 2024 },
  { id: 3, name: 'President', type: 'General', year: 2023 },
];

app.get('/api/filters', (req, res) => {
  const types = [...new Set(elections.map(e => e.type))];
  const years = [...new Set(elections.map(e => e.year))];
  res.json({ types, years });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});

// Real time updates**

const http = require('http');
const socketIo = require('socket.io');
c
const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', (socket) => {
  console.log('User connected');

  // Broadcast results update
  socket.on('update-results', (data) => {
    io.emit('results-updated', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(3000, () => console.log('Server running on port 3000'));


//for realtime status update

app.get('/api/election-status', (req, res) => {
  const status = 'Completed'; // Change dynamically based on the state of the election.
  res.json({ status });
});