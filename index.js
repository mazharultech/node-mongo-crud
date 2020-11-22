const  express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;

const password = 'TbJpKG5Vd4FJt21G';

const uri = "mongodb+srv://coding-easy:TbJpKG5Vd4FJt21G@cluster0.pi2i0.mongodb.net/eCommerceShop?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());



app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})


client.connect(err => {
  const productCollection = client.db("eCommerceShop").collection("products");

  app.get('/products', (req, res) => {
    productCollection.find({})
    .toArray((err, documents) => {
      res.send(documents);
    })
  })
  
  app.post('/addProduct', (req, res) => {
    const product = req.body;
    productCollection.insertOne(product)
    .then(result => {
      console.log("product added successfully ");
      res.send('success');
    })
    
  })

  app.delete('/delete/:id', (req, res) => {
    productCollection.deleteOne({_id: ObjectId(req.params.id)})
    .then(result => {
      console.log(result);
    })
  })
  
});




app.listen(3000);