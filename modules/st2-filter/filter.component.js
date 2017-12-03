import React from 'react';
import { PropTypes } from 'prop-types';

import './style.less';

export default class Filter extends React.Component {
  static propTypes = {
    label: PropTypes.string,
    multiple: PropTypes.bool,
    items: PropTypes.arrayOf(PropTypes.string),
    activeItems: PropTypes.arrayOf(PropTypes.string),
    onChange: PropTypes.func,
  }

  static defaultProps = {
    multiple: false,
  }

  state = {
    visible: false,
    search: '',
  }

  handleToggleItem(item) {
    const { multiple, activeItems, onChange } = this.props;
    if (!item) {
      return onChange([]);
    }

    if (activeItems.includes(item)) {
      return onChange(activeItems.filter(v => v !== item));
    }

    if (multiple) {
      return onChange(activeItems.concat(item));
    }

    return onChange([ item ]);
  }

  toggleVisible() {
    this.setState({
      visible: !this.state.visible,
    });
  }

  get visibleItems() {
    const { items, activeItems } = this.props;
    const { search } = this.state;

    return [
      ...activeItems
        .filter(item => !search || item.includes(search))
      ,
      ...items
        .filter(item => !activeItems.includes(item))
        .filter(item => !search || item.includes(search))
      ,
    ];
  }

  render() {
    const { label, multiple, items, activeItems } = this.props;

    return (
      <div className={`st2-filter ${this.state.visible ? 'st2-filter--active' : ''}`}>
        <div
          className={`st2-filter__label ${activeItems.length > 0 ? 'st2-filter__label--active' : ''}`}
          onClick={() => this.toggleVisible()}
        >
          { label }
          { activeItems.length > 0 ? (
            <span className="st2-filter__label-active-items">
            : { activeItems.join(', ') }
            </span>
          ) : null }
        </div>
        <div className="st2-filter__variants">
          { items.length > 4 ? (
            <div className="st2-filter__search">
              <input
                type="text"
                className="st2-filter__search-bar"
                placeholder="Find"
                value={this.state.search}
                onChange={({ target: { value: search } }) => this.setState({ search })}
              />
            </div>
          ) : null }

          { multiple && activeItems.length > 0 ? (
            <button className="st2-filter__clear" onClick={() => this.handleToggleItem(null)}>Clear selected</button>
          ) : null }

          <div className="st2-filter__list">
            { this.visibleItems.map((item) => (
              <div
                key={item}
                className={`st2-filter__item ${activeItems.includes(item) ? 'st2-filter__item--active' : ''}`}
                onClick={() => this.handleToggleItem(item)}
              >
                { item }
              </div>
            )) }
          </div>
        </div>
      </div>
    );
  }
}
