import * as dotenv from 'dotenv'
dotenv.config();

const config = {
	APP: {
		host: '0.0.0.0',
		port: 7000
	},
	DB: {
		host: process.env.HOST,
		user:  process.env.USER,
		password: process.env.PASSWORD,
		db_name: process.env.DB,
		dialect: 'postgres',
		pool: {
			max: 5,
			min: 0,
			acquire: 30000,
			idle: 10000
		}
	},
	JWT: { 
		token: process.env.JWT
	}
}

export default config
