import React, { Component } from 'react';

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      selectedSocialNetwork: '',
      selectedCategory: ''
    };
    this.updateSearchTerm = this.updateSearchTerm.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.updateSelectedSocialNetwork = this.updateSelectedSocialNetwork.bind(this);
    this.updateSelectedCategory = this.updateSelectedCategory.bind(this);
    this._onKeyPress = this._onKeyPress.bind(this);
  }
  updateSearchTerm(e) {
    this.setState({ searchTerm: e.target.value });
  }
  updateSelectedSocialNetwork(e) {
    this.setState({ selectedSocialNetwork: e.target.value });
    this.props.filterOnSocialNetwork(e.target.value);
  }
  updateSelectedCategory(e) {
    this.setState({ selectedCategory: e.target.value });
    this.props.filterOnCategory(e.target.value);
  }
  handleSearch() {
    this.props.filterOnName(this.state.searchTerm);
    // this.props.filterOnSocialNetwork(this.state.selectedSocialNetwork);
  }
  _onKeyPress(e) {
    if (e.key === 'Enter') {
      this.handleSearch();
    }
  }
  render() {
    return (
      <div>
        <div className="col-sm-12">
          <label htmlFor="social-media-search">Search the directory</label>
          <div className="input-group">
            <input
              type="text"
              id="social-media-search"
              className="form-control"
              value={this.state.searchTerm}
              onChange={this.updateSearchTerm}
              onKeyPress={this._onKeyPress}
            />
            <span className="input-group-btn">
              <button
                className="btn btn-success"
                type="button"
                onClick={this.handleSearch}
              >
                Search
              </button>
            </span>
          </div>
        </div>
        <div style={{ marginTop: '20px' }} className="col-sm-6">
          <label htmlFor="select-social-media-network" className="sr-only">
            Select social network
          </label>
          <select
            id="select-social-media-network"
            className="form-control"
            onChange={this.updateSelectedSocialNetwork}
            value={this.state.selectedSocialNetwork}
          >
            <option value="">All social networks</option>
            {this.props.platforms.map((platform, i) => {
              return (
                <option key={i} value={platform.name}>{platform.displayName}</option>
              );
            })}
          </select>
        </div>
        <div style={{ marginTop: '20px' }} className="col-sm-6">
          <label htmlFor="select-category" className="sr-only">
            Select category
          </label>
          <select
            id="select-category"
            className="form-control"
            onChange={this.updateSelectedCategory}
            value={this.state.selectedCategory}
          >
            <option value="">All categories</option>
            {this.props.categories.map((categories, i) => {
              return (
                <option key={i} value={categories.name}>
                  {categories.displayName}
                </option>
              );
            })}
          </select>
        </div>
      </div>
    );
  }
}
