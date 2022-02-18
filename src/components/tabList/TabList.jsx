import {useState} from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

function TabList(props) {

  const [currentTab, setCurrent] = useState('one');

  const onTabClick = (e) => {
    setCurrent(e);

    if (e === "one") {
      props.bunRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
      });
    }
    else if (e === "two")
      props.sauceRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
      });
    else if (e === "three")
      props.mainRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
      });
  }
  return (
    <div style={{ display: 'flex' }}>
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

export default TabList;