const http=require('http'); //HTTP Req
const socketio=require('socket.io'); //Socket.io Req
const server=http.createServer((req,res)=>{ //Req
    res.end("Test-2");//Response
});

server.listen(4000); //4000 Port
const io=socketio.listen(server); //Server 4000-i Socket.io Serveri'dinliyor


io.sockets.on('connection',(socket)=>{ //Socket Page'in Bize State Bildirimi
    console.log(socket.id+" ID 'Connected"); //Connection Durumunda Start
    //console.log(socket);

    socket.on('sendHello',(datas)=>{ //2.Paramtere Geçildiği İçin Alabildik.
        console.log('Client Says SendHello');
        console.log(datas.city); //Datas Object Type
         });
    
        socket.on('newUser',(data)=>{
            socket.username=data.name;
            console.log(data.name+" Chat'e Katıldı");
            socket.broadcast.emit('OtherUser',{name:data.name});
        });
    
    socket.on('disconnect',()=>{
    console.log(socket.id+" ID 'Disconnected"); //Disconnect Durumunda Stop
    console.log(socket.username+" Chat'den Ayrıldı.");
    socket.broadcast.emit('userDisconnect',socket.username); //??
        });
        
   
});