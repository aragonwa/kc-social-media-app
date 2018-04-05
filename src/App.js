import React, { Component } from 'react';
import Results from './Results';
import Search from './Search';
import './App.css';
import 'react-select/dist/react-select.css';
import { alphaSort } from './utils/Filters';
import {getAccountsPlatformsCategories} from './utils/GetData'

class App extends Component {
  constructor(props) {
    super(props);
    // TODO: Add platforms, categories
    this.state = {
      accounts: [],
      platforms: [],
      categories: [],
      filteredAccounts: [],
      nameFilter: '',
      socialNetworkFilter: '',
      categoryFilter: ''
    };
    this.filterOnName = this.filterOnName.bind(this);
    this.filterOnSocialNetwork = this.filterOnSocialNetwork.bind(this);
    this.filterOnCategory = this.filterOnCategory.bind(this);
  }
  componentDidMount() {
    getAccountsPlatformsCategories().then(
      ([accounts, platforms, categories]) => {
        this.setState({
          accounts,
          platforms,
          categories,
          filteredAccounts: accounts
        });
      }
    );
  }

  filterOnName(searchTerm) {
    this.setState({ nameFilter: searchTerm });
  }
  filterOnSocialNetwork(searchTerm) {
    this.setState({ socialNetworkFilter: searchTerm });
  }
  filterOnCategory(searchTerm) {
    this.setState({ categoryFilter: searchTerm });
  }
  render() {
    // TODO: Move to seperate function/file
    let accounts = this.state.filteredAccounts;

    if (accounts.length === 0) {
      return (
        <div className="text-center">
          <span className="fa fa-cog fa-spin fa-3x fa-fw" />
          <span className="sr-only">Loading...</span>
        </div>
      );
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
          platforms={this.state.platforms}
          categories={this.state.categories}
        />
        <Results platforms={this.state.platforms} categories={this.state.categories} accounts={accounts} />
      </div>
    );
  }
}

export default App;
