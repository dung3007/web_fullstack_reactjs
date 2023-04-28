import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageUser.scss';
import * as actions from '../../../store/actions'
// import { getAllUsers, createNewUserService, deleteUserService, editUserService } from '../../services/userService'
// import ModalUser from './ModalUser';
// import ModalEditUser from './ModalEditUser';
// import { emitter } from '../../utils/emitter';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite'
import 'react-markdown-editor-lite/lib/index.css'

const mdParser = new MarkdownIt()

function handleEditorChange({html, text}) {
    console.log(html)
    console.log(text)
}

class TableManageUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userReudx: []
        }
    }

    componentDidMount() {
        this.props.fetchUsersRedux();
    }
    componentDidUpdate(prevProps, prevState) {
        if(prevProps.users !== this.props.users) {
            this.setState({
                userReudx: this.props.users
            })
        }
    }

    hanleDeleteUser = (user) => {
        this.props.deleteUser(user.id)
    }

    handleEditUser = (user) => {
        this.props.handleEditUserFromParent(user)
    }


    render() {
        let users = this.state.userReudx
        return (
            <React.Fragment>
                <table id="table-manage-user">
                        <tbody>
                            <tr>
                                <th>Email</th>
                                <th>Firstname</th>
                                <th>Lastname</th>
                                <th>Address</th>
                                <th>Action</th>
                            </tr>
                            {users && users.map((item, index) => {
                                return (
                                    <tr key={index}>
                                            <td>{item.email}</td>
                                            <td>{item.firstName}</td>
                                            <td>{item.lastName}</td>
                                            <td>{item.address}</td>
                                            <td>
                                                <button className="btn-edit" onClick={() => this.handleEditUser(item)}><i className="fas fa-pencil-alt"></i></button>
                                                <button className="btn-delete" onClick={() => this.hanleDeleteUser(item)}><i className="fas fa-trash"></i></button>
                                            </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    <MdEditor style={{height: '500px'}} renderHTML={text => mdParser.render(text)} onChange={handleEditorChange} />
            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        users: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUsersRedux: () => dispatch(actions.fetchAllUsersStart()),
        deleteUser: (id) => dispatch(actions.deleteUser(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
