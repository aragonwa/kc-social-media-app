import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';

class DeleteModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: null
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
        .then(account => this.setState({ account: account }));
    }
  }
  deleteAccount(e) {
    e.preventDefault();
    fetch('/api/' + this.props.id, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    // }).then(response => {
      // return response.json();
    }).then(response =>{
      this.props.deleteAccount(this.props.id);
      this.props.onHide();
    })
  }

  handleCancel() {
    this.setState({ account: null });
    this.props.onHide();
  }
  render() {
    if (this.state.account === null) {
      return null;
    } else {
      const networks = [
        'facebook',
        'twitter',
        'wordpress',
        'instgram',
        'flickr',
        'pintrest'
      ];
      const categories = ['transportation', 'public-safety'];

      const accountNetworks = this.state.account.networks.map(network => {
        return network.type;
      });
      const networkChecks = networks.map((network,i) => {
        const isChecked = accountNetworks.indexOf(network) > -1 ? true : false;
        return (
          <label className="checkbox-inline" key={i}>
            <input
              readOnly
              onChange={this.handleNetworksChange}
              type="checkbox"
              name="network"
              id={'inlineCheckbox' + network}
              value={network}
              checked={isChecked}
            />{' '}
            {network}
          </label>
        );
      });
      const accountCategories = this.state.account.categories;
      const categoryChecks = categories.map((category, i) => {
        const isChecked =
          accountCategories.indexOf(category) > -1 ? true : false;
        return (
          <label className="checkbox-inline" key={i}>
            <input
              readOnly
              onChange={this.handleCategoriesChange}
              type="checkbox"
              id={'inlineCheckbox' + category}
              value={category}
              checked={isChecked}
            />{' '}
            {category}
          </label>
        );
      });
      return (
        <Modal show={this.props.show} onHide={this.props.onHide} bsSize="large">
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form className="form-horizontal">
              <div className="form-group">
                <label
                  htmlFor="inputAccountName"
                  className="col-sm-2 control-label"
                >
                  AccountName
                </label>
                <div className="col-sm-10">
                  <input
                    readOnly
                    type="text"
                    className="form-control"
                    id="inputAccountName"
                    onChange={this.handleAccountNameChange}
                    value={this.state.account.name}
                  />
                </div>
              </div>
              <div className="form-group">
                <div className="col-sm-2">Network</div>
                <div className="col-sm-10">{networkChecks}</div>
              </div>
              <div className="form-group">
                <div className="col-sm-2">Category</div>
                <div className="col-sm-10">{categoryChecks}</div>
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
