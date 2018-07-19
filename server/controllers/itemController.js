const axios = require("axios");
let self = {};

self.producto = (req, res) => {
    const params = req.params.id;
    const prodIDfinal = params.replace(/[^\x00-\x7F]/g, ""); 	
    //traemos la info de las APIs
	Promise
		.all([
			axios.get("https://api.mercadolibre.com/items/"+prodIDfinal),
			axios.get("https://api.mercadolibre.com/items/"+prodIDfinal+"/description"),		
		]) // nos quedamos con el item, su descripción y buscamos las categorías del mismo
		.then(([item, description]) => {
	        return Promise.all([
	            item,
	            description,
	            axios.get('https://api.mercadolibre.com/categories/' + item.data.category_id)
	        ])
		}) // guardamos todos los datos necesarios y lo retornamos como json para leerlo en nuestra vista de producto
		.then(([item, description, category]) => {
			var producto = [{
		                'author': {
		                'name': 'Florencia',
		                'lastname': 'Caputti' },
		                "category": category.data.path_from_root.map(category => category.name),
		                'itemInfo': {
		                	'id': item.data.id, 
		                	"title": item.data.title, 
		                	"price": [item.data.currency_id == "ARS" ? "$" : item.data.currency_id, item.data.price],
			                "picture": item.data.pictures[0].url, 
			                "condition": item.data.condition, 
			                "free_shipping": item.data.shipping.free_shipping,
			                "sold_quantity": item.data.sold_quantity,
			                "description": description.data.plain_text,
		                }
		            }];
		    console.log(item.data)
			return res.json(producto)
		});
};

module.exports = self;