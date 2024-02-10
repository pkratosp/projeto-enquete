import { FastifyInstance } from "fastify";
import zod from "zod"
import { voting } from "../../utis/voting-pub-sub";

export async function pollResults(app: FastifyInstance) {
    app.get("/polls/:pollId/results", { websocket: true }, (connection, request) => {

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