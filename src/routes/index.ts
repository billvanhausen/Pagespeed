import * as express from "express";
import bodyParser from "body-parser";

export const register = ( app: express.Application, db: any) => {

    // const jsonParser = bodyParser.json();
    const urlencodedParser = bodyParser.urlencoded({ extended: false });

    // define a route handler for the default home page
    app.get( "/", ( req: any, res ) => {
        res.render( "pages/index" );
    } );

    app.get( "/import", ( req: any, res: any ) => {
        res.render( "pages/import_urls" );
    } );

    app.post('/import', urlencodedParser, (req: any, res: any) => {
        // tslint:disable-next-line:no-console
        console.log(req);
        db.collection('pages').insertOne(req.body, (err: any, result: any) => {
            if (err){
                // tslint:disable-next-line:no-console
                return console.log("This is the err...");
                // tslint:disable-next-line:no-console
                return console.log(err);
            }

            // tslint:disable-next-line:no-console
            console.log('saved to database');
            res.redirect('/');
        })

    } );
};