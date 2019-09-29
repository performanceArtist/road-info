import * as React from 'react';
import { connect } from 'react-redux';

import { openModal } from '@features/Modal/redux/actions';
import { Icon } from '@components/Icon/Icon';

type Props = typeof mapDispatch;

const Warning: React.FC<Props> = ({ openModal }) => (
  <Icon
    title="Опасность"
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

const mapDispatch = { openModal };

export default connect(
  null,
  mapDispatch
)(Warning);
