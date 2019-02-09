var express = require('express')
var http = require('http')
var app = express();

AircraftBrands = [
    {
    id: 1,
    name: "Boeing"
    },
    {
        id: 2,
        name: "Airbus"
    }
]

app.post('/users', (req, res)=>{
    AircraftBrands.push("Aviones" + AircraftBrands.length)
    res.send("New Aircarft")
})

app.get('/mi-servicio', (req,res)=>{
    res.send(AircraftBrands)
})
app.get('/', (req, res)=> {
    res.status(200).send("Bienvenido a esta magestuosa APi");
})

http.createServer(app).listen(8001, () =>{
     console.log("Server correndio en el puerto 8001")
});