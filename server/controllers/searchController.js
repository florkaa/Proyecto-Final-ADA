let self = {};

const restler = require("restler");

self.search = (req, res) => {
    const query = req.query["q"];
    restler
        .get("https://api.mercadolibre.com/sites/MLA/search?offset=0&limit=4&q="+query)
        .on("complete", data => {
            // acá vamos a guardar toda la data que queremos mostrar cuando hacemos una búsqueda
            var newData = [{
                            "author": {
                                "name": 'Florencia',
                                "lastname": 'Caputti' },
                            "categories": [data.filters[0].values[0].name],
                            "items": []
                            }];
            // iteramos los resultados que nos trajimos de la API y nos quedamos con los datos que necesitamos
            var resultados = data.results;
            for(var i=0; i < resultados.length; i++){
                item = {
                        "id": resultados[i].id,
                        "title": resultados[i].title,
                        "price": [ resultados[i].currency_id == "ARS" ? "$" : resultados[i].currency_id, resultados[i].price],
                        "picture": resultados[i].thumbnail, 
                        "condition": resultados[i].condition, 
                        "free_shipping": resultados[i].shipping.free_shipping,
                        "seller_address": resultados[i].seller_address.city.name
                        };
                newData[0].items.push(item);
            } 
            return res.json(newData);
        });
};



module.exports = self;