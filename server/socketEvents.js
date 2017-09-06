exports = module.exports = (io) => {
  const models = require('./model/DB')
  const BlockCard = require('../src/components/db.json')
  io.on('connection', (socket) => {
    console.log('.....socket', socket.rooms)
    socket.join('globalChat', () => {
      socket.on('userLogin', (user) => {
        // TODO: Does the server need to know the user?
        models.Chat.findOne({ room: 'globalChat' }).populate('history').exec((err, chat) => {
          chat
            ? socket.emit('historyChat', JSON.stringify(chat.history))
            : models.Chat.create({ room: 'globalChat', history: [] }, (_chat) => {
              socket.emit('historyChat', { time: new Date().toTimeString().split(' ')[0],
                message: 'Welcome to global chat!' })
            })
        })
        models.Game.find({}, (err, games) => {
          socket.emit('listGames', JSON.stringify(games))
        })
        socket.emit('sendUserId', socket.id)
      })
    })
//    socket.on('leave channel', (channel) => {
//      socket.leave(channel)
//    })
    socket.on('join channel', (channel) => {
      socket.join(channel, () => {
      })
    })
    socket.on('newMessage', (msg) => {
      msg = JSON.parse(msg)
      let sendMess = (mess) => {
        socket.emit('historyChat', mess)
        socket.to('globalChat').emit('historyChat', mess)
      }
      models.Message.create({ userId: msg.userId, name: msg.name, text: msg.message, created_at: new Date() },
        (err, message) => {
          models.Chat.findOne({ room: msg.room }, (err, chat) => {
            return chat
              ? models.Chat.findByIdAndUpdate(chat._id, { $push: { history: message._id } }, { new: true })
                .populate('history').exec((err, _chat) => {
                  sendMess(JSON.stringify(_chat.history))
                })
              : models.Chat.create({ room: msg.room, history: [message._id] }, (_chat) => {
                sendMess([])
              })
          })
        })
    })
    socket.on('createGame', (id) => {
      models.Game.create({ users: [id], cards: BlockCard }, (err, res) => {
        models.Game.find({}, (err, games) => {
          socket.emit('listGames', JSON.stringify(games))
          socket.broadcast.emit('listGames', JSON.stringify(games))
        })
      })
    })
    socket.on('joinGame', (ids) => {
      ids = JSON.parse(ids)
      models.Game.findByIdAndUpdate(ids.gameId, { $push: { users: ids.userId } }, (err, res) => {
        models.Game.find({}, (err, games) => {
          socket.emit('listGames', JSON.stringify(games))
          socket.broadcast.emit('listGames', JSON.stringify(games))
        })
      })
    })
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
