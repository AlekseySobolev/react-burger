import PropTypes from 'prop-types';
import { useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import tabListStyles from './tablList.module.css';

function TabList({ bunRef, sauceRef, mainRef }) {

  const [currentTab, setCurrent] = useState('one');

  const onTabClick = (e) => {
    setCurrent(e);

    if (e === "one") {
      bunRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
      });
    }
    else if (e === "two")
      sauceRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
      });
    else if (e === "three")
      mainRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
      });
  }
  return (
    <div className={tabListStyles.tabListBox}>
      <Tab value="one" active={currentTab === 'one'} onClick={onTabClick}>
        Булки
      </Tab>
      <Tab value="two" active={currentTab === 'two'} onClick={onTabClick}>
        Соусы
      </Tab>
      <Tab value="three" active={currentTab === 'three'} onClick={onTabClick}>
        Начинки
      </Tab>
    </div>
  )

}
TabList.propTypes = {
  bunRef: PropTypes.object,
  sauceRef: PropTypes.object,
  mainRef: PropTypes.object
}

export default TabList;