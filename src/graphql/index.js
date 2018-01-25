import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import hoistStatics from 'hoist-non-react-statics';
import React from 'react';
import { ApolloProvider } from 'react-apollo';

const httpLink = new HttpLink({
  uri: 'http://localhost:60000/simple/v1/cjctxhthg00020192i3b2ewgj',
});

const wsLink = new WebSocketLink({
  uri:     `ws://localhost:60000/subscriptions/v1/cjctxhthg00020192i3b2ewgj`,
  options: {
    reconnect: true,
  },
});

const link = split(
  ({query}) => {
    const {kind, operation} = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink,
);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

/**
 * Create the HoC.
 */
export default Component => {
  class ApolloHoC extends React.Component {
    static navigatorStyle = {
      navBarHidden: true,
      ...Component.navigatorStyle,
    };

    render = () => (
      <ApolloProvider client={client}>
        <Component {...this.props}/>
      </ApolloProvider>
    );
  }

  hoistStatics(ApolloHoC, Component);
  return ApolloHoC;
}
