const express = require('express');
const app = express();

//aqui le decimos que use los archivos estáticos
// y que se muestre al llamar a la ruta "/"
app.use('/', express.static('public'));

//aqui le decimos al framework desde que puerto
app.listen(3000, () => {
  console.log("listening on 3000");
});
