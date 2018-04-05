import React, { Component } from 'react';
import AddModal from './AddModal';
import EditModal from './EditModal';
import DeleteModal from './DeleteModal';
import {categories } from '../db/data.js';

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accounts: [],
      showAddModal: false,
      showEditModal:false,
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
    fetch('/api')
      .then(res => res.json())
      .then(accounts => this.setState({ accounts }));
  }
  toggleAddModal(){
    this.setState({showAddModal:!this.state.showAddModal})
  }
  toggleEditModal(id){
    this.setState({selectedAccount: id})
    this.setState({showEditModal:!this.state.showEditModal})
  }
  toggleDeleteModal(id){
    this.setState({selectedAccount: id})
    this.setState({showDeleteModal:!this.state.showDeleteModal})
  }
  updateAccounts(account){
    this.setState({ accounts: [...this.state.accounts, account ]});
  }
  updateAccount(account){
    const {accounts} = this.state;
    const index = accounts.findIndex(item => {return item._id === account._id});
    accounts[index] = account;
    this.setState({ accounts});
  }
  deleteAccount(account){
    this.setState(prevState => {
      let newData = prevState.accounts.slice() //copy array from prevState
      const index = newData.map((el)=>{return el._id}).indexOf(account);
      if(index > -1){
        newData.splice(index, 1) // remove element
      }
      return {accounts: newData} // update state
    })
  }
  render() {

    const {accounts, showAddModal, showEditModal, showDeleteModal} = this.state;
    // TODO: error check if no database
    return (
      <div className="col-sm-12">
        <h2>Admin</h2>
         <table className="table table-striped table-bordered table-hover">
          <tbody>
            {accounts.map((account, i) => {
              return (
                <tr key={i} >
                <td>{account.name}</td>
                <td key={i}>
                  {account.networks.map((network, i) => {
                  return network.type + ' ';
                })}
                </td>
                <td>
                  {account.categories.map((category, i) => {
                    return category+' ';
                  })}
                </td>
                <td><button className="btn btn-info" id={account._id} onClick={()=>this.toggleEditModal(account._id)}>Edit</button></td>
                <td><button className="btn btn-danger" id={account._id} onClick={()=>{this.toggleDeleteModal(account._id)}}>Delete</button></td>
                </tr>

              );
            })}
          </tbody>
        </table>
        <button className="btn btn-success" onClick={this.toggleAddModal}>Add account</button>
        <AddModal show={showAddModal} updateAccounts={this.updateAccounts}
          onHide={this.toggleAddModal} categories={categories}/>
        <EditModal show={showEditModal} id={this.state.selectedAccount} updateAccount={this.updateAccount}
          onHide={this.toggleEditModal} categories={categories}/>
        <DeleteModal show={showDeleteModal} id={this.state.selectedAccount} deleteAccount={this.deleteAccount}
          onHide={this.toggleDeleteModal}/>
      </div>
      
    );
  }
}

export default Admin;
