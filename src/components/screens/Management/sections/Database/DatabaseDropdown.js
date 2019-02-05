import React, { Component } from 'react';
import Input from '~/components/shared/Input';

class DatabaseDropdown extends Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    return (
      <Input placeholder="Select database type" />
    );
  }
}

export default DatabaseDropdown;
