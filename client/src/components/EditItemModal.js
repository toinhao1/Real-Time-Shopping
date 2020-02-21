import React, { Component } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import { connect } from 'react-redux';
import { editItem } from '../actions/itemActions';
import PropTypes from 'prop-types';

class EditItemModal extends Component {
  state = {
    modal: false,
    name: ''
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool
  };

  componentDidMount() {
    this.setState({ name: this.props.name })
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  onChange = e => {
    this.setState({ name: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const updatedItem = {
      name: this.state.name,
      id: this.props.id,
      completed: false,
    };
    this.props.editItem(updatedItem);
    // Close modal
    this.toggle();
  };

  render() {
    return (
      <div>
        {this.props.isAuthenticated &&
          <Button
            color="dark"
            style={{ marginBottom: '2rem' }}
            onClick={this.toggle}
          >
            Edit Item
          </Button>
        }
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Edit Item</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="item">Item</Label>
                <Input
                  type="text"
                  name="name"
                  id="item"
                  value={this.state.name}
                  onChange={this.onChange}
                />
                <Button color="dark" style={{ marginTop: '2rem' }} block>
                  Edit Item
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  item: state.item,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { editItem }
)(EditItemModal);
