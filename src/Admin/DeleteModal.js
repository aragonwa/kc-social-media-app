import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import Select from 'react-select';

class DeleteModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accountName: '',
      platforms: [],
      categories: []
    };
    this.handleCancel = this.handleCancel.bind(this);
    this.deleteAccount = this.deleteAccount.bind(this);
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.id !== this.props.id &&
      this.props.id !== null &&
      this.props.id !== undefined
    ) {
      fetch('/api/' + this.props.id)
        .then(res => res.json())
        .then(account =>{
          const platforms = account.platforms.map(platform => {
            return platform.type;
          });
      
          this.setState({
            accountName: account.name,
            platforms,
            categories: account.categories
          })
        });
    }
  }
  deleteAccount(e) {
    e.preventDefault();
    fetch('/api/' + this.props.id, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    }).then(response => {
      this.props.deleteAccount(this.props.id);
      this.props.onHide();
    });
  }

  handleCancel() {
    this.setState({ accountName: '',
    platforms: [],
    categories: [] });
    this.props.onHide();
  }
  render() {
    if (this.state.account === null) {
      return null;
    } else {
      const platforms = this.props.platforms.map(platform => platform.name);

      const platformOptions = platforms.map(platform => {
        return { value: platform, label: platform };
      });
      const categories = this.props.categories.map(category => category.name);

      const categoryOptions = categories.map(category => {
        return { value: category, label: category };
      });
      return (
        <Modal show={this.props.show} onHide={this.props.onHide} bsSize="large">
          <Modal.Header closeButton>
            <Modal.Title>Delete Account</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form className="form-horizontal">
              <div className="form-group">
                <label
                  htmlFor="inputAccountName"
                  className="col-sm-2"
                >
                  Name
                </label>
                <div className="col-sm-10">
                  <input
                    readOnly
                    type="text"
                    className="form-control"
                    id="inputAccountName"
                    onChange={this.handleAccountNameChange}
                    value={this.state.accountName}
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="col-sm-2">Platforms</label>
                <div className="col-sm-10">
                  <Select
                    disabled={true}
                    name="platformDropdown"
                    value={this.state.platforms}
                    multi
                    options={platformOptions}
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="col-sm-2">Category</label>
                <div className="col-sm-10">
                  <Select
                  disabled={true}
                    name="categoryDropdown"
                    value={this.state.categories}
                    multi
                    options={categoryOptions}
                  />
                </div>
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <button
              type="button"
              onClick={this.deleteAccount}
              className="btn btn-danger"
            >
              Delete
            </button>
            <button className="btn btn-primary" onClick={this.handleCancel}>
              Cancel
            </button>
          </Modal.Footer>
        </Modal>
      );
    }
  }
}

export default DeleteModal;
