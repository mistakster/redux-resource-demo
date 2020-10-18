import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getResources, getStatus } from 'redux-resource';
import { createSelector, createStructuredSelector } from 'reselect';
import { createCachedSelector } from 're-reselect';
import { readStarships, markStarship } from '../redux/actions/starships';
import List from './List';
import MarkButton from './MarkButton';

const starshipsSelector = createCachedSelector(
    (state) => state.starships,
    (state, listName) => listName,
    createStructuredSelector({
        items: createSelector(
            (starships) => starships.resources,
            (starships, listName) => starships.lists[listName],
            (resources, list) => getResources({ resources }, list)
        ),
        marked: createSelector(
            (starships, listName) => starships.lists[listName],
            (starships) => starships.meta,
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
            (starships, listName) => starships.requests[`readStarships||${listName}`],
            request => getStatus(request || {}, 'status')
        )
    })
)((state, listName) => listName);

function useGetStarships() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(readStarships('main'));
    }, [dispatch]);

    return useSelector(state => starshipsSelector(state, 'main'));
}

function useMarkStarship() {
    const dispatch = useDispatch();

    return useCallback((item) => {
        dispatch(markStarship(item));
    }, [dispatch]);
}

const markButtonFactory = createCachedSelector(
    (item) => item,
    (item, active) => active,
    (item, active, handleMark) => handleMark,
    (item, active, handleMark) => (
        <MarkButton
            item={item}
            active={active}
            onMark={handleMark}
        />
    )
)(item => item.id);

const Starships = () => {
    const { items, marked, status } = useGetStarships();

    const handleMark = useMarkStarship();

    const markedCount = Object
        .entries(marked)
        .filter(tuple => tuple[1])
        .length;

    const title = `Starships (marked ${markedCount} ${markedCount % 10 === 1 && markedCount !== 11 ? 'item' : 'items'})`;

    const renderAction = useCallback((item) => (
        markButtonFactory(item, marked[item.id], handleMark)
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
