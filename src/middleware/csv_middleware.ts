import { Router, Request, Response, NextFunction } from 'express'

import event from '../services/events'
import { env } from 'process'
import to from 'await-to-js'

interface ReqWithData extends Request {
    events_data : []
}

 const csvMiddleware = async function(req: ReqWithData, res: Response, next: NextFunction) {
    const file_path = req.file.path
    const [error, data] = await to(event.parse_events_csv(file_path))
    if(error) { return next(error) }
    req.events_data = data
    return next()

}
export default csvMiddleware