const express = require('express');
const cors = require('cors');
const Routes = require('./routers/route.js'); 

const app = express();

app.use(cors());


app.use('/api/Back', Routes);


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor Express en ejecución en el puerto ${PORT}`);
});


//Se ejecuta en el puerto 3001 el apartado del Backend