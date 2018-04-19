import bodyParser from 'body-parser';
import express from 'express';
import GraphqlHTTP from 'express-graphql';
import session from 'express-session';
import Schema from './model'
const config = require('./config.js');
const mongoConn = require('./mongoConnection')();

const app = express();
// Setup bodyParsing middleware
app.use(bodyParser.json());

app.use('/graphql', GraphqlHTTP({
	schema: Schema,
	pretty: true,
	graphiql: true
}));

app.get('/getData', (req, res) => {
	res.send({ toDoList: config.toDoList});
});

app.get('/api/hello', (req, res) => {
  res.send({ toDoList: config.toDoList});
});

app.listen(config.PORT, () => {
	console.log(`server listen at ${config.PORT}`);
});