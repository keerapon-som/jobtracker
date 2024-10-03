import React, { useEffect, useState, useRef } from 'react';
import './index.css';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentMenu,setIsMobileMode } from '../../slices/menu';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../store';
import { CSSTransition } from 'react-transition-group';

export function Navbar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = React.useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };
  // const [isMobile, setIsMobile] = useState(window.innerWidth < 640); // Initial check for mobile mode
  const dispatch = useDispatch();
  const CurrentMenu = useSelector((state: RootState) => state.menu);


  const HandleClickMenu = (e: any) => {
    const menuId = e.currentTarget.id;
    dispatch(setCurrentMenu(menuId));
    navigate('/' + menuId);
  };


  const getMenuClass = (menuId: string, mode:string) => {

    if(mode === 'mobile'){
      return CurrentMenu.currentmenu === menuId
      ? "block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white"
      : "block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white hover:cursor-pointer";
    } else {
      return CurrentMenu.currentmenu === menuId
      ? 'rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white'
      : 'rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white hover:cursor-pointer';
    }
  };

  const buttonProfileRef = useRef<HTMLButtonElement>(null);
  const buttonNavRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (buttonProfileRef.current && !buttonProfileRef.current.contains(event.target as Node)) {
        // Perform the function when clicked outside
        setIsProfileMenuOpen(false);
      }
    }

    if (isProfileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isProfileMenuOpen, toggleProfileMenu]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (buttonNavRef.current && !buttonNavRef.current.contains(event.target as Node)) {
        // Perform the function when clicked outside
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, setIsOpen]);

  

  useEffect(() => {

    if(isOpen == true && window.innerWidth >= 640){
      setIsOpen(false);
    }
    const handleResize = () => {
      dispatch(setIsMobileMode(window.innerWidth < 640));
      // setIsMobile(window.innerWidth < 640);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [window.innerWidth]);

  return (
    <>
      <nav className="bg-gray-800 top-0">
        <div className="fixed h-16 px-2 sm:px-6 lg:px-8 bg-gray-800 w-screen z-20">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded={isOpen ? "true" : "false"}
                ref={buttonNavRef}
              >
                <span className="sr-only">Open main menu</span>
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              </button>
            </div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  <a onClick={HandleClickMenu} id="Dashboard" className={getMenuClass('Dashboard','pc')} aria-current="page">Dashboard</a>
                  <a onClick={HandleClickMenu} id="JobScheduling" className={getMenuClass('JobScheduling','pc')}>Job Scheduling</a>
                  <a onClick={HandleClickMenu} id="JobScrapeList" className={getMenuClass('JobScrapeList','pc')}>Job Scrape List</a>

                </div>
              </div>
              <div className="ml-auto">
      <div className="ml-3 z-50">
        <div>
          <button
            type="button"
            className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            id="user-menu-button"
            aria-expanded={isProfileMenuOpen ? "true" : "false"}
            aria-haspopup="true"
            onClick={toggleProfileMenu}
            ref={buttonProfileRef}
          >
            <span className="absolute -inset-1.5"></span>
            <span className="sr-only">Open user menu</span>
            <img
              className="h-8 w-8 rounded-full"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
          </button>
        </div>
        <CSSTransition
          in={isProfileMenuOpen}
          timeout={300}
          classNames="profile-menu"
          unmountOnExit
        >
          <div
            className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="user-menu-button"
          >
            <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" id="user-menu-item-0">Your Profile</a>
            <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" id="user-menu-item-1">Settings</a>
            <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" id="user-menu-item-2">Sign out</a>
          </div>
        </CSSTransition>
      </div>
    </div>
            </div>
          </div>
          
        </div>
        

        <CSSTransition
          in={isOpen}
          timeout={500}
          classNames="profile-menu"
          unmountOnExit
        >
          <div className="sm:hidden" id="mobile-menu">
            <div className="space-y-1 px-2 pb-3 pt-16 fixed w-full bg-gray-800 z-10">
              <a onClick={HandleClickMenu} id="Dashboard" className={getMenuClass('Dashboard', 'mobile')} aria-current="page">Dashboard</a>
              <a onClick={HandleClickMenu} id="JobScheduling" className={getMenuClass('JobScheduling', 'mobile')}>Job Scheduling</a>
              <a onClick={HandleClickMenu} id="JobScrapeList" className={getMenuClass('JobScrapeList', 'mobile')}>Job Scrape List</a>
            </div>
          </div>
        </CSSTransition>


      </nav>

    </>
  );
}