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
    this.props.deleteItem(id);
  };

  toggle = (id, name) => {
    this.setState({
      modal: !this.state.modal,
      id: id,
      name: this.state.name
    });
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();

    const newItem = {
      name: this.state.name,
      completed: this.state.completed,
      id: this.state.id
    };

    // Add item via editItem action
    this.props.editItem(newItem, this.state.id);

    // Close modal
    this.toggle();
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
                      {item.name}
                    </Col>
                    <Col style={{ textAlign: 'right' }}>
                      <EditItemModal id={item._id} name={item.name} />
                      <PurchasedOrNot item={item} />
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
