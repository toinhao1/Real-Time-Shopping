import React, { Component } from 'react';
import {
  Button,
  Container,
  ListGroup,
  ListGroupItem,
  Row,
  Col
} from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getItems, deleteItem } from '../actions/itemActions';
import PropTypes from 'prop-types';
import EditItemModal from './EditItemModal'
import PurchasedOrNot from './PurchasedOrNot'

class ShoppingList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: false,
      name: '',
    };
  }

  static propTypes = {
    getItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool
  };

  componentDidMount() {
    this.props.getItems();
  }

  onDeleteClick = (id) => {
    this.props.deleteItem(id, this.props.socket);
  };

  render() {
    const { items } = this.props.item;
    return (
      <Container>
        <ListGroup>
          <TransitionGroup className="shopping-list">
            {items.map((item) => (
              <CSSTransition key={item._id} timeout={500} classNames="fade">
                <ListGroupItem>
                  <Row>
                    <Col lg="8 auto">
                      {this.props.isAuthenticated ? (
                        <Button
                          className="remove-btn"
                          color="danger"
                          size="sm"
                          onClick={this.onDeleteClick.bind(this, item._id)}
                        >
                          &times;
                    </Button>
                      ) : null}
                      {item.completed ? <div className="purchased-item">{item.name}</div> : <div>{item.name}</div>}
                    </Col>
                    <Col style={{ textAlign: 'right' }}>
                      <EditItemModal id={item._id} name={item.name} socket={this.props.socket} />
                      <PurchasedOrNot item={item} socket={this.props.socket} />
                    </Col>
                  </Row>
                </ListGroupItem>

              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  item: state.item,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { getItems, deleteItem }
)(ShoppingList);
