import {Request, Response, NextFunction } from 'express'
import event from '../services/events'
import to from 'await-to-js'

interface ReqWithEventData extends Request {
    events_data: []
}

const createEventMiddleware = async function (req: ReqWithEventData, res: Response, next: NextFunction) {
    const events_data = req.events_data
    try {
        for (const event_data of events_data) {
            const [err, data] = await to(event.create_event(event_data))
            if (err) {
                console.log(JSON.stringify(err))
            }else{
                console.log(data)
            }
        }
    }
    catch (err) {
        return next(err)
    }
    return next()

}

export default createEventMiddleware

