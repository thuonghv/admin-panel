import React, { Component } from "react";
import {
  Button,
  Form,
  Header,
  Icon,
  Input,
  Message,
  Segment,
  Table,
} from "semantic-ui-react";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../store/UserManagement";
import { connect } from "react-redux";

class UserManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newUser: {
        name: "",
        email: "",
        role: "",
        caloryLimit: 0,
      },
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getTableData = (props) => {
    return props.state.userManagement.users
      .filter((user) => {
        return user.name.includes(props.state.searchStore.text);
      })
      .map((user) => (
        <Table.Row>
          <Table.Cell>{user.code}</Table.Cell>
          <Table.Cell>{user.name}</Table.Cell>
          <Table.Cell>
            <Button
              onClick={() => this.selectUserForEditing(user.id)}
              color="blue"
              size="mini"
              icon
            >
              <Icon name="pencil" />
            </Button>
            <Button
              onClick={() => this.deleteUser(user.id)}
              color="red"
              size="mini"
              icon
            >
              <Icon name="delete" />
            </Button>
          </Table.Cell>
        </Table.Row>
      ));
  };

  deleteUser = (id) => {
    this.props.removeUser(id);
  };

  selectUserForEditing = (id) => {
    let user = this.props.state.userManagement.users.find((v) => v.id === id);

    this.setState({
      newUser: user,
    });
  };

  handleSubmit = () => {
    if (this.state.newUser.id) this.props.editUser(this.state.newUser);
    else this.props.addUser(this.state.newUser);

    this.clearUserForm();
  };

  handleChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      newUser: Object.assign({}, this.state.newUser, {
        [name]: value,
      }),
    });
  };

  onDropdownSelection = (e, { value }) => {
    this.setState({
      newUser: Object.assign({}, this.state.newUser, {
        role: value,
      }),
    });
  };

  clearUserForm = () => {
    this.setState({
      newUser: {
        name: "",
        
        code: "",
        caloryLimit: 0,
      },
    });
  };

  render() {
    if (!this.props.state.userManagement.users) {
      return <Message>Loading</Message>;
    }
    return [
      <Segment>
        <Header>Danh sách lớp học</Header>
        <Table compact celled>
          <Table.Header fullWidth>
            <Table.Row>
              <Table.HeaderCell>Mã Lớp</Table.HeaderCell>
              <Table.HeaderCell>Tên lớp</Table.HeaderCell>
              <Table.HeaderCell width={2}>Tác vụ</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>{this.getTableData(this.props)}</Table.Body>

          <Table.Footer fullWidth>
            <Table.Row>
              <Table.HeaderCell colSpan={5} />
            </Table.Row>
          </Table.Footer>
        </Table>
      </Segment>,
      <Segment>
        <Form>
          <Form.Group unstackable widths={2}>
            <Form.Field>
              <label>Tên Lớp</label>
              <Input
                type="text"
                name="name"
                value={this.state.newUser.name}
                onChange={this.handleChange}
                placeholder="Nhập tên lớp..."
              />
            </Form.Field>
            <Form.Field>
              <label>Mã lớp</label>
              <Input
                type="text"
                name="code"
                value={this.state.newUser.code}
                onChange={this.handleChange}
                placeholder="Nhập mã lớp..."
              />
            </Form.Field>
          </Form.Group>

          
          <Button primary type="submit" onClick={this.handleSubmit}>
            Thêm
          </Button>
          <Button onClick={this.clearUserForm}>Xóa</Button>
        </Form>
      </Segment>,
    ];
  }
}

export default connect(
  (state) => {
    const { searchStore, userManagement } = state;
    return {
      state: { searchStore, userManagement },
    };
  },
  (dispatch) => bindActionCreators(actionCreators, dispatch)
)(UserManagement);
