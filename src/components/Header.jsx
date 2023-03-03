import React, {useEffect, useState} from 'react';

const themes = ['light-theme', 'dark-theme'];

const Header = () => {
  const [activeTheme, setActiveTheme] = useState(themes[0])

  useEffect(() => {
    document.body.setAttribute('data-theme', activeTheme);
  }, [activeTheme]);

  const clickHandler = (key) => {
    setActiveTheme(key)
  }

  return (
    <div className='TodoList-Header'>
      <div>
        <h1>TODO</h1>
        { activeTheme === themes[0]
        ? (
            <img src='/images/icon-moon.svg' alt='Dark theme' onClick={() => clickHandler(themes[1])} />
          )
        : (
            <img src='/images/icon-sun.svg' alt='Light theme' onClick={() => clickHandler(themes[0])} />
          )
        }
      </div>
    </div>
  );
};

export default Header;