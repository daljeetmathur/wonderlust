const mongoose = require('mongoose');
const listing = require("../models/listing.js");
const inidata = require("./data.js");


main().then((res) => {
    console.log(" DB connnection is connected")
})
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/wonderlust');

    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}


const initDB =  async () => {
   await listing.deleteMany({});
   inidata.data = inidata.data.map((obj) => ({...obj, owner: '6828ab3ea2eb265078956145'}))
   await listing.insertMany(inidata.data);
   console.log("data is initilazid");
}


initDB();