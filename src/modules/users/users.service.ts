const request = require('request');

async function verifyUserExists(id:Number){

    return new Promise((resolve, reject) => {

        const options = {
            url: `https://api.gueno.com.ar/challenge/getCuit/${id}`,
        };
        
        request.get(options, (err, resp, body) => {

            if (err)
                return reject({
                    status: 500,
                    err,
                });
                
            if (Object.keys(JSON.parse(body).data).length === 0)
                return reject({
                    status: 404,
                    message: 'User was not found.'
                });

            const result = JSON.parse(body);

            return resolve(result);
        });
    });

}

async function getUserInformationByCUIT(CUIT:string){

    return new Promise((resolve, reject) => {

        if(!CUIT || CUIT === undefined || CUIT === "")
            return reject({
                status: 422,
                message: 'The CUIT of user must be provided.'
            })

        const options = {
            url: `https://api.gueno.com.ar/challenge/getUserData/${CUIT}`,
        };
        
        request.get(options, (err, resp, body) => {
           
            if (err)
                return reject({
                    status: 500,
                    err,
                });
               
            if (!JSON.parse(body).data)
                return reject({
                    status: 404,
                    message: 'User was not found.',
                });

            const result = JSON.parse(body);

            return resolve(result);
        });
    });

}

async function getUser(req:any, res:any){

    try {

        const result:any = await verifyUserExists(req.params.id);

        // CUIT WAS GOT
        
        if(Object.keys(result.data).length > 0){

            //GET USER INFORMATION

            var userInformation:any = await getUserInformationByCUIT(result.data.cuit);

            userInformation = Object.assign({}, userInformation, {
                data: Object.assign({}, userInformation.data,{
                    cuit: result.data.cuit
                })   
            })

            return res.json(userInformation);

        }

    } catch (error) {
        return res.status(error.status).json(error)
    }

}


module.exports = {
    verifyUserExists,
    getUserInformationByCUIT,
    getUser

}