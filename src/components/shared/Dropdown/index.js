import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Dropdown extends Component {
  constructor() {
    super();

    this.state = {
      open: false,
    };

    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.handleGlobalMouseDown = this.handleGlobalMouseDown.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleGlobalMouseDown);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleGlobalMouseDown);
  }

  handleGlobalMouseDown({ target }) {
    if (this.ref.contains(target)) {
      return;
    }

    this.close();
  }

  open() {
    this.setState({ open: true });
  }

  close() {
    this.setState({ open: false });
  }

  render() {
    const { children } = this.props;

    if (!children) {
      return null;
    }

    return (
      <div ref={el => this.ref = el}>
        {children({
          open: this.open,
          close: this.close,
          isOpen: this.state.open,
        })}
      </div>
    );
  }
}

Dropdown.propTypes = {
  children: PropTypes.func,
};

Dropdown.defaultProps = {
  children: null,
};

export default Dropdown;
