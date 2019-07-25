import React, { useState } from 'react';

type Props = {
  children: JSX.Element[] | JSX.Element;
  contentBackground?: string;
};

const TabContainer: React.FC<Props> = ({
  children,
  contentBackground = 'white'
}: Props) => {
  if (!(children instanceof Array)) children = [children];
  if (children.length === 0) return null;

  const selected = children.find(({ props: { selected } }) => selected);

  const [currentTab, setCurrentTab] = useState(
    selected ? selected.props.tab : children[0].props.tab
  );

  const handleClick = (tab: string) => setCurrentTab(tab);

  const tabEls = children.map(({ props: { tab } }) => {
    return (
      <div
        className={'tab-container__tab'}
        style={
          tab === currentTab
            ? {
                background: contentBackground,
                boxShadow: `0 2px 1px -1px ${contentBackground}`
              }
            : null
        }
        onClick={() => handleClick(tab)}
      >
        {tab}
      </div>
    );
  });

  return (
    <div className="tab-container">
      <div className="tab-container__tabs">{tabEls}</div>

      <div className="tab-container__body">
        {children.find(({ props: { tab } }) => tab === currentTab)}
      </div>
    </div>
  );
};

export default TabContainer;
