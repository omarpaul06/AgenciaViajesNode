import express from 'express';
import router from './routes/index.js';
import db from './config/db.js';

const app = express();

//Conectar la base de datos
db.authenticate()
    .then( () => console.log('Base de datos Conectada'))
    .catch( error => console.log(error));


//Definir puerto
const port = process.env.PORT || 4000;

// app.get('/', (req, res) => { //req - lo que enviamos : res - lo que express nos responde
//     res.send('Hola Mundo');
//     res.json({
//         id: 1
//     })
//     res.render(); // => muestra una vista
// });

//Habilitar PUG
app.set('view engine', 'pug'); //Middleware

//Obtener el año actual
app.use( (req, res, next) => {
    const year = new Date();
    res.locals.actualYear = year.getFullYear();
    res.locals.nombresitio = "Agencia de Viajes";
    next();
})

//Agregar body parser para leer los datos del formulario
app.use(express.urlencoded({extended: true}));


//Definir la carpeta publica
app.use(express.static('public'));//Middleware

//Agregar Router
app.use('/', router);//Middleware


app.listen(port, () => {
    console.log(`El servidor esta funcionando en el puerto ${port}`);
})
