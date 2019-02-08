import { Component } from 'react';
import PropTypes from 'prop-types';

class Toggle extends Component {
  constructor() {
    super();

    this.state = {
      on: false,
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(state => ({ on: !state.on }), () => {
      this.props.onChange({ on: this.state.on });
    });
  }

  render() {
    const { children } = this.props;

    if (!children) {
      return null;
    }

    return children({
      toggle: this.toggle,
      on: this.state.on,
    });
  }
}

Toggle.propTypes = {
  children: PropTypes.func,
  onChange: PropTypes.func.isRequired,
};

Toggle.defaultProps = {
  children: null,
};

export default Toggle;
