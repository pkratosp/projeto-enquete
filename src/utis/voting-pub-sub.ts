type Message = { pollOptionId: string, votes: number }
type Subscriber = (message: Message) => void

class VotingPubSut {
    private channels: Record<string, Subscriber[]> = {}

    subscribe(pollId: string, subscribe: Subscriber) {
        if (!this.channels[pollId]) {
            this.channels[pollId] = []
        }

        this.channels[pollId].push(subscribe)
    }

    publish(pollId: string, message:Message) {
        if(!this.channels[pollId]){
            return
        }

        for (const subscriber of this.channels[pollId]){
            subscriber(message)
        }

    }
}


export const voting = new VotingPubSut()