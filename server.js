// Import and create Express
const express = require('express')
const app = express()

// Data arrays
const collectibles = [
  { name: 'shiny ball', price: 5.95 },
  { name: 'autographed picture of a dog', price: 10 },
  { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
];
const shoes = [
  { name: "Birkenstocks", price: 50, type: "sandal" },
  { name: "Air Jordans", price: 500, type: "sneaker" },
  { name: "Air Mahomeses", price: 501, type: "sneaker" },
  { name: "Utility Boots", price: 20, type: "boot" },
  { name: "Velcro Sandals", price: 15, type: "sandal" },
  { name: "Jet Boots", price: 1000, type: "boot" },
  { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];

// Define routes
//1. Be Polite, Greet the User
app.get('/greetings/:username', (req, res) => {
    const username = req.params.username;
    const responseMessage = `Hello there, ${username}!`
    res.send(responseMessage);
  });

  //2. Rolling the Dice
app.get('/roll/:number', (req, res) => {
  const number = req.params.number;
  if (isNaN(number) || number <= 0) {
    res.send('You must specify a number.');
  } else {
    const randomRoll = Math.floor(Math.random() * (parseInt(number) + 1));
    res.send(`You rolled a ${randomRoll}.`);
  }
});

//3. I Want THAT One!
app.get('/collectibles/:index', (req, res) => {
  const index = parseInt(req.params.index);
  if (index >= 0 && index < collectibles.length) {
      const item = collectibles[index];
      res.send(`So, you want the ${item.name}? For ${item.price}, it can be yours!`);
  } else {
      res.send('This item is not yet in stock. Check back soon!');
  }
});

//4. Filter Shoes by Query Parameters
app.get('/shoes', (req, res) => {
  const minPrice = parseFloat(req.query['min-price']);
  const maxPrice = parseFloat(req.query['max-price']);
  const type = req.query.type;

  let filteredShoes = shoes;

  if (!isNaN(minPrice)) {
      filteredShoes = filteredShoes.filter(shoe => shoe.price >= minPrice);
  }
  if (!isNaN(maxPrice)) {
      filteredShoes = filteredShoes.filter(shoe => shoe.price <= maxPrice);
  }
  if (type) {
      filteredShoes = filteredShoes.filter(shoe => shoe.type === type);
  }

  res.json(filteredShoes);
});

// Listen for requests on port 3000
app.listen(3000, () => {
    console.log('Listening on port 3000')
  })