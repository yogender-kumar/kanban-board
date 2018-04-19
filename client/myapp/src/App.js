import React, { Component } from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import AppData from './AppData';


const client = new ApolloClient({
  link: new HttpLink({uri: '/graphql'}),
  cache: new InMemoryCache()
})

class App extends Component {
  render(){
    return(
      <ApolloProvider client={client}>
        <BrowserRouter>
          <div>
            <Link to="/" className=""></Link>
            <Switch>
              <Route exact path="/" component={AppData} />
            </Switch>
          </div>
        </BrowserRouter>
      </ApolloProvider>
    )
  }
}

export default App;