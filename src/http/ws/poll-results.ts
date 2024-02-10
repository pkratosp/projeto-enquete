import { FastifyInstance } from "fastify";
import zod from "zod"
import { voting } from "../../utis/voting-pub-sub";

export async function pollResults(app: FastifyInstance) {
    app.get("/polls/:pollId/results", { websocket: true }, (connection, request) => {

        // connection.socket.on('message', (message: string) => {
        //     // message.toString() === 'hi from client'
        //     // connection.socket.send('you send: ' + message)

        //     // setInterval(() => {
        //     //     connection.socket.send('server you send message')

        //     // }, 1000)
          
        // })

        const { params } = request
        const paramsSchema = zod.object({
            pollId: zod.string().uuid()
        })
        const { pollId } = paramsSchema.parse(params)

        voting.subscribe(pollId, (message) => {
            connection.socket.send(JSON.stringify(message))  
        })
    })
} 