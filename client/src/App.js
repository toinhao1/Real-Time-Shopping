import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
import AppNavbar from './components/AppNavbar';
import ShoppingList from './components/ShoppingList';
import ItemModal from './components/ItemModal';
import { Container } from 'reactstrap';

import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/authActions';
import { showItemAddedBySocket, showItemEditedBySocket, showItemDeletedBySocket } from './actions/itemActions'

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


let socket = socketIOClient('http://localhost:3000');

class App extends Component {
  constructor(props) {
    super(props);
    socket.on('ItemAdded', (data) => {
      console.log('socket item', data)
      store.dispatch(showItemAddedBySocket(data))
    })
    socket.on('ItemUpdated', (data) => {
      console.log('socket item', data)
      store.dispatch(showItemEditedBySocket(data))
    })
    socket.on('ItemDeleted', (data) => {
      console.log('socket item', data)
      store.dispatch(showItemDeletedBySocket(data))
    })
  }

  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <div className='App'>
          <AppNavbar />
          <Container>
            <ItemModal socket={socket} />
            <ShoppingList socket={socket} />
          </Container>
        </div>
      </Provider>
    );
  }
}

export default App;
