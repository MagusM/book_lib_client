import { Fragment, ReactNode } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { UserIcon, LogoutIcon } from '@heroicons/react/outline';

interface DropdownProps {
    children?: ReactNode;
}

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
}

const Dropdown = ({ children }: DropdownProps) => {
    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button className="inline-flex items-center justify-center w-full rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500">
                    <span className="sr-only">Open user menu</span>
                    <UserIcon className="w-5 h-5 mr-2" aria-hidden="true" />
                    <span>John Doe</span>
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
            >
                <Menu.Items
                    className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                >
                    {children}
                </Menu.Items>
            </Transition>
        </Menu>
    );
}

const MenuItem = ({ children }: DropdownProps) => {
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

function DropdownExample() {
    return (
        <Dropdown>
            <MenuItem>
                <span>Profile</span>
            </MenuItem>
            <MenuItem>
                <div className="flex items-center">
                    <LogoutIcon className="w-4 h-4 mr-2" aria-hidden="true" />
                    <span>Logout</span>
                </div>
            </MenuItem>
        </Dropdown>
    );
}

export default Dropdown;
