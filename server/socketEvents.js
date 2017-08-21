exports = module.exports = (io) => {
  io.on('connection', (socket) => {
    socket.join('Lobby')
    socket.on('chat mounted', (user) => {
      // TODO: Does the server need to know the user?
      socket.emit('receive socket', socket.id)
    })
    socket.on('leave channel', (channel) => {
      socket.leave(channel)
    })
    socket.on('join channel', (channel) => {
      socket.join(channel.name)
    })
    socket.on('new message', (msg) => {
      socket.broadcast.to(msg.channelID).emit('new bc message', msg);
    });
    socket.on('new channel', (channel) => {
      socket.broadcast.emit('new channel', channel)
    });
    socket.on('typing', (data) => {
      socket.broadcast.to(data.channel).emit('typing bc', data.user);
    });
    socket.on('stop typing', (data) => {
      socket.broadcast.to(data.channel).emit('stop typing bc', data.user);
    });
    socket.on('new private channel', (socketID, channel) => {
      socket.broadcast.to(socketID).emit('receive private channel', channel);
    })
  });
}
