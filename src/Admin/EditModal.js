import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import Select from 'react-select';

class EditModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accountName: '',
      platforms: [],
      categories: []
    };
    this.handleAccountNameChange = this.handleAccountNameChange.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.editAccount = this.editAccount.bind(this);
    this.handleCategorySelectChange = this.handleCategorySelectChange.bind(
      this
    );
    this.handlePlatformSelectChange = this.handlePlatformSelectChange.bind(this);
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.id !== this.props.id &&
      this.props.id !== null &&
      this.props.id !== undefined
    ) {
      fetch('/api/' + this.props.id)
        .then(res => res.json())
        .then(account => {
          const platforms = account.platforms.map(platform => {
            return platform.type;
          });

          this.setState({
            accountName: account.name,
            platforms,
            categories: account.categories
          });
        });
    }
  }
  handleAccountNameChange(e) {
    this.setState({ accountName: e.target.value });
  }
  handleCancel() {
    this.setState({
      accountName: '',
      platforms: [],
      categories: []
    });
    this.props.onHide();
  }
  handleCategorySelectChange(selectedOptions) {
    const options = selectedOptions.map(option => {
      return option.value;
    });
    this.setState({ categories: options });
  }
  handlePlatformSelectChange(selectedOptions) {
    const options = selectedOptions.map(option => {
      return option.value;
    });
    this.setState({ platforms: options });
  }

  editAccount(e) {
    e.preventDefault();
    const platforms = this.state.platforms.map(platform => {
      return { type: platform, url: 'www.kingcounty.gov' };
    });

    fetch('/api/' + this.props.id, {
      method: 'PATCH',
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
        this.props.updateAccount({
          name: this.state.accountName,
          platforms,
          categories: this.state.categories,
          _id: response._id
        });
        this.props.onHide();
      });
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
            <Modal.Title>Edit Account</Modal.Title>
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
                    name="platformDropdown"
                    value={this.state.platforms}
                    onChange={this.handlePlatformSelectChange}
                    multi
                    options={platformOptions}
                  />
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
              type="button"
              onClick={this.editAccount}
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
}

export default EditModal;
