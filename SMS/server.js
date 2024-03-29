const debug = require("debug")("node-angular");
const http = require("http");
const app = require("./backend/app")

const normalizePort = val =>{
  var port = parseInt(val, 10);

  if(isNaN(port)){
    return val;
  }

  if(port >=0){
    return port
  }
  return false;
}

const onError =error =>{
  if(error.syscall != "listen"){
    console.log(error)
    throw error
  }

  const bind = typeof addr === "string" ? "pipe " + addr : "port " +port

  switch(error.code){
    case "EACCESS":
      console.error(bind + " requires evevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      console.error(error)
      throw error;
  }
}

const onListning =() =>{
  const addr = server.address();
  const bind =  typeof addr === "string" ? "pipe " + addr : "port " +port
  debug("Listing on " + bind)
}

const thisPort = process.env.PORT || 3000
const port = normalizePort(thisPort)
app.set('port', port)

const server = http.createServer(app)
server.on("error",onError);
server.on("listing",onListning);
server.listen(port)
