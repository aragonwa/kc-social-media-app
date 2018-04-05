import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
// import FormErrors from './FormErrors';
import Select from 'react-select';


class AddModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accountName: '',
      networks: [],
      categories: [],
      // formErrors: { name: '', networks: '', categories: '' },
      // validAccountName: false,
      // validNetworks: false,
      // validCategories: false,
      // validForm: false,
    };
    this.handleAccountNameChange = this.handleAccountNameChange.bind(this);
    this.handleNetworksChange = this.handleNetworksChange.bind(this);
    this.handleCategoriesChange = this.handleCategoriesChange.bind(this);
    this.addNewAccount = this.addNewAccount.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }
  handleAccountNameChange(e) {
    // this.setState({ accountName: e.target.value}, () =>{this.validateField('accountName', e.target.value)});
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
    this.setState({ accountName: '', categories: [], networks: [] });
    this.props.onHide();
  }
  handleSelectChange(selectedOption) {
    selectedOption.forEach(element => {
      console.log(element.value);
    });
    console.log('You\'ve selected:', selectedOption);
    this.setState({ selectedOption });
  }
  // validateField(fieldName, value) {
  //   let fieldValidationErrors = this.state.validForm;
  //   let validAccountName = this.state.validAccountName;

  //   switch (fieldName) {
  //     case 'accountName':
  //       validAccountName = validAccountName === '';
  //       fieldValidationErrors.accountName = validAccountName
  //         ? ''
  //         : ' is required';
  //       break;
  //     default:
  //       break;
  //   }
  //   this.setState(
  //     {
  //       formErrors: fieldValidationErrors,
  //       validAccountName: validAccountName
  //     },
  //     this.validateForm
  //   );
  // }

  // validateForm() {
  //   this.setState({ formValid: !!this.state.validAccountName });
  // }
  addNewAccount(e) {
    e.preventDefault();
    const networks = this.state.networks.map(network => {
      return { type: network, url: 'www.kingcounty.gov' };
    });

    fetch('/api', {
      method: 'POST',
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
        this.props.updateAccounts({
          name: this.state.accountName,
          networks,
          categories: this.state.categories,
          _id: response.data._id
        });
        this.setState({ accountName: '', categories: [], networks: [] });
        this.props.onHide();
      });
  }
  render() {
    const { selectedOption } = this.state;
    const networks = [
      'facebook',
      'twitter',
      'linkedin',
      'youtube',
      'wordpress',
      'instgram',
      'flickr',
      'pintrest'
    ];
    const categories = [
      'countywide',
      'transportation',
      'public-health',
      'all-home',
      'community-human-services',
      'sheriff',
      'kcit',
      'independent',
      'prosecuting-attorney',
      'superior-court',
      'enterprise-services',
      'dnrp',
      '4culture',
      'elections',
      'rask',
      'assessors',
      'hr',
      'employee-giving',
      'kcit',
      'kctv'
    ];

    const networkChecks = networks.map((network, i) => {
      return (
        <label className="checkbox-inline" key={i}>
          <input
            onChange={this.handleNetworksChange}
            type="checkbox"
            name="network"
            id={'inlineCheckbox' + network}
            value={network}
          />{' '}
          {network}
        </label>
      );
    });
    const categoryChecks = categories.map((category, i) => {
      return (
        <label className="checkbox-inline" key={i}>
          <input
            onChange={this.handleCategoriesChange}
            type="checkbox"
            id={'inlineCheckbox' + category}
            value={category}
          />{' '}
          {category}
        </label>
      );
    });
    const options = categories.map((category)=> {
      return {value: category, label: category}
    })
    return (
      <Modal show={this.props.show} onHide={this.props.onHide} bsSize="large">
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
          {/* <FormErrors formErrors={this.state.formErrors} /> */}
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
              <div className="col-sm-2">Network</div>
              <div className="col-sm-10">{networkChecks}</div>
            </div>
            <div className="form-group">
              <div className="col-sm-2">Category</div>
              <div className="col-sm-10">{categoryChecks}</div>
            </div>
            <Select
              name="form-field-name"
              value={selectedOption}
              onChange={this.handleSelectChange}
              multi
              options={options}
            />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button
            type="submit"
            onClick={this.addNewAccount}
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

export default AddModal;
