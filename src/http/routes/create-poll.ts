import { FastifyInstance } from "fastify";
import { prisma } from "../../lib/prisma";
import zod from "zod"

export async function appCreatePoll(app: FastifyInstance) {

    
    app.post("/polls", async (req,reply) => {

        const { body } = req
    
        const bodySchema = zod.object({
            title: zod.string(),
            options: zod.array(zod.string())
        })
    
        const { title, options } = bodySchema.parse(body);
    
        const create = await prisma.poll.create({
            data: {
                title,
                options: {
                    createMany: {
                        data: options.map(option => {
                            return { title: option }
                        })
                    }
                }
            }
        })
    
        return reply.status(201).send(create)
    })


}