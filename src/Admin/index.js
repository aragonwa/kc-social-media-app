import React, { Component } from 'react';
import AddModal from './AddModal';
import EditModal from './EditModal';
import DeleteModal from './DeleteModal';
import FAIcon from '../FAIcon';

import { getAccountsPlatformsCategories } from '../utils/GetData';

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accounts: [],
      platforms: [],
      categories: [],
      showAddModal: false,
      showEditModal: false,
      showDeleteModal: false,
      selectedAccount: null
    };
    this.toggleAddModal = this.toggleAddModal.bind(this);
    this.toggleEditModal = this.toggleEditModal.bind(this);
    this.toggleDeleteModal = this.toggleDeleteModal.bind(this);
    this.updateAccounts = this.updateAccounts.bind(this);
    this.updateAccount = this.updateAccount.bind(this);
    this.deleteAccount = this.deleteAccount.bind(this);
  }

  componentDidMount() {
    getAccountsPlatformsCategories().then(
      ([accounts, platforms, categories]) => {
        this.setState({
          accounts,
          platforms,
          categories
        });
      }
    );
  }
  toggleAddModal() {
    this.setState({ showAddModal: !this.state.showAddModal });
  }
  toggleEditModal(id) {
    this.setState({ selectedAccount: id });
    this.setState({ showEditModal: !this.state.showEditModal });
  }
  toggleDeleteModal(id) {
    this.setState({ selectedAccount: id });
    this.setState({ showDeleteModal: !this.state.showDeleteModal });
  }
  updateAccounts(account) {
    this.setState({ accounts: [...this.state.accounts, account] });
  }
  updateAccount(account) {
    const { accounts } = this.state;
    const index = accounts.findIndex(item => {
      return item._id === account._id;
    });
    accounts[index] = account;
    this.setState({ accounts });
  }
  deleteAccount(account) {
    this.setState(prevState => {
      let newData = prevState.accounts.slice(); //copy array from prevState
      const index = newData
        .map(el => {
          return el._id;
        })
        .indexOf(account);
      if (index > -1) {
        newData.splice(index, 1); // remove element
      }
      return { accounts: newData }; // update state
    });
  }
  render() {
    const {
      accounts,
      showAddModal,
      showEditModal,
      showDeleteModal
    } = this.state;
    // TODO: error check if no database
    return (
      <div className="col-sm-12">
        <h2>Admin</h2>
        <button className="btn btn-success" onClick={this.toggleAddModal}>
          Add account
        </button>
        <br />
        <br />
        <table className="table table-striped table-bordered table-hover">
          <tbody>
            {accounts.map((account, i) => {
              return (
                <tr key={i}>
                  <td>{account.name}</td>
                  <td key={i}>
                  {account.platforms.map((network, i) => {
                        return (
                          <span key={i} className="remove-link-underline text-primary">
                              <FAIcon icon={network.type} />
                          </span>
                        );
                      })}
                  </td>
                  <td>
                    {account.categories.map((category, i) => {
                      let catName = this.state.categories.find(
                        cat => cat.name === category
                      );
                      return (
                        <span
                          key={i}
                          className="label label-info"
                          style={{ marginRight: '10px', fontSize: 'inherit' }}
                        >
                          {catName.displayName}
                        </span>
                      );
                    })}
                  </td>
                  <td>
                    <button
                      className="btn btn-info"
                      id={account._id}
                      onClick={() => this.toggleEditModal(account._id)}
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      id={account._id}
                      onClick={() => {
                        this.toggleDeleteModal(account._id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <button className="btn btn-success" onClick={this.toggleAddModal}>
          Add account
        </button>
        <AddModal
          show={showAddModal}
          updateAccounts={this.updateAccounts}
          onHide={this.toggleAddModal}
          platforms={this.state.platforms}
          categories={this.state.categories}
        />
        <EditModal
          show={showEditModal}
          id={this.state.selectedAccount}
          updateAccount={this.updateAccount}
          onHide={this.toggleEditModal}
          platforms={this.state.platforms}
          categories={this.state.categories}
        />
        <DeleteModal
          show={showDeleteModal}
          id={this.state.selectedAccount}
          deleteAccount={this.deleteAccount}
          onHide={this.toggleDeleteModal}
          platforms={this.state.platforms}
          categories={this.state.categories}
        />
      </div>
    );
  }
}

export default Admin;
