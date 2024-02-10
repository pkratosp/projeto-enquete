import { FastifyInstance } from "fastify";
import { prisma } from "../../lib/prisma";
import zod from "zod"
import { redis } from "../../lib/redis";

export async function appGetPoll(app: FastifyInstance) {

    
    app.get("/polls/:id", async (req,reply) => {

        const { params } = req
    
        const paramsSchema = zod.object({
            id: zod.string().uuid()
        })
    
        const { id } = paramsSchema.parse(params);
    

        const poll = await prisma.poll.findUnique({
            where: {
                id
            },
            include: {
                options: {
                    select: {
                        id: true,
                        title: true
                    }
                }
            }
        })

        if(!poll) {
            return reply.status(400).send("not found")
        }

        const result = await redis.zrange(id, 0, -1, "WITHSCORES")
    
        const votes = result.reduce((obj, line, index) => {
            if(index % 2 === 0) {
                const score = result[index + 1]

                Object.assign(obj,{ [line]: Number(score)})
            }

            return obj
        }, {} as Record<string, number>)


        return reply.status(200).send({
            poll: {
                id: poll.id,
                title: poll.title,
                options: poll.options.map(option => {
                    return {
                        id: option.id,
                        title: option.title,
                        score: (option.id in votes) ? votes[option.id] : 0
                    }
                })
            }
        })
    })


}