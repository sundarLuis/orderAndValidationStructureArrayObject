const _ = require('lodash')
const ACTIVE = "ACTIVO"
const INACTIVE = "NO ACTIVO"
const validateStatus = status => status === ACTIVE || status === INACTIVE ? true : false
 /* convertir en mayuscula */
const convertUpperCase = value => _.upperCase(value)
/* convertir en minuscula */
const convertLowerCase = value => _.lowerCase(value)

module.exports = {
    validateStatus,
    convertUpperCase,
    convertLowerCase,
    ACTIVE,
    INACTIVE
}