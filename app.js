const http=require('http'); //HTTP Req
const socketio=require('socket.io'); //Socket.io Req
const server=http.createServer((req,res)=>{ //Req
    res.end("Test-2");//Response
});

server.listen(4000); //4000 Port

const io=socketio.listen(server); //Server 4000-i Socket.io Serveri'dinliyor

io.on('connection',(socket)=>{ //Socket Page'in Bize State Bildirimi
     socket.on('joinRoom',(data)=>{
      socket.join(data.roomName,()=>{ //join(roomname,callback)
              io.to(data.roomName).emit('newUserJoin',{ userCount :getOnlineUserCount(io,data) }); //io.to -- socket.to  ---- io.in --socket.in 
              //socket Dersek Other Gibi Olur--io dersek All Gibi olur SignalR Daki Kullanımı İle
              socket.emit('onlyUser',{message:'You Are Connected Room Name:'+'<b>'+data.roomName+'.</b>'});
      });
   });
    socket.on('leaveRoom',(data)=>{
        socket.leave(data.roomName,()=>{
            io.to(data.roomName).emit('userLeave',{userCount:getOnlineUserCount(io,data)});
            socket.emit('onlyUserLeave',{message:'You Are Disconnected Room Name:'+'<b>'+data.roomName+'.</b>'})
        })
    });
});

const getOnlineUserCount=(io,data)=> io.sockets.adapter.rooms[data.roomName].length;


    