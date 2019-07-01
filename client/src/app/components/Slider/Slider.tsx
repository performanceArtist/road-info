import React from 'react';
import uuid from 'short-uuid';

import Model from './js/model/model';
import View from './js/view/view';
import Controller from './js/controller/controller';

function init(selector, options = {}) {
  const model = new Model(selector, options);
  const view = new View(model);
  const controller = new Controller(model, view);

  return {
    setState: model.setState,
    getState: model.getState
  };
}

class Slider extends React.Component {
  constructor(props) {
    super(props);

    this.id = uuid.generate();
  }

  componentDidMount() {
    const { options = {} } = this.props;
    init(`#${this.id}`, options);
  }

  render() {
    return <div id={this.id} />;
  }
}

export default Slider;
