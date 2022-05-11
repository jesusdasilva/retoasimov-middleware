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
    async disabledDates({_month}) {
        let httpStatus = HTTP_STATUS_CODES.OK;
        let data = { _month };
        let message = { text: MESSAGE.TEXT.RESERVATION_ALL_DATES_AVAILABLE, type: MESSAGE.TYPE.INFO };

        data = await dao.reservation.getDisabledDatesByMonth(_month);
        
        if(data.length > 0) {
            message.text = MESSAGE.TEXT.RESERVATION_DISABLED_DATES.replace('COUNT', data.length);
        }            

        return { httpStatus, data, message };
    },
    async create({rFirstName, rLastName, rEmail, rPhone, rHour, rDate}) {
        let httpStatus = HTTP_STATUS_CODES.OK;
        let data = { rFirstName, rLastName, rEmail, rPhone, rHour, rDate };
        let message = { text: MESSAGE.TEXT.RESERVATION_ALLREADY_EXISTS, type: MESSAGE.TYPE.ERROR };
 
        if(await dao.reservation.isValid({ rEmail, _date: moment().format('YYYY-MM-DD') })){

            message = { text: MESSAGE.TEXT.RESERVATION_IS_NOT_AVAILABLE, type: MESSAGE.TYPE.ERROR };

            if(await dao.reservation.isAvailable({ rDate, rHour })){
                const values = { rFirstName, rLastName, rEmail, rPhone, rHour, rDate };

                data = await dao.reservation.create(values);
                httpStatus = HTTP_STATUS_CODES.CREATED;
                message = { text: MESSAGE.TEXT.RESERVATION_CREATE, type: MESSAGE.TYPE.SUCCESS };
            }
        }

        return { httpStatus, data, message };
    }
}