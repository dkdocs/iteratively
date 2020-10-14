import { Router, Request, Response, NextFunction } from 'express'
import upload from '../middleware/file_upload'
import IControllerBase from './interfaces/IControllerBase.interface'
import csvMiddleware from '../middleware/csv_middleware'
import createEventMiddleware from '../middleware/create_event_middleware'

class EventsController implements IControllerBase {
    public router: Router = Router()
    public path: string = '/events'

    constructor() {
        this.initRoutes();
    }

    public initRoutes() {
        this.router.post('/', upload.single('events'), csvMiddleware, createEventMiddleware, this.create)
    }

    public create = (req: Request, res: Response, next: NextFunction) => {
        console.log('I am index')
        res.send(req.file)
    }
}

export default EventsController