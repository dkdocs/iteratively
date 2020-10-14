import { GraphQLClient, gql } from 'graphql-request'
import to from 'await-to-js'
import * as csv_parser from 'csv-parser'
import * as fs from 'fs'
import config from '../config/index'

interface Properties {
    name: string,
    description: String,
    required: Boolean,
    type: string
}

interface CreateEventInput {
    name: string, description: string, properties: Properties[]
}



class Event {
    public static create_event(event: CreateEventInput): Promise<any> {
        return new Promise(async (resolve, reject) => {

            const endpoint = 'https://api-dev.iterative.ly/graphql'

            const graphQLClient = new GraphQLClient(endpoint, {
                headers: {
                    authorization: config.JWT.token
                }
            })

            const mutation = gql`
                        mutation CreateEvent($versionId: ID!, $input: CreateEventInput!) {
                            createEvent(versionId: $versionId, input: $input) {
                                id
                            }
                        }`

            const variables = {
                input: { name: event.name, description: event.description, properties: event.properties },
                versionId: 'b500aad6-dfd2-4257-9ec3-76cb2e0f5db2'
            }

            const [err, data] = await to(graphQLClient.request(mutation, variables))



            if (err) { reject(err) }
            return resolve(data)

        })

    }

    public static parse_events_csv(file_path: string): Promise<any> {
        return new Promise<any>((resolve, reject) => {

            const type_map = { 'string': '0', 'number': '1', 'boolean': '2', 'list': '3', 'object': '4' }

            const events_data = []

            let event: CreateEventInput = { name: '', description: '', properties: [] }

            try {

                fs.createReadStream(file_path)
                    .pipe(csv_parser())
                    .on('data', (row) => {
                        if (event.name === row['Event']) {
                            if (row['Event Property'] !== '') {
                                event.properties.push({
                                    name: row['Event Property'],
                                    description: row['Event Description'],
                                    required: true,
                                    type: type_map[row['Property Type']]
                                })
                            }

                        } else {
                            if (event.name !== '') {
                                events_data.push(event)
                            }
                            event = { name: '', description: '', properties: [] }
                            event.name = row['Event']
                            event.description = row['Description']
                            if (row['Event Property'] !== '') {
                                event.properties.push({
                                    name: row['Event Property'],
                                    description: row['Event Description'],
                                    required: true,
                                    type: type_map[row['Property Type']]
                                })
                            }

                        }


                    })
                    .on('end', () => {
                        events_data.push(event)
                        resolve(events_data)
                    });

            }
            catch (err) {
                reject(err)
            }


        })
    }
}

export default Event
export { CreateEventInput }