var net = require("net");
var fs = require("fs");
var port = 2002;

var connections = [];
var messages = [];

var server = net.createServer();
  
server.on('connection', function(connection){
  connection.write("welcome to my magic chatroom shoppe\n please chat now\n");
  connection.setEncoding("utf8");
  
  var sendToAll = function sendToAll(message, sender) { 
        for (var i = 0; i < connections.length; i++){
            if(sender !== connections[i]){
              connections[i].write(message); 
           }
      };
         console.log("current connections: " + connections.length);
  }
    connections.push(connection);
    
    connection.on('end',function(){
        connections.splice(connections.indexOf(connection), 1); //this chops the array down so that the client who left is no longer inside the array.
        sendToAll(connection.name + " left the chat.\n");
       console.log("now there are: " + connections.length + " connections");
    });
    
    messages.forEach(function(element){ 
      connection.write(element);
    });  

    connection.on('data', function(incomingData){
      messages.push(incomingData);
      sendToAll(incomingData, connection);

    })
}); 

server.listen(port, function(){
  console.log("Server up and running, listening on " + port);
})