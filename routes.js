const express = require("express")
const Client = require('./models/Client')
const Provider = require('./models/Provider')
const router = express.Router()

//Get all clients
/**
 * @swagger
 * /clients:
 *   get:
 *     description: All clients
 *     responses:
 *       200:
 *         description: Returns all the clients
 */
router.get('/clients', async (req, res) => {
    const clients = await Client.find()
    res.send(clients)
})

/**
 * @swagger
 * /clients:
 *   post:
 *     parameters:
 *      - in: body
 *        name: clients
 *        description: New clients
 *        schema:
 *          type: object
 *          properties:
 *            name:
 *              type: string
 *            email:
 *              type: string
 *            phone:
 *              type: string
 *     responses:
 *       201:
 *         description: Created
 */
router.post('/clients', async (req, res) => {
    const client = new Client({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone
    })

    await client.save()
    res.send(client)
})

//Find one
router.get('/clients/:id', async (req, res) => {
    const client = await Client.findOne({_id: req.body.id})
    res.send(client)
})

router.patch("/clients/:id", async (req, res) => {
    try {
        const client = await Client.findOne({_id: req.params.id})

        if (req.body.name) {
            client.name = req.body.name
        }

        if (req.body.email) client.email = req.body.email

        if (req.body.phone) client.phone = req.body.phone

        await client.save()

        res.send(client)

    } catch (err) {
        res.status(404)
        res.send({error: "Client doesn't exist"})
    }
})

/**
 * @swagger
 * /clients:
 *   delete:
 *     description: Delete clients
 *     responses:
 *       204:
 *         description: Remove all the clients
 */
router.delete("/clients/:id", async (req, res) => {
    try {
        await Client.deleteOne({ _id: req.params.id })
        res.status(204).send()
    } catch {
        res.status(404)
        res.send({ error: "Post doesn't exist!" })
    }
})

/**
 * @swagger
 * /providers:
 *   get:
 *     description: All Providers
 *     responses:
 *       200:
 *         description: Returns all the providers
 */
router.get('/providers', async (req, res) => {
    const providers = await Provider.find()
    res.send(providers)
})

router.patch("/client/providers/:id", async (req, res) => {
    try {
        const client = await Client.findOne({_id: req.params.id})
        const update = {
            name:req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            providers: req.body.providers
        }

        client.updateOne(update)

        res.send(client)

    } catch (err) {
        res.status(404)
        res.send({error: "Client doesn't exist"})
    }
})

module.exports = router