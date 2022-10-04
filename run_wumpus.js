const {WebSocket} = require("ws");


const socket = new WebSocket(`wss://4yyity02md.execute-api.us-east-1.amazonaws.com/ws?token=${token}`);
socket.on('open', function open() {
    socket.on('message',  async function  catchMessage(data) {
        try{
            let message = JSON.parse(data);
            switch (message.event) {
                case "challenge":
                    break;
                case "your_turn":
                    let responseWebSocket = "";
                    if(Math.floor(Math.random() * 6) >= 2 ){
                        responseWebSocket = process_action(message, "MOVE")
                    }else{
                        responseWebSocket = process_action(message, "SHOOT")
                    }
                    socket.send(responseWebSocket);
                    break;  
                case "list_users":
                    break;
                case "game_over":
                    break;
                default:
                    break;
            }
        }catch(e){
            console.log("Error : ",e)
        }
    });
});


const process_action = (data, action) => {
    const directions = ["NOTH","SOUTH","EAST","WEST"]
    return JSON.stringify({
        action: action, 
        data: {
            "game_id": data.data.game_id,
            "turn_token": data.data.turn_token,
            "from_row": Math.floor(Math.random() * 18),
            "from_col": Math.floor(Math.random() * 18),
            "direction":directions[Math.floor(Math.random() * directions.length)]
        }
    })
}
