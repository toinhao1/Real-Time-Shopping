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
  constructor(props) {
    super(props);

    this.state = {
      modal: false,
      name: '',
      completed: false,
      selectedItem: null
    };

    this.onChangeItemCompleted = this.onChangeItemCompleted.bind(this);
  }

  static propTypes = {
    getItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool
  };

  componentDidMount() {
    this.props.getItems();
  }

  onDeleteClick = id => {
    this.props.deleteItem(id);
  };
  toggle = (id, name) => {
    this.setState({
      modal: !this.state.modal,
      id: id,
      name: this.state.name
    });
  };

  onChangeItemCompleted(e) {
    this.setState({
      completed: !this.state.completed
    });
  }

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
                      style={{ marginRight: '2rem', marginLeft: '2rem' }}
                      onClick={() => this.toggle(_id)}
                    >
                      Edit Item
                    </Button>
                  ) : null}
                  {this.props.isAuthenticated ? (
                    <FormGroup row style={{ marginLeft: '1rem' }}>
                      <Label for="checkbox" sm={1} />
                      <FormGroup check>
                        <Label check>
                          <Input
                            type="checkbox"
                            className="form-check-input"
                            id="completedCheckbox"
                            name="completedCheckbox"
                            onChange={this.onChangeItemCompleted}
                            checked={this.state.completed}
                            value={this.state.completed}
                          />
                          Purchased
                        </Label>
                      </FormGroup>
                    </FormGroup>
                  ) : null}

                  <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Edit Item</ModalHeader>
                    <ModalBody>
                      <Form onSubmit={this.onSubmit}>
                        <FormGroup>
                          <Label for="item">Item</Label>
                          <Input
                            type="text"
                            name="name"
                            id={_id}
                            defaultValue={this.name}
                            onChange={this.onChange}
                          />
                          {/* <FormGroup row>
                            <Label for="checkbox" sm={1} />
                            <FormGroup check>
                              <Label check>
                                <Input
                                  type="checkbox"
                                  className="form-check-input"
                                  id="completedCheckbox"
                                  name="completedCheckbox"
                                  onChange={this.onChangeItemCompleted}
                                  checked={this.state.completed}
                                  value={this.state.completed}
                                />{' '}
                                Purchased
                              </Label>
                            </FormGroup>
                          </FormGroup> */}
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

const mapStateToProps = state => ({
  item: state.item,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { getItems, deleteItem, editItem }
)(ShoppingList);
