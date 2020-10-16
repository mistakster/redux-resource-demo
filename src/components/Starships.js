import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getResources, getStatus } from 'redux-resource';
import { createSelector, createStructuredSelector } from 'reselect';
import List from './List';
import { readStarships, markStarship } from '../redux/actions/starships';

const starshipsSelector = createSelector(
    state => {
        console.log('computing content for the starships');

        return state.starships;
    },
    createStructuredSelector({
        items: starships => {
            console.log('getting starships items');

            const items = getResources(starships, 'main');

            return items.map(item => {
                const { marked } = starships.meta[item.id];

                return {
                    ...item,
                    marked: !!marked
                };
            });
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

function useMarkStarship() {
    const dispatch = useDispatch();

    return useCallback((item) => {
        dispatch(markStarship(item));
    }, [dispatch]);
}

const Starships = () => {
    const { items, status } = useGetStarships();

    const handleMark = useMarkStarship();

    const markedCount = items
        .filter(({ marked }) => marked)
        .length;

    const title = `Starships (marked ${markedCount} ${markedCount % 10 === 1 && markedCount !== 11 ? 'item' : 'items'})`;

    return (
        <List
            title={title}
            items={items}
            status={status}
            onMark={handleMark}
        />
    );
};

export default Starships;
