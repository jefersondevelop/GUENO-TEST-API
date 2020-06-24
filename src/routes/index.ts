import * as UserRouter from './user'

exports.load = app => {

    app.use('/users', UserRouter);

    return app

}