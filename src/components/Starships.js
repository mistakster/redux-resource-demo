import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getResources, getStatus } from 'redux-resource';
import { createSelector, createStructuredSelector } from 'reselect';
import List from './List';
import { readStarships } from '../redux/actions/starships';

const starshipsSelector = createSelector(
    state => {
        console.log('computing content for the starships');

        return state.starships;
    },
    createStructuredSelector({
        items: starships => {
            console.log('getting starships items');

            return getResources(starships, 'main');
        },
        status: starships => {
            console.log('getting starships status');

            return getStatus(starships, 'requests.readStarships||main.status');
        }
    })
);

function useGetStarships() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(readStarships('main'));
    }, [dispatch]);

    return useSelector(starshipsSelector);
}

const Starships = () => {
    const { items, status } = useGetStarships();

    return (
        <List
            title="Starships"
            items={items}
            status={status}
        />
    );
};

export default Starships;
