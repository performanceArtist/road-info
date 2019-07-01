import React from 'react';
import { connect } from 'react-redux';

import { openModal } from '@redux/modal/actions';
import Icon from '@components/Icon/Icon';

const actions = { openModal };

const Warning = ({ openModal }) => (
  <Icon
    onClick={() =>
      openModal('Info', {
        counter: 1,
        notices: [
          { message: 'Сработал аварийный стоп', warning: true },
          { message: 'Неисправность: нет давления на фильтр', warning: false },
          { message: 'Перенапряжение анода', warning: false },
          { message: 'Пробой при тренировке', warning: true }
        ]
      })
    }
  />
);

export default connect(
  null,
  actions
)(Warning);
