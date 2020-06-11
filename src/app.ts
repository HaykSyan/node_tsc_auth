import express from 'express';
import * as bodyParser from 'body-parser';

import AuthRoute from "./routes/auth";

const app =  express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());


app.use('/api/v1/', (new AuthRoute).router);

app.listen(port, () => {
    return console.log(`server is listening on ${port}`);
});