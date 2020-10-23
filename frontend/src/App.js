import React from 'react';
import BookList from './components/BookList';
import { ApolloClient, ApolloProvider, InMemoryCache }from "@apollo/client"


const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client} >
      <div id="main">
        <h1>The List Of Books</h1>

        <BookList />
      </div>
    </ApolloProvider>
    
  );
}

export default App;
