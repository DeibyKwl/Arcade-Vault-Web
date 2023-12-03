import React, { useState } from 'react';
import AllStores from '../components/AllStores.jsx';
import GamesByYear from '../components/GamesByYear.jsx';
import AllGames from '../components/AllGames.jsx';
import GamesByGenre from '../components/GamesByGenre.jsx';
import GamesByStore from '../components/GamesByStore.jsx';

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
            default:
                return <AllStores />;
        }
    };

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };



    return (

        <div className="screen-bg min-h-screen flex flex-col items-center justify-center">
            <div className="screen-effect w-full max-w-6xl p-4">
                <div className="body min-h-screen flex flex-col items-center justify-center p-4">
                    <div className="flex justify-center items-start w-full px-10 mt-4">

                        {/* score on the left */}
                        <h2 className="arcade-font text-lg text-yellow-500 px-10">HI-SCORE-29500</h2>

                        {/* Arcade Vault in the center */}
                        <h1 className="arcade-font red-orange-gradient-text text-2xl px-8 "> Arcade Vault </h1>

                        {/* credits on the right */}
                        <h2 className="arcade-font text-lg text-yellow-500 outline-text px-10">CREDIT 0</h2>
                    </div>

                    <nav className="flex justify-center space-x-4 p-4 text-white">
                        {['stores', 'games', 'gamesbyyear', 'gamesbygenre', 'gamesbystore'].map((tab) => (
                            <h1 key={tab} className={`arcade-font  ${activeTab === tab ? 'blue-gradient-text' : ''}`}>
                                <button onClick={() => handleTabClick(tab)}>
                                    {activeTab === tab ? '>' : ''} {tab.replace(/([A-Z])/g, ' $1')}
                                </button>
                            </h1>
                        ))}
                    </nav>



                    {/* Game Over text */}
                    <h1 className="arcade-font text-xl text-yellow-900 text-shadow-lg outline-text my-4">GAME OVER</h1>



                    {/* Main content */}
                    <div className="flex-grow w-full flex flex-col items-center justify-start">
                        <div className="w-full md:w-4/5 lg:w-3/4 bg-black text-white p-4 rounded-lg shadow-lg">
                            {renderComponent()}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default HomePage;