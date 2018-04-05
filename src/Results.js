import React, { Component } from 'react';
import FAIcon from './FAIcon';
import { socialMediaPlatformSort } from './utils/Filters';

export default class Results extends Component {
  render() {
    const categories = this.props.categories;
    return (
      <div className="col-sm-12 m-t-lg">
        <div className="table-responsive">
          <table className="table table-striped table-bordered table-hover">
            <tbody>
              {this.props.accounts.map((account, i) => {
                const networks = socialMediaPlatformSort(account.networks);
                return (
                  <tr key={i}>
                    <td>{account.name}</td>
                    <td key={i}>
                      {networks.map((network, i) => {
                        return (
                          <span key={i} className="remove-link-underline">
                            <a href={network.url}>
                              <FAIcon icon={network.type} />
                            </a>
                          </span>
                        );
                      })}
                    </td>
                    <td>
                      {account.categories.map((category, i) => {
                        let catName = categories.find(
                          cat => cat.name === category
                        );
                        return (
                          <span
                            key={i}
                            className="label label-info"
                            style={{ marginRight: '10px', fontSize: 'inherit' }}
                          >
                            {catName.displayName}
                          </span>
                        );
                      })}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
