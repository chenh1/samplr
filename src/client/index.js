import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws';
import { apiPath, subscriptionPath } from '../apiPath';

const wsClient = new SubscriptionClient(`${subscriptionPath}subscriptions`);

const baseNetworkInterface = createNetworkInterface({
  uri: `${apiPath}graphql`,
});

const subscriptionNetworkInterface = addGraphQLSubscriptions(baseNetworkInterface, wsClient);

export default new ApolloClient({
  networkInterface: subscriptionNetworkInterface,
  connectToDevTools: true
});