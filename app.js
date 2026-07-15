const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb://anu:anu1234@ac-uvmkpi4-shard-00-00.ral2pqz.mongodb.net:27017,ac-uvmkpi4-shard-00-01.ral2pqz.mongodb.net:27017,ac-uvmkpi4-shard-00-02.ral2pqz.mongodb.net:27017/petdb?ssl=true&replicaSet=atlas-svce6p-shard-0&authSource=admin&appName=Cluster0").then(
    () => {
        console.log("mongo db connected")
    }
).catch(
    (error) => {
        console.log(error)
    }
)

const Pet = mongoose.model("Pets", new mongoose.Schema(
    {
        bookingId: String,
        petName: String,
        petType: String,
        breed: String,
        age: String,
        weight: String,
        vaccinationStatus: String,
        ownerName: String,
        ownerPhone: String,
        ownerEmail: String,
        checkInDate: String,
        checkOutDate: String,
        kennelNumber: String
    }
))

app.post("/add-pet", async (req, res) => {
    await Pet.create(req.body)
    res.json({ status: "success" })
})

app.get("/view-pets", async (req, res) => {
    const pets = await Pet.find()
    res.json(pets)
})

app.listen(3000, () => {
    console.log("Server Started")
})