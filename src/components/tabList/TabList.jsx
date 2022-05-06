//import PropTypes from 'prop-types';
import { useState, useRef, useEffect } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import tabListStyles from './tablList.module.css';

function useInView(ref) {
  const [isInView, setIsInView] = useState(false);
  const observerRef = useRef(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(([entry]) =>
        setIsInView(entry.isIntersecting),
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.2
      }
    );
  }, []);

  useEffect(() => {
    observerRef.current.observe(ref.current)
    return () => {
      observerRef.current.disconnect()
    };
  }, [ref])

  return isInView
}

function TabList({ bunRef, sauceRef, mainRef } ) {

  const [currentTab, setCurrent] = useState('one');

  const bunInView = useInView(bunRef)
  const sauceInView = useInView(sauceRef)
  const mainInView = useInView(mainRef)

  useEffect(() => {
    if (bunInView) {
      setCurrent('one')
    } else if (sauceInView) {
      setCurrent('two')
    } else {
      setCurrent('three')
    }
  }, [bunInView, sauceInView, mainInView])


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

// TabList.propTypes = PropTypes.shape(
//   {
//     bunRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
//     sauceRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
//     mainRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) })
//   }
// )

export default TabList;