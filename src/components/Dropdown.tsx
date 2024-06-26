import { Fragment, ReactNode, useEffect, useRef, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import {
  LogoutIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from "@heroicons/react/outline";
import avatar from "../assets/svg/avatar.svg";
import { useDispatch, useSelector } from "react-redux";
import { resetStore } from "../store/actions";
import { RootState } from "../store/types";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((state: RootState) => state.user);
  const ref = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSignOut = () => {
    dispatch(resetStore());
    window.location.href = "/";
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [ref]);

  return (
    <Menu
      as="div"
      ref={ref}
      className="relative inline-block text-left z-30 sm:w-[150px] sm:max-w-[250px]"
    >
      <div>
        <Menu.Button
          className="
                        inline-flex 
                        items-center 
                        justify-center 
                        w-full 
                        rounded-md 
                        bg-white 
                        px-4 py-2 
                        text-sm font-medium text-gray-700 
                        hover:bg-gray-50 
                        focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500"
          onClick={toggleDropdown}
        >
          <span className="sr-only">Open user menu</span>
          <img
            src={avatar}
            alt=""
            className="w-7 h-7 mr-2"
            aria-hidden="true"
          />
          <span className="text-[16px] font-bold hidden sm:block">
            {user?.name}
          </span>
          <span className="hidden sm:inline-flex">
            {isOpen ? (
              <ChevronUpIcon
                className="w-5 h-5 ml-2 -mr-1"
                aria-hidden="true"
              />
            ) : (
              <ChevronDownIcon
                className="w-5 h-5 ml-2 -mr-1"
                aria-hidden="true"
              />
            )}
          </span>
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
        show={isOpen}
      >
        <Menu.Items className="absolute right-0 w-60 mt-2 origin-top-right bg-white divide-y-2 divide-gray-200 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <MenuItem>
            <span className="font-bold text-[15px]">{user?.name}</span>
          </MenuItem>
          <MenuItem>
            <div className="flex items-center" onClick={handleSignOut}>
              <LogoutIcon className="w-7 h-7 -mr-5" aria-hidden="true" />
              <div className="flex-1 text-center font-bold text-[15px]">
                Sign out
              </div>
            </div>
          </MenuItem>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

const MenuItem = ({ children }: { children: ReactNode }) => {
  return (
    <div className="block px-4 py-3 text-sm">
      <Menu.Item>{children}</Menu.Item>
    </div>
  );
};

export default Dropdown;
export { MenuItem };
