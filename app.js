import express from 'express';
import mongoose from 'mongoose';
import apiRoutes from './routes/apiRoutes.js'; // .js reikia nes ES modules naudojami ne commonJS
import { prog_get } from './controllers/controller.js';

const app = express();
app.use(express.json());
app.use(express.static('public'));

const dbURI = 'mongodb+srv://node1-user:test1234@node1.ff6acte.mongodb.net/restapi';

mongoose.connect(dbURI)
    .then(result => {
        app.listen(3000);
        console.log('listening on port 3000');
    })
    .catch(err => console.log(err));

app.set('view engine', 'ejs');

export const getCities = async () => {
    let data = await fetch('https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=100&refine=timezone%3A%22Europe%22&refine=cou_name_en%3A%22Lithuania%22');
    let res = await data.json();
    return res.results.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
};

//routes
app.get('/', prog_get);
app.get('/new', async (req, res) => res.render('new', { data: await getCities() }));
app.use('/api', apiRoutes);