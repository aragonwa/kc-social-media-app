import React, { Component } from 'react';
import Results from './Results';
import Search from './Search';
import './App.css';
import 'react-select/dist/react-select.css';
import { alphaSort } from './utils/Filters';
import { platforms, categories } from './db/data.js';

class App extends Component {
  constructor(props) {
    super(props);
    // TODO: Add platforms, categories
    this.state = {
      accounts: [],
      filteredAccounts: [],
      showResults: true,
      nameFilter: '',
      socialNetworkFilter: '',
      categoryFilter: ''
    };
    // this.filterAccounts = this.filterAccounts.bind(this);
    this.filterOnName = this.filterOnName.bind(this);
    this.filterOnSocialNetwork = this.filterOnSocialNetwork.bind(this);
    this.filterOnCategory = this.filterOnCategory.bind(this);
  }
  componentDidMount() {
    fetch('/api')
      .then(res => res.json())
      .then(accounts =>
        this.setState({ accounts, filteredAccounts: accounts })
      );
  }
  filterOnName(searchTerm) {
    this.setState({ nameFilter: searchTerm });
    // if (!searchTerm) {
    //   this.setState({ filteredAccounts: this.state.accounts });
    // } else {
    //   let filteredAccounts = this.state.filteredAccounts;
    //   filteredAccounts = filteredAccounts.filter(account => {
    //     return account.name.toLowerCase().includes(searchTerm);
    //   });
    //   this.setState({ filteredAccounts });
    // }
  }
  filterOnSocialNetwork(searchTerm) {
    this.setState({ socialNetworkFilter: searchTerm });
  }
  filterOnCategory(searchTerm) {
    this.setState({ categoryFilter: searchTerm });
  }
  // filterAccounts() {
  //   let filteredAccounts = this.state.filteredAccounts;
  //   filteredAccounts = filteredAccounts.sort((a, b) => {
  //     if (a.name < b.name) return -1;
  //     if (a.name > b.name) return 1;
  //     return 0;
  //   });
  //   this.setState({ filteredAccounts: filteredAccounts });
  // }
  // toggleResults() {
  //   this.setState({ showResults: !this.state.showResults });
  // }
  render() {
    // TODO: Move to seperate function/file
    let accounts = this.state.filteredAccounts;

    if (accounts.length === 0) {
      return <div />;
    }

    if (
      !this.state.nameFilter &&
      !this.state.socialNetworkFilter &&
      !this.state.categoryFilter
    ) {
      accounts = this.state.accounts;
    } else {
      accounts = alphaSort(accounts);
    }
    if (!!this.state.nameFilter) {
      accounts = accounts.filter(account => {
        return account.name
          .toLowerCase()
          .includes(this.state.nameFilter.toLowerCase());
      });
    }
    if (!!this.state.socialNetworkFilter) {
      accounts = accounts.filter(account => {
        return account.networks.some(
          network =>
            network.type.toLowerCase() ===
            this.state.socialNetworkFilter.toLowerCase()
        );
      });
    }
    if (!!this.state.categoryFilter) {
      accounts = accounts.filter(account => {
        return account.categories.some(
          category =>
            category.toLowerCase() === this.state.categoryFilter.toLowerCase()
        );
      });
    }
    return (
      <div>
        <Search
          filterOnName={this.filterOnName}
          filterOnSocialNetwork={this.filterOnSocialNetwork}
          filterOnCategory={this.filterOnCategory}
          platforms={platforms}
          categories={categories}
        />
        <Results categories={categories} accounts={accounts} />
      </div>
    );
  }
}

export default App;
