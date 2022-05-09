export const URL = {
    BASE: 'https://retoasimov-backend.orinokia.ca',
    API_RESERVATION: '/api/v1/reservation',
    API_RESERVATION_ACTIVE: '/api/v1/reservation/active',
    API_RESERVATION_AVAILABLE: '/api/v1/reservation/available'
}

export const HTTP_STATUS_CODES = {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    INTERNAL_SERVER_ERROR: 500
}

export const MESSAGE = {
    TEXT: {
        RESERVATION_EMPTY: 'No hay reservaciones',
        RESERVATION_LIST: 'Total de reservaciones: COUNT',
        RESERVATION_ALLREADY_EXISTS: 'La persona ya posee una reservación',
        RESERVATION_IS_NOT_AVAILABLE: 'El horario no está disponible',
        RESERVATION_CREATE: 'Reservación creada',
        RESERVATION_IS_NOT_DISABLED_DAYS: 'Todas las fechas están disponibles',
        RESERVATION_DISABLED_DAYS: 'Total de Fechas desabilitadas: COUNT',
    },
    TYPE: {
        SUCCESS: 'success',
        INFO: 'info',
        ERROR: 'error'
    }
}