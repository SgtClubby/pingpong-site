import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { useRecoilState } from 'recoil'
import { gamemodeAtom } from '@/atoms/gamemodeAtom'
import { stateAtom } from '@/atoms/stateAtom'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const capitalize = (s) => {
    if (typeof s !== 'string') return null
    return s.charAt(0).toUpperCase() + s.slice(1)
}

export default function Dropdown({options, title, atom}) {
    let dropdown = ""
    let setDropdown = () => {}

    if(!atom) {
         [dropdown, setDropdown] = useRecoilState(gamemodeAtom)
    } else {
         [dropdown, setDropdown] = useRecoilState(atom)
    }

    return (
        <Menu as="div" className="relative inline-block text-left">
        {options.length === 0 ? (
            <p className="text-gray-300 text-xl">No statistics available</p>
        ) : (
            <div>
                <Menu.Button className="inline-flex justify-center w-32 rounded-md border border-gray-800 shadow-sm px-4 py-2 bg-gray-800 text-sm font-medium text-gray-300 hover:bg-[#34455d] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
                {capitalize(dropdown) ?? title}
                <ChevronDownIcon className="ml-2 h-5 w-5" aria-hidden="true" />
                </Menu.Button>
            </div>
        )}
  

        <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
        >
            <Menu.Items className="origin-top-right absolute right-0 mt-2 w-32 rounded-md shadow-lg bg-gray-700 ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                    {options.map(option => (
                        <Menu.Item key={option}>
                            {({ active }) => (
                                <button
                                    onClick={() => setDropdown(option)}
                                    className={classNames(
                                        active ? 'bg-gray-600 text-gray-100 rounded-md' : 'text-gray-300',
                                        'block w-24 m-auto px-3 py-2 text-sm '
                                    )}
                                >
                                {capitalize(option)}
                                </button>
                            )}
                        </Menu.Item>
                    ))}
                </div>
            </Menu.Items>
        </Transition>
        </Menu>
    )
}