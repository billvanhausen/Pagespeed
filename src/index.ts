import dotenv from "dotenv";
import express from "express";
import { MongoClient, ClientSession } from "mongodb";
import path from "path";
import * as routes from "./routes";


// initialize configuration
dotenv.config();

// initialize Database
MongoClient.connect("mongodb://127.0.0.1:27017/pagespeed-insights",
{
    useUnifiedTopology: true,
    useNewUrlParser: true,
},
(err: any, client: any) => {
    if (err){
        // tslint:disable-next-line:no-console
        // console.log(err);
        return
    }
    const db = client.db('pagespeed-insights');

    // port is now available to the Node.js runtime
    // as if it were an environment variable
    const port = process.env.SERVER_PORT;
    const app = express();

    // Configure Express to use EJS
    app.set( "views", path.join( __dirname, "views" ) );
    app.set( "view engine", "ejs" );


    // Configure routes
    routes.register( app, db );

    // start the express server
    app.listen( port, () => {
        // tslint:disable-next-line:no-console
        console.log( `server started at http://localhost:${ port }` );
    } );

} );