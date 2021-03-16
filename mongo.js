const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log(
    'Please provide the password as an argument: node mongo.js <password>'
  );
  process.exit(1);
}

const password = process.argv[2];

const url =
  // `mongodb+srv://fullstack:${password}@cluster0-ostce.mongodb.net/test?retryWrites=true`
  `mongodb+srv://fullstack:${password}@cluster0.pt2ll.mongodb.net/phone-app?retryWrites=true&w=majority`;

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('Connected to the Database. Yayzow!');
  })
  .catch((err) => {
    console.log(err);
  });

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
  id: Number,
});

const Person = mongoose.model('Person', personSchema);

console.log('arguments', process.argv);

if (process.argv.length <= 3) {
  Person.find({})
    .then((persons) => {
      console.log('phonebook');
      console.log(
        ...persons.map((item) => {
          return `${item.name}  ${item.number}\n`;
        })
      );
      mongoose.connection.close();
    })
    .catch((err) => {
      console.log(err);
    });
}

if (process.argv.length > 3) {
  const name = process.argv[3];
  const number = process.argv[4];

  const person = new Person({
    name,
    number,
    id: new Date().getTime(),
  });

  person
    .save()
    .then((res) => {
      console.log('data saved!');
      console.log('res', res);
      mongoose.connection.close();
    })
    .catch(() => {});
}

// const person = new Person({
//   name: 'xavi',
//   number: '+8613226643641',
//   id: 1,
// });

// person
//   .save()
//   .then((res) => {
//     res.forEach((item) => {
//       console.log(item);
//     });
//     mongoose.connection.close();
//   })
//   .catch(() => {});
