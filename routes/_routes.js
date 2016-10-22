const fs = require('fs');

module.exports = (app) => {
  const endpoint = "/rest"
  // chamada de rotas
  let rotas = fs.readdirSync('./routes');
  for(rota of rotas){
    if(rota[0] != '_'){
      rota = rota.replace('.js','')
      app.use(endpoint+'/'+rota, require('./'+rota));
    }
  }

}
