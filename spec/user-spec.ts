const UserService = require('../src/modules/users/users.service.ts');

describe("User Service: ", () => {
    
    it('Should return a CUIT', async () => {

        let id:Number=11111111;

        let result=await UserService.verifyUserExists(id);

        expect(result.data.cuit).toEqual(30111111119);

    })

    it('Should return information of user with CUIT', async () => {

        let CUIT:string="30111111119";

        let result=await UserService.getUserInformationByCUIT(CUIT);

        expect(result.data.name).toBe("Pedro F.");

    })

    it('Should return and error with status 422, Unprocessable entity that means CUIT must be provide', async () => {

        let CUIT:string=null;
        var status=200; 
        
        async function getUserInformationByCUIT(){
            return UserService.getUserInformationByCUIT(CUIT);
        }

        await getUserInformationByCUIT()
                .catch(er => status = er.status)

        expect(status).toBe(422);

    })

    it('Should return and error with status 404, Not found exception that means User was not found', async () => {

        var status=200; 
        
        let req:any= {
            params: {
                id: 12345
            }
        }

        async function getUserInformationByCUIT(){
            return UserService.getUserInformationByCUIT(req);
        }

        await getUserInformationByCUIT()
                .catch(er => status = er.status)

        expect(status).toBe(404);

    })


});