import React from 'react';
import People from './People';
import Starships from './Starships';
import './Page.css';

const Page = () => {
    return (
        <div className="page">
            <div className="page__col">
                <People/>
            </div>
            <div className="page__col">
                <Starships/>
            </div>
        </div>
    );
};

export default Page;
