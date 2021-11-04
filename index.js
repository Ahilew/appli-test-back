const express = require('express')
const mongoose  = require('mongoose')
const routes = require('./routes')
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors')

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'Test REST API',
            description: "A REST API built with Express and MongoDB."
        },
    },
    apis: ["routes.js"]
}


mongoose
    .connect("mongodb://localhost:27017/bezkoder_db",{ useNewUrlParser: true })
    .then(() => {
        const app = express()
        app.use(express.json())
        app.use(cors())
        app.use('/api', routes)

        const swaggerDocs = swaggerJsDoc(swaggerOptions);
        app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

        app.listen(5000, () => {
            console.log('server has started')
        })
    })

