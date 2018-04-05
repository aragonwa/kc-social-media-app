import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
// import FormErrors from './FormErrors';
import Select from 'react-select';

class AddModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accountName: '',
      platforms: [],
      categories: []
    };
    this.handleAccountNameChange = this.handleAccountNameChange.bind(this);
    this.addNewAccount = this.addNewAccount.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleCategorySelectChange = this.handleCategorySelectChange.bind(
      this
    );
    this.handlePlatformSelectChange = this.handlePlatformSelectChange.bind(
      this
    );
  }
  handleAccountNameChange(e) {
    this.setState({ accountName: e.target.value });
  }
  handleCancel() {
    this.setState({ accountName: '', categories: [], platforms: [] });
    this.props.onHide();
  }
  handleCategorySelectChange(selectedOptions) {
    const options = selectedOptions.map(option => {
      return option.value;
    });
    this.setState({ categories: options });
  }
  handlePlatformSelectChange(selectedOptions) {
    // const options = selectedOptions.map(option => {
    //   return option.value;
    // });
    this.setState({ platforms: selectedOptions.value });
  }
  addNewAccount(e) {
    e.preventDefault();
    const platforms = this.state.platforms.map(platform => {
      return { type: platform, url: 'www.kingcounty.gov' };
    });

    fetch('/api', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: this.state.accountName,
        platforms: platforms,
        categories: this.state.categories
      })
    })
      .then(response => {
        return response.json();
      })
      .then(response => {
        this.props.updateAccounts({
          name: this.state.accountName,
          platforms,
          categories: this.state.categories,
          _id: response.data._id
        });
        this.setState({ accountName: '', categories: [], platforms: [] });
        this.props.onHide();
      });
  }
  render() {
    const platforms = this.props.platforms.map(platform => platform.name);

    const platformOptions = platforms.map(platform => {
      return { value: platform, label: platform };
    });

    const categories = this.props.categories;

    const categoryOptions = categories.map(category => {
      return { value: category.name, label: category.name };
    });
    return (
      <Modal show={this.props.show} onHide={this.props.onHide} bsSize="large">
        <Modal.Header closeButton>
          <Modal.Title>Add Account</Modal.Title>
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
                  required
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
              <div className="col-sm-5">
                <Select
                  name="platformDropdown"
                  placeholder="type"
                  value={this.state.platforms}
                  onChange={this.handlePlatformSelectChange}
                  options={platformOptions}
                /></div>
              <div className="col-sm-5"><input
                  required
                  placeholder="url"
                  type="text"
                  className="form-control"
                  id="inputAccountName"
                  onChange={this.handleAccountNameChange}
                  value={this.state.accountName}
                /></div>
              <div className="col-sm-10">
                
              </div>
            </div>
            <div className="form-group">
              <label className="col-sm-2">Category</label>
              <div className="col-sm-10">
                <Select
                  name="categoryDropdown"
                  value={this.state.categories}
                  onChange={this.handleCategorySelectChange}
                  multi
                  options={categoryOptions}
                />
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button
            type="submit"
            onClick={this.addNewAccount}
            className="btn btn-success"
            disabled={
              !this.state.accountName ||
              this.state.categories.length === 0 ||
              this.state.platforms.length === 0
            }
          >
            Submit
          </button>
          <button className="btn btn-primary" onClick={this.handleCancel}>
            Cancel
          </button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default AddModal;
