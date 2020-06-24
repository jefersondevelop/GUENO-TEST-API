const UserService = require('./users.service')


async function getUserInformation(req:any, res:any){
    return UserService.getUser(req, res);
}   

module.exports = {
    getUserInformation
}