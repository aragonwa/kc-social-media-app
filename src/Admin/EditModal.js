import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import Select from 'react-select';

class EditModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accountName: '',
      networks: [],
      categories: []
    };
    this.handleAccountNameChange = this.handleAccountNameChange.bind(this);
    this.handleNetworksChange = this.handleNetworksChange.bind(this);
    this.handleCategoriesChange = this.handleCategoriesChange.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.editAccount = this.editAccount.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
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
          const networks = account.networks.map(network => {
            return network.type;
          });

          this.setState({
            accountName: account.name,
            networks,
            categories: account.categories
          });
        });
    }
  }
  handleAccountNameChange(e) {
    this.setState({ accountName: e.target.value });
  }
  handleNetworksChange(e) {
    const index = this.state.networks.indexOf(e.target.value);
    if (index < 0) {
      this.setState({ networks: [...this.state.networks, e.target.value] });
    } else {
      this.setState(prevState => {
        let newData = prevState.networks.slice(); //copy array from prevState
        newData.splice(index, 1); // remove element
        return { networks: newData }; // update state
      });
    }
  }
  handleCategoriesChange(e) {
    const index = this.state.categories.indexOf(e.target.value);
    if (index < 0) {
      this.setState({ categories: [...this.state.categories, e.target.value] });
    } else {
      this.setState(prevState => {
        let newData = prevState.categories.slice(); //copy array from prevState
        newData.splice(index, 1); // remove element
        return { categories: newData }; // update state
      });
    }
  }
  handleCancel() {
    this.setState({
      accountName: '',
      networks: [],
      categories: []
    });
    this.props.onHide();
  }
  handleSelectChange(selectedOptions) {
    const options = selectedOptions.map(option => {
      return option.value;
    });
    this.setState({ categories: options });
  }

  editAccount(e) {
    e.preventDefault();
    const networks = this.state.networks.map(network => {
      return { type: network, url: 'www.kingcounty.gov' };
    });

    fetch('/api/' + this.props.id, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: this.state.accountName,
        networks: networks,
        categories: this.state.categories
      })
    })
      .then(response => {
        return response.json();
      })
      .then(response => {
        this.props.updateAccount({
          name: this.state.accountName,
          networks,
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
      const networks = [
        'facebook',
        'twitter',
        'wordpress',
        'instgram',
        'flickr',
        'pintrest'
      ];
      // const categories = [
      //   'countywide',
      //   'transportation',
      //   'public-health',
      //   'all-home',
      //   'community-human-services',
      //   'sheriff',
      //   'kcit',
      //   'independent',
      //   'prosecuting-attorney',
      //   'superior-court',
      //   'enterprise-services',
      //   'dnrp',
      //   '4culture',
      //   'elections',
      //   'rask',
      //   'assessors',
      //   'hr',
      //   'employee-giving',
      //   'kcit',
      //   'kctv'
      // ];
      const categories = this.props.categories.map(category => category.name);

      const accountNetworks = this.state.networks;

      const networkChecks = networks.map((network, i) => {
        const isChecked = accountNetworks.indexOf(network) > -1 ? true : false;
        return (
          <label className="checkbox-inline" key={i}>
            <input
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
      // const accountCategories = this.state.categories;
      // const categoryChecks = categories.map((category, i) => {
      //   const isChecked =
      //     accountCategories.indexOf(category) > -1 ? true : false;
      //   return (
      //     <label className="checkbox-inline" key={i}>
      //       <input
      //         onChange={this.handleCategoriesChange}
      //         type="checkbox"
      //         id={'inlineCheckbox' + category}
      //         value={category}
      //         checked={isChecked}
      //       />{' '}
      //       {category}
      //     </label>
      //   );
      // });

      const options = categories.map(category => {
        return { value: category, label: category };
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
                    type="text"
                    className="form-control"
                    id="inputAccountName"
                    onChange={this.handleAccountNameChange}
                    value={this.state.accountName}
                  />
                </div>
              </div>
              <div className="form-group">
                <div className="col-sm-2">Network</div>
                <div className="col-sm-10">{networkChecks}</div>
              </div>
              <div className="form-group">
                <label className="col-sm-2">Category</label>
                <div className="col-sm-10"><Select
                name="categoryDropdown"
                value={this.state.categories}
                onChange={this.handleSelectChange}
                multi
                options={options}
              /></div>
              </div>
              
            </form>
          </Modal.Body>
          <Modal.Footer>
            <button
              type="button"
              onClick={this.editAccount}
              className="btn btn-success"
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
