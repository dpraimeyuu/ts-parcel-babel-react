import { IContext } from "cerebral";

export interface ITime {
    start(): void
    stop(): void
}

export type TimeConfiguration = {
    timeUpdated: string
}
export const Time = (configuration: TimeConfiguration) => {
    let timeStopper: number | undefined

    return (context: IContext): ITime => ({
        start() {
            const sequence = context.app.getSequence(configuration.timeUpdated)
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