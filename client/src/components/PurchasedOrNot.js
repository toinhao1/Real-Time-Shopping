import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  FormGroup,
  Form,
  Label,
  Input,
} from 'reactstrap';
import { editItem } from '../actions/itemActions'

class PurchasedOrNot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: ''
    }
  }

  componentDidMount() {
    this.setState({ checked: this.props.item.completed })
  }

  handleCheck = (e) => {
    this.setState({ checked: this.state.checked ? false : true })
    const { _id, name } = this.props.item
    const updatedItem = {
      id: _id,
      name: name,
      completed: this.state.checked ? false : true
    }
    this.props.editItem(updatedItem, this.props.socket)
  }

  render() {
    return (
      <div>
        {this.props.isAuthenticated ? (
          <Form row="true" style={{ marginLeft: '1rem' }}>
            <FormGroup check>
              <Label check>
                <Input
                  type="checkbox"
                  className="form-check-input"
                  onChange={this.handleCheck}
                  checked={this.state.checked}
                />
                Purchased
              </Label>
            </FormGroup>
          </Form>
        ) : null}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { editItem })(PurchasedOrNot);