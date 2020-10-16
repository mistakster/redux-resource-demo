import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getResources, getStatus } from 'redux-resource';
import { createSelector, createStructuredSelector } from 'reselect';
import List from './List';
import { readStarships, markStarship } from '../redux/actions/starships';
import MarkButton from './MarkButton';

const starshipsSelectorFactory = listName => createSelector(
    state => state.starships,
    createStructuredSelector({
        items: createSelector(
            starships => starships.resources,
            starships => starships.lists[listName],
            (resources, list) => getResources({ resources }, list)
        ),
        marked: createSelector(
            starships => starships.lists[listName],
            starships => starships.meta,
            (list, meta) => {
                if (!list) {
                    return {};
                }

                return list.reduce((acc, id) => {
                    acc[id] = !!meta[id].marked;

                    return acc;
                }, {});
            }
        ),
        status: createSelector(
            starships => starships.requests[`readStarships||${listName}`],
            request => getStatus(request || {}, 'status')
        )
    })
);

const starshipsMainListSelector = starshipsSelectorFactory('main');

function useGetStarships() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(readStarships('main'));
    }, [dispatch]);

    return useSelector(starshipsMainListSelector);
}

function useMarkStarship() {
    const dispatch = useDispatch();

    return useCallback((item) => {
        dispatch(markStarship(item));
    }, [dispatch]);
}

const Starships = () => {
    const { items, marked, status } = useGetStarships();

    const handleMark = useMarkStarship();

    const markedCount = Object
        .entries(marked)
        .filter(tuple => tuple[1])
        .length;

    const title = `Starships (marked ${markedCount} ${markedCount % 10 === 1 && markedCount !== 11 ? 'item' : 'items'})`;

    const renderAction = useCallback((item, className) => (
        <MarkButton
            className={className}
            item={item}
            active={marked[item.id]}
            onMark={handleMark}
        />
    ), [handleMark, marked]);

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
