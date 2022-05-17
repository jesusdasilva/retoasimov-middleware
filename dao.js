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

    return  await httpClient.get(url, { params });
}

const reservation = {
    async getAll() {
        const { data } = await findByQuery(URL.API_RESERVATION)
        
        return data
    },
    async getDisabledDays({rYear,rMonth}){
        const params = {rYear,rMonth}
        const { data } = await findByQuery(URL.API_RESERVATION_DISABLED_DAYS, params)

        return data
    },
    async getDisabledHours({rYear,rMonth, rDay}){
        const params = {rYear,rMonth, rDay}
        const { data } = await findByQuery(URL.API_RESERVATION_DISABLED_HOURS, params)

        return data
    },
    async getActive({ rEmail, rYear,rMonth, rDay }) {
        const params = { rEmail, rYear,rMonth, rDay }
        const { data } = await findByQuery(URL.API_RESERVATION_ACTIVE, params)
    
        return data
    },
    async isAvailable({ rYear, rMonth, rDay, rHour }) {
        const params = { rYear,rMonth, rDay, rHour }
        const { data } = await findByQuery(URL.API_RESERVATION_AVAILABLE_HOUR, params)
        
        return data.length === 0
    },
    async create({ rFirstName, rLastName, rPhone, rEmail, rYear, rMonth, rDay, rHour }) {
        const params = { rFirstName, rLastName, rPhone, rEmail, rYear, rMonth, rDay, rHour }
        const { data } = await httpClient.post(URL.API_RESERVATION+'/', params)
        
        return data
    }
}

export default {
    reservation,
}