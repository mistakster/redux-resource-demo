import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getResources, getStatus } from 'redux-resource';
import List from './List';
import { readPeople, deletePerson } from '../redux/actions/people';
import DeleteButton from './DeleteButton';

const peopleSelector = people => {
    console.log('getting people items');
    const items = getResources(people, 'main');

    console.log('getting people status');
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

    return peopleSelector(useSelector(({ people }) => {
        console.log('computing content for the people');

        return people;
    }));
}

function useDeletePerson() {
    const dispatch = useDispatch();

    return useCallback((item) => {
        dispatch(deletePerson(item.id));
    }, [dispatch]);
}

function isPending(statuses, id) {
    return !!(statuses && statuses[id] && statuses[id].pending);
}

const People = () => {
    const { items, status, deleteStatuses } = useGetPeople();
    const handleDelete = useDeletePerson();

    const renderAction = useCallback((item, className) => (
        <DeleteButton
            className={className}
            item={item}
            disabled={isPending(deleteStatuses, item.id)}
            onDelete={handleDelete}
        />
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
