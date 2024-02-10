import fastify from "fastify"
import cookie from "@fastify/cookie"
import { appCreatePoll } from "./routes/create-poll"
import { appGetPoll } from "./routes/get-poll"
import { appVotePoll } from "./routes/vote-on-poll"
import fastifyWebsocket from "@fastify/websocket"
import { pollResults } from "./ws/poll-results"


const app = fastify()

app.register(cookie, {
    secret: "vifhluihlfdguilhdfguilhfdgyuihdsafyuihdsfahuidsfauih",
    hook: "onRequest",
    parseOptions: {}
})


app.register(fastifyWebsocket)

app.register(appCreatePoll)
app.register(appGetPoll)
app.register(appVotePoll)
app.register(pollResults)

app.listen({
    port: 3333
}).then(() => {
    console.log("Http runing 3333")
})