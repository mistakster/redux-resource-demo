import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getResources, getStatus } from 'redux-resource';
import { createSelector, createStructuredSelector } from 'reselect';
import List from './List';
import { readStarships, markStarship } from '../redux/actions/starships';
import MarkButton from './MarkButton';

const starshipsSelector = createSelector(
    state => state.starships,
    createStructuredSelector({
        items: starships => getResources(starships, 'main')
            .map(item => ({
                ...item,
                marked: !!starships.meta[item.id].marked
            })),
        status: createSelector(
            starships => starships.requests['readStarships||main'],
            request => getStatus(request || {}, 'status')
        )
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

    const renderAction = useCallback((item, className) => (
        <MarkButton
            className={className}
            item={item}
            onMark={handleMark}
        />
    ), [handleMark]);

    return (
        <List
            title={title}
            items={items}
            status={status}
            renderAction={renderAction}
        />
    );
};

export default Starships;
