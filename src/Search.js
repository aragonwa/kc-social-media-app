import React, { Component } from 'react';

export default class Search extends Component {
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
            />
            <span className="input-group-btn">
              <button className="btn btn-success" type="button">
                Search
              </button>
            </span>
          </div>
        </div>
        <div style={{ marginTop: '20px' }} className="col-sm-6">
          <label htmlFor="select-social-media-network" className="sr-only">
            Select social network
          </label>
          <select id="select-social-media-network" className="form-control">
            <option>All social networks</option>
            <option>Twitter</option>
            <option>Facebook</option>
            <option>Instagram</option>
            <option>Wordpress</option>
          </select>
        </div>
        <div style={{ marginTop: '20px' }} className="col-sm-6">
          <label htmlFor="select-category" className="sr-only">
            Select category
          </label>
          <select id="select-category" className="form-control">
            <option>All categories</option>
            <option>Health</option>
            <option>Council</option>
            <option>DNRP</option>
            <option>KCIT</option>
          </select>
        </div>
      </div>
    );
  }
}
