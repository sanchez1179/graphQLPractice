const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');


const app = express();

app.use(cors())

mongoose.connect('mongodb://<username>:<password>@ds251632.mlab.com:51632/gql_ninja', { useNewUrlParser: true });
mongoose.connection.once('open', () => {
    console.log('connected to the database')
})

app.listen(4001, ()=>{
    'You are now about to witness the power of street knowledge'
})

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))