import axios from 'axios'
import { URL } from './config.js'

const httpClient = axios.create({
	baseURL: URL.BASE,
	timeout: 10000,
	headers: {
		'Content-Type': 'application/json',
		accept: 'application/json',
	},
})

const findByQuery = async (url, params = '') => {

    const response = await httpClient.get(url, { params })

    return response
}

const reservation = {
    async getAll() {
        const { data } = await findByQuery(URL.API_RESERVATION)
        
        return data
    },
    async getDisabledDatesByMonth(_month){
        const params = { _month }
        const { data } = await findByQuery(URL.API_RESERVATION_DISABLED_DATES, params)

        return data
    },
    async getDisabledHoursByDate(_date){
        const params = { _date }
        const { data } = await findByQuery(URL.API_RESERVATION_DISABLED_HOURS, params)

        return data
    },
    // async getByDate(rDate) {
    //     params = { rDate }
    //     const { data } = await findByQuery(URL.API_RESERVATION_DATE, params)
    
    //     return data
    // },
    async isValid({ rEmail, _date }) {
        const params = { 
            rEmail: encodeURI(rEmail), 
            rDate: _date
        }
        const { data } = await findByQuery(URL.API_RESERVATION_ACTIVE, params)

        return data.length === 0
    },
    async isAvailable({ rDate, rHour }) {
        const params = { rDate, rHour: encodeURI(rHour) }
        const { data } = await findByQuery(URL.API_RESERVATION_AVAILABLE, params)
        
        return data.length === 0
    },
    async create({ rFirstName, rLastName, rPhone, rEmail, rHour, rDate }) {
        const params = { rFirstName, rLastName, rPhone, rEmail, rHour, rDate }
        console.log(URL.API_RESERVATION,)
        const { data } = await httpClient.post(URL.API_RESERVATION+'/', params)
        return data
    }
}

export default {
    reservation,
}