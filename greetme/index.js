const moment = require('moment');

const greeting = {
    "en": "Hello",
    "es": "Hola",
    "fr": "Bonjour"
}

//La variable name sera enviada como Path parameter, lo que lo hace obligatorio. (ej. myapi.com/greetme/Juan) 
//La variable lan (Lenguaje) sera enviada como Query parameter, lo que lo hace opcional. (ej. myapi.com/greetme/Juan?lan=es)
//Es posible que se envian mas variables como Query parameter, lo que lo hace opcional. (ej. myapi.com/greetme/Juan?lan=es&city=Bogota&country=Colombia)

exports.handler = async (event) => {
    let name = event.pathParameters.name; //pathParameters es un atributo predefinido de API Gateway AWS Proxy

    //El lan (Lenguaje) es opcional, y puede enviarse informacion en otros variables
    //El operador ... puede guardar varias variables en un objeto
    //Todas la variables adicionales a lang se guardan en el objeto info
    //queryStringParameters es un atributo predefinido de API Gateway AWS Proxy
    //Si queryStringParameters no tiene valor lo dejamos vacio: || { }
    
    let {lang, ...info} = event.queryStringParameters || { }; 

    //Concatenamos variables para obtener nuestro mensaje, el saludo con el nombre
    //Buscamos en nuestro objeto greeting el lenguaje, si no esta usamos en (Enlgish) por defecto
    let message = `${greeting[lang] ? greeting[lang] : greeting['en']} ${name}`;

    //Construimos la respuesta con el mensaje de saludo (message), la informacion adicional en enviada (info) 
    //Adicional un timestamp usando la libreria moment 
    
    let response = {
        message: message,
        info: info,
        timestamp: moment().unix()
    }
    
    //Estamos usando un API Gateway con lambda proxy por lo que se espera un respuesta http no una respuesta normal.
    return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify(response)
    }
}