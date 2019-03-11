import React, { Component } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Container,
  ListGroup,
  ListGroupItem,
  Label,
  Input
} from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getItems, deleteItem, editItem } from '../actions/itemActions';
import PropTypes from 'prop-types';

class ShoppingList extends Component {
  state = {
    modal: false,
    name: ''
  };
  static propTypes = {
    getItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool
  };

  componentDidMount() {
    this.props.getItems();
  }
  // onEditClick = (item, id) => {
  //   this.props.editItem(id);
  // };

  onDeleteClick = (id) => {
    this.props.deleteItem(id);
  };
  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e, id) => {
    e.preventDefault();

    const newItem = {
      name: this.state.name
    };

    // Add item via addItem action
    this.props.editItem(newItem, id);
    console.log(newItem, id);

    // Close modal
    this.toggle();
  };

  render() {
    const { items } = this.props.item;
    return (
      <Container>
        <ListGroup>
          <TransitionGroup className="shopping-list">
            {items.map(({ _id, name }) => (
              <CSSTransition key={_id} timeout={500} classNames="fade">
                <ListGroupItem>
                  {this.props.isAuthenticated ? (
                    <Button
                      className="remove-btn"
                      color="danger"
                      size="sm"
                      onClick={this.onDeleteClick.bind(this, _id)}
                    >
                      &times;
                    </Button>
                  ) : null}
                  {name}
                  {this.props.isAuthenticated ? (
                    <Button
                      color="dark"
                      style={{ marginBottom: '2rem' }}
                      onClick={this.toggle}
                    >
                      Edit Item
                    </Button>
                  ) : null}
                  {/* <Label check>
                    <Input type="checkbox" /> {'      '}Purchased
                  </Label> */}
                  <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Edit Item</ModalHeader>
                    <ModalBody>
                      <Form onSubmit={this.onSubmit}>
                        <FormGroup>
                          <Label for="item">Item</Label>
                          <Input
                            type="text"
                            name="name"
                            id={(this, _id)}
                            placeholder="Edit item"
                            onChange={this.onChange}
                          />
                          <Button
                            color="dark"
                            style={{ marginTop: '2rem' }}
                            block
                          >
                            Edit Item
                          </Button>
                        </FormGroup>
                      </Form>
                    </ModalBody>
                  </Modal>
                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  item: state.item,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { getItems, deleteItem, editItem }
)(ShoppingList);
