const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');
const axios = require("axios");

const dbConnection = process.env.DB_URL;

mongoose.connect(dbConnection, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log("Database connected");
})

const sample = (array) => array[Math.floor(Math.random() * array.length)];

// call unsplash and return small image

async function seedDB() {
    await Campground.deleteMany({});
    for (let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 1;
        const camp = new Campground({
            author: "64caaa3464467c88ffa379fb",
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel autem mollitia beatae sunt repellendus eaque, et laboriosam eius provident temporibus eligendi sapiente quos cupiditate a voluptatum nisi dicta ex suscipit!',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dby55b4gg/image/upload/v1691140308/YelpCamp/qrveww7xz69ytzfqdqyk.jpg',
                    filename: 'YelpCamp/qrveww7xz69ytzfqdqyk'
                },
                {
                    url: 'https://res.cloudinary.com/dby55b4gg/image/upload/v1691140308/YelpCamp/agemhl5c7cjejrv1o3bt.png',
                    filename: 'YelpCamp/agemhl5c7cjejrv1o3bt'
                },
                {
                    url: 'https://res.cloudinary.com/dby55b4gg/image/upload/v1691140308/YelpCamp/ui0cvjbrrefs0liedyka.jpg',
                    filename: 'YelpCamp/ui0cvjbrrefs0liedyka'
                },
                {
                    url: 'https://res.cloudinary.com/dby55b4gg/image/upload/v1691140308/YelpCamp/trscxmq72amtwgzhqfhr.jpg',
                    filename: 'YelpCamp/trscxmq72amtwgzhqfhr'
                }
            ]
        });
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})