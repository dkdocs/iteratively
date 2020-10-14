import * as dotenv from 'dotenv';
import defaultConfig from './environments/development'
import * as _ from 'lodash';
dotenv.config()


const nodeEnv = process.env.NODE_ENV || 'development'

import(`./environments/${nodeEnv}`).then((envConfig) => {
	_.forEach(envConfig, (value, key) => {
		defaultConfig[key] = value
	})
}).catch((err) => { console.log(`failed to load ${nodeEnv} environment`) })


export default defaultConfig


