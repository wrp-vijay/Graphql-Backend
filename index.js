const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./db');
connectDB();
const typeDefs = require('./typeDefs')
const resolvers = require('./resolvers')


const startServer = async() =>{
    const app = express();
    const apolloserver = new ApolloServer({
        typeDefs,
        resolvers,
    })
    await apolloserver.start()
    apolloserver.applyMiddleware({app:app});
    app.listen(4000, () => console.log("server strat at port no. 4000"));
}

startServer();


