exports = module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('.....socket', socket.rooms)
    socket.join('globalChat', () => {
      socket.to('globalChat').emit('new user', { time: new Date().toTimeString().split(' ')[0],
        message: 'Welcome to global chat!' })
    })
    socket.on('userLogin', (user) => {
      // TODO: Does the server need to know the user?
      socket.emit('sendUserId', socket.id)
    })
//    socket.on('leave channel', (channel) => {
//      socket.leave(channel)
//    })
    socket.on('join channel', (channel) => {
      console.log('.....channel', channel)
      socket.join(channel, () => {
      })
    })
    socket.on('newMessage', (msg) => {
      msg = JSON.parse(msg)
      socket.emit('new message', { time: new Date().toTimeString().split(' ')[0],
        message: msg.message })
     console.log('.....test msgsssss', msg)
    });
//    socket.on('new channel', (channel) => {
//      socket.broadcast.emit('new channel', channel)
//    });
//    socket.on('typing', (data) => {
//      socket.broadcast.to(data.channel).emit('typing bc', data.user);
//    });
//    socket.on('stop typing', (data) => {
//      socket.broadcast.to(data.channel).emit('stop typing bc', data.user);
//    });
//    socket.on('new private channel', (socketID, channel) => {
//      socket.broadcast.to(socketID).emit('receive private channel', channel);
//    })
  });
}
