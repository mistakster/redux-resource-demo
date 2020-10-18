import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getResources, getStatus } from 'redux-resource';
import { createCachedSelector } from 're-reselect';
import List from './List';
import { readPeople, deletePerson } from '../redux/actions/people';
import DeleteButton from './DeleteButton';

const peopleSelector = people => {
    const items = getResources(people, 'main');
    const status = getStatus(people, 'requests.readPeople||main.status');

    const deleteStatuses = items.reduce((statuses, { id }) => {
        statuses[id] = getStatus(people.meta[id], 'deleteStatus');

        return statuses;
    }, {});

    return {
        items,
        status,
        deleteStatuses
    };
};

function useGetPeople() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(readPeople('main'));
    }, [dispatch]);

    return peopleSelector(useSelector(({ people }) => people));
}

function useDeletePerson() {
    const dispatch = useDispatch();

    return useCallback((item) => {
        dispatch(deletePerson(item.id));
    }, [dispatch]);
}

const deleteButtonFactory = createCachedSelector(
    (item) => item,
    (item, disabled) => disabled,
    (item, disabled, handleDelete) => handleDelete,
    (item, disabled, handleDelete) => (
        <DeleteButton
            item={item}
            disabled={disabled}
            onDelete={handleDelete}
        />
    )
)(item => item.id);

function isPending(statuses, id) {
    return !!(statuses && statuses[id] && statuses[id].pending);
}

const People = () => {
    const { items, status, deleteStatuses } = useGetPeople();
    const handleDelete = useDeletePerson();

    const renderAction = useCallback((item) => (
        deleteButtonFactory(item, isPending(deleteStatuses, item.id), handleDelete)
    ), [handleDelete, deleteStatuses]);

    return (
        <List
            title="People"
            items={items}
            status={status}
            renderAction={renderAction}
        />
    );
};

export default People;
