export interface ITime {
    start(): void
    stop(): void
}

export const Time = (seq: any) => {
    let timeStopper: number | undefined

    return (context: any): ITime => ({
        start() {
            const sequence = context.app.getSequence(seq)
            if(sequence) {
                timeStopper = setInterval(() => {
                    sequence()
                }, 1000)
            }
        },
        stop() {
            clearInterval(timeStopper)
        }
    })
}

export const startTimeFlow = ({ time }: { time: ITime }) => time.start()
export const stopTimeFlow = ({ time }: { time: ITime }) => time.stop()