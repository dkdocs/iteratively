import App from './app'

import * as bodyParser from 'body-parser'
import EventsController from './controllers/events_controller'


const app = new App({
    port: 5000,
    controllers: [
       new EventsController()
    ],
    middleWares: [
        bodyParser.json(),
        bodyParser.urlencoded({ extended: true }),
        // Add new middlewares here
    ]
})

app.listen()