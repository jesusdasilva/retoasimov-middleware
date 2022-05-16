import moment from 'moment';
import dao from './dao.js';
import { HTTP_STATUS_CODES, MESSAGE } from './config.js';

export default {
    async list() { 
        let httpStatus = HTTP_STATUS_CODES.OK;
        let data = await dao.reservation.getAll() || [];
        let message = data 
            ? { text: MESSAGE.TEXT.RESERVATION_LIST.replace('COUNT', data.length), type: MESSAGE.TYPE.SUCCESS }
            : { text: MESSAGE.TEXT.RESERVATION_EMPTY, type: MESSAGE.TYPE.ERROR };

        return { httpStatus, data, message };
    },
    async disabledDays({rYear,rMonth}) {
        let httpStatus = HTTP_STATUS_CODES.OK;
        let message = {text: MESSAGE.TEXT.RESERVATION_ALL_DATES_AVAILABLE, type: MESSAGE.TYPE.INFO};

        const values = {rYear,rMonth}
        const data = await dao.reservation.getDisabledDays(values) || [];
        
        if(data.length > 0) {
            message.text = MESSAGE.TEXT.RESERVATION_DISABLED_DATES.replace('COUNT', data.length);
        }            

        return { httpStatus, data, message };
    },
    async disabledHours({rYear,rMonth, rDay}) {
        let httpStatus = HTTP_STATUS_CODES.OK;
        let message = { text: MESSAGE.TEXT.RESERVATION_ALL_HOURS_AVAILABLE, type: MESSAGE.TYPE.INFO };

        const values = {rYear,rMonth, rDay}
        const data = await dao.reservation.getDisabledHours(values) || [];
        
        if(data.length > 0) {
            message.text = MESSAGE.TEXT.RESERVATION_DISABLED_HOURS.replace('COUNT', data.length);
        }            

        return { httpStatus, data, message };
    },
    async active({ rEmail, rYear, rMonth, rDay }) {
        let httpStatus = HTTP_STATUS_CODES.OK;
        let message = { text: MESSAGE.TEXT.RESERVATION_ALLREADY_EXISTS, type: MESSAGE.TYPE.INFO };

        const values = { rEmail, rYear, rMonth, rDay }
        const data = await dao.reservation.getActive(values) || [];
        
        if(data.length == 0) {
            message.text = MESSAGE.TEXT.RESERVATION_RESERVATION_NOT_ACTIVE;
        }            

        return { httpStatus, data, message };
    },
    async create({rFirstName, rLastName, rEmail, rPhone, rHour, rDay, rMonth, rYear}) {
        let httpStatus = HTTP_STATUS_CODES.OK;
        let message = { text: MESSAGE.TEXT.RESERVATION_ALLREADY_EXISTS, type: MESSAGE.TYPE.ERROR };
 
        const values = { rEmail, rYear, rMonth, rDay }
        let data = await dao.reservation.getActive(values) || {rFirstName, rLastName, rEmail, rPhone, rHour, rDay, rMonth, rYear};
        
        if(data.length == 0){
            message = { text: MESSAGE.TEXT.RESERVATION_IS_NOT_AVAILABLE, type: MESSAGE.TYPE.ERROR };
            
            const values = {rYear,rMonth, rDay, rHour}

            if(await dao.reservation.isAvailable(values)){ 
                const values = {rFirstName, rLastName, rEmail, rPhone, rHour, rDay, rMonth, rYear};

                data = await dao.reservation.create(values);
                httpStatus = HTTP_STATUS_CODES.CREATED;
                message = { text: MESSAGE.TEXT.RESERVATION_CREATE, type: MESSAGE.TYPE.SUCCESS };
            }
        }

        return { httpStatus, data, message };
    }
}