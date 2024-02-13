const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient , ObjectId} = require('mongodb');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

const mongoURI = 'mongodb://localhost:27017'; // Your MongoDB URI
const dbName = 'Event'; // Your database name
const collectionName = 'events'; // Your collection name

// Connect to MongoDB
MongoClient.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(client => {
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Define routes here

    app.get('/api/v3/app/events', (req, res) => {
        const { id, type, page, limit } = req.query;
    
        if (id) {
            collection.findOne({ _id: new ObjectId(id) })
                .then(event => {
                    if (!event) {
                        res.status(404).json({ message: "Event not found" });
                    } else {
                        res.status(200).json({ message: "Event found successfully", event });
                    }
                })
                .catch(error => {
                    console.log("Error finding event:", error);
                    res.status(500).json({ message: "Error finding event" });
                });
        } else if (!type || !page || !limit) {
            return res.status(400).json({ error: 'Missing query parameters' });
        } else {
            collection.find({ type }).toArray()
                .then(events => {
                    const startIndex = (page - 1) * limit;
                    const endIndex = page * limit;
                    const paginatedEvents = events.slice(startIndex, endIndex);
                    if (paginatedEvents.length === 0) {
                        return res.status(404).json({ message: 'No events found' });
                    }
                    res.status(200).json({ events: paginatedEvents });
                })
                .catch(error => {
                    console.error("Error fetching events:", error);
                    res.status(500).json({ message: "Error fetching events" });
                });
        }
    });
    
    app.post('/api/v3/app/events',(req,res)=>{
        const newEvent = req.body;
        console.log(newEvent);
        collection.insertOne(newEvent).then(result=>{
            res.status(200).json({message: "event added successfully"});
            console.log(newEvent);
        }).catch(error => {
            console.error("Error adding event:", error);
            res.status(500).json({ message: "Error adding event" });
          });
    });

    app.put('/api/v3/app/events/:id', (req, res) => {
        const eventId = req.params.id; // Access event ID from url 
        const updatedEvent = req.body;
        
        if (!eventId) {
            return res.status(400).json({ message: "Event ID is required" });
        }
    
        collection.updateOne({ _id: new ObjectId(eventId) }, { $set: updatedEvent })
            .then(result => {
                if (result.matchedCount === 0) {
                    return res.status(404).json({ message: "Event not found" });
                }
                res.status(200).json({ message: "Event updated successfully" });
            })
            .catch(error => {
                console.error("Error updating event:", error);
                res.status(500).json({ message: "Error updating event" });
            });
    });

    app.delete('/api/v3/app/events/:id',(req,res)=>{
        const eventId = req.params.id;
        collection.deleteOne({_id: new ObjectId(eventId)})
        .then(result=>{
            if (result.deletedCount === 0) {
                return res.status(404).json({ message: "Event not found" });
              }
              res.status(200).json({ message: "Event deleted successfully" });
        })
        .catch(error => {
            console.error("Error deleting event:", error);
            res.status(500).json({ message: "Error deleting event" });
          });
    })
    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
  });
