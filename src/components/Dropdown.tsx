import { Fragment, ReactNode, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { LogoutIcon, ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/outline';
import avatar from '../assets/svg/avatar.svg';
import User from '../types/user';

interface DropdownProps {
    user: User | null
}

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
}

const Dropdown = ({ user }: DropdownProps) => {
    const [isOpen, setIsOpen] = useState(false); // add state variable to keep track of open/close state

    const toggleDropdown = () => setIsOpen(!isOpen);

    return (
        <Menu as="div" className="relative inline-block text-left">
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
                    <img src={avatar} alt="" className="w-7 h-7 mr-2" aria-hidden="true" />
                    <span className='text-[16px] font-bold'>{user ? user.name : 'John Doe'}</span>
                    {isOpen ? <ChevronUpIcon className="w-5 h-5 ml-2 -mr-1" aria-hidden="true" /> : <ChevronDownIcon className="w-5 h-5 ml-2 -mr-1" aria-hidden="true" />}
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
                show={isOpen} // show transition only when dropdown is open
            >
                <Menu.Items
                    className="absolute right-0 w-60 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                >
                    <MenuItem>
                        <span className='font-bold text-[15px]'>{user ? user.name : 'John Doe'}</span>
                    </MenuItem>
                    <MenuItem>
                        <div className="flex items-center">
                            <LogoutIcon className="w-7 h-7 -mr-5" aria-hidden="true" />
                            <span className='flex-1 text-center font-bold text-[15px]'>Sign out</span>
                        </div>
                    </MenuItem>
                </Menu.Items>
            </Transition>
        </Menu>
    );
}

const MenuItem = ({ children }: { children: ReactNode }) => {
    return (
        <div className="py-1">
            <Menu.Item>
                {({ active }: { active: boolean }) => (
                    <a
                        href="#"
                        className={classNames(
                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                            'block px-4 py-2 text-sm'
                        )}
                    >
                        {children}
                    </a>
                )}
            </Menu.Item>
        </div>
    );
}

export default Dropdown;
export {
    MenuItem
}
