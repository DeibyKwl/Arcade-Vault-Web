import React, { useState } from 'react';
import AllStores from '../components/AllStores.jsx';
import GamesByYear from '../components/GamesByYear.jsx';
import AllGames from '../components/AllGames.jsx';
import GamesByGenre from '../components/GamesByGenre.jsx';
import GamesByStore from '../components/GamesByStore.jsx';
import StoreByAddress from '../components/StoreByAddress.jsx';
import StoreByCity from '../components/StoreByCity.jsx';
import GamesByCost from '../components/GamesByCost.jsx';
import GamesByTypeOfMachine from '../components/GamesByTypeOfMachine.jsx';
import GamesByNumOfPlayers from '../components/GamesByNumOfPlayers.jsx';
import UpdateStore from '../components/UpdateStore.jsx';
import UpdateGame from '../components/UpdateGame.jsx';

const HomePage = () => {
    const [activeTab, setActiveTab] = useState('stores');

    const renderComponent = () => {
        switch (activeTab) {
            case 'stores':
                return <AllStores />;
            case 'games':
                return <AllGames />;
            case 'gamesbyyear':
                return <GamesByYear />;
            case 'gamesbygenre':
                return <GamesByGenre />;
            case 'gamesbystore':
                return <GamesByStore />;
            case 'gamesbycost':
                return <GamesByCost />;
            case 'gamesbytypeofmachine':
                return <GamesByTypeOfMachine />;
            case 'storebyaddress':
                return <StoreByAddress />;
            case 'storebycity':
                return <StoreByCity />;
            case 'gamesbynumofplayers':
                return <GamesByNumOfPlayers />;
            case 'updatestore':
                return <UpdateStore />;
            case 'updategame':
                return <UpdateGame />;
            default:
                return <AllStores />;
        }
    };

    const handleDropdownSelect = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className="min-h-screen flex flex-col">
            <div className="w-full">
                <div className="body min-h-screen flex flex-col items-center p-4">
                    <div className="flex w-full justify-between">
                        <h2 className="arcade-font text-lg text-yellow-500">HI-SCORE-29500</h2>
                        <h1 className="arcade-font red-orange-gradient-text text-2xl flex px-16 pb-6">Arcade Vault</h1>
                        <h2 className="arcade-font text-lg text-yellow-500">CREDIT 0</h2>
                    </div>
                    <div className='justify-center'>
                        <Navbar onSelect={handleDropdownSelect} />
                    </div>

                    <div className="flex-grow w-full flex flex-col items-center justify-start">
                        <div className="w-full md:w-5/6 lg:w-11/12 bg-black text-white p-2 rounded-lg">
                            {renderComponent()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


function Navbar({ onSelect }) {
    return (
        <div className="flex justify-center  w-full"> {/* Add justify-center class */}
            <nav className=" flex justify-center gap-4 px-10 text-orange-500 text-shadow-lg">
                <DropdownNavItem title="Stores" onSelect={onSelect}>
                    <DropdownMenu>
                        <DropdownItem onSelect={() => onSelect('storebyaddress')}>Search Stores by Address</DropdownItem>
                        <DropdownItem onSelect={() => onSelect('storebycity')}>Search Stores by City</DropdownItem>
                        <DropdownItem onSelect={() => onSelect('stores')}>View All Stores</DropdownItem>
                    </DropdownMenu>
                </DropdownNavItem>

                <DropdownNavItem title="Games" onSelect={onSelect}>
                    <DropdownMenu>
                        <DropdownItem onSelect={() => onSelect('gamesbycost')}>Search Games by Cost</DropdownItem>
                        <DropdownItem onSelect={() => onSelect('gamesbygenre')}>Search Games by Genre</DropdownItem>
                        <DropdownItem onSelect={() => onSelect('gamesbynumofplayers')}>Search Games by Number of Players</DropdownItem>
                        <DropdownItem onSelect={() => onSelect('gamesbytypeofmachine')}>Search Games by Type of Machine</DropdownItem>
                        <DropdownItem onSelect={() => onSelect('gamesbyyear')}>Search Games by Year</DropdownItem>
                        <DropdownItem onSelect={() => onSelect('gamesbystore')}>Search Games by Store</DropdownItem>
                        <DropdownItem onSelect={() => onSelect('games')}>View All Games</DropdownItem>

                    </DropdownMenu>
                </DropdownNavItem>

                <DropdownNavItem title="Modify" onSelect={onSelect}>
                    <DropdownMenu>
                        <DropdownItem onSelect={() => onSelect('updatestore')}>Update Stores</DropdownItem>
                        <DropdownItem onSelect={() => onSelect('updategame')}>Update Games</DropdownItem>
                    </DropdownMenu>
                </DropdownNavItem>

            </nav>
        </div>
    );
}

function DropdownNavItem({ title, onSelect, children }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const closeDropdown = () => {
        setIsOpen(false);
    };

    return (
        <div className="nav-item relative">
            <button className="dropdown-toggle pixel-font" onClick={toggleDropdown}>
                {title}
            </button>
            {isOpen && (
                <div className="dropdown absolute z-10">
                    {React.Children.map(children, child => {
                        return React.cloneElement(child, { closeDropdown });
                    })}
                </div>
            )}
        </div>
    );
}


function DropdownMenu({ children, closeDropdown }) {
    return (
        <div className="dropdown-menu">
            {React.Children.map(children, child => {
                // Cloning DropdownItem and passing closeDropdown function as a prop
                return React.cloneElement(child, { closeDropdown });
            })}
        </div>
    );
}

function DropdownItem({ onSelect, closeDropdown, children }) {
    const [isHovering, setIsHovering] = useState(false);

    return (
        <button
            className="dropdown-item pixel-font relative pl-8"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            onClick={() => {
                onSelect();
                closeDropdown();
            }}
        >
            {isHovering && (
                <span className="blinking-cursor text-green-400 absolute left-0 inset-y-0 flex items-center pl-2">{'>'}</span>            )}
            <span className={`hover-blue-gradient ${isHovering ? 'blue-gradient-text' : ''}`}>
                {children}
            </span>
        </button>
    );
}


export default HomePage;

