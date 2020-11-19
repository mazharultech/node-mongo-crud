const  express = require('express');

const cors = require('cors');

const password = 'TbJpKG5Vd4FJt21G';
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://coding-easy:TbJpKG5Vd4FJt21G@cluster0.pi2i0.mongodb.net/eCommerceShop?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();

app.get('/', (req, res) => {
    res.send('Hello I am working');
})


client.connect(err => {
  const collection = client.db("eCommerceShop").collection("products");
  console.log('data received');
  client.close();
});




app.listen(3000);