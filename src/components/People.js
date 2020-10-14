import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getResources, getStatus } from 'redux-resource';
import List from './List';
import { readPeople, deletePerson } from '../redux/actions/people';

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

const People = () => {
    const { items, status, deleteStatuses } = useGetPeople();
    const handleDelete = useDeletePerson();

    return (
        <List
            title="People"
            items={items}
            status={status}
            deleteStatuses={deleteStatuses}
            onDelete={handleDelete}
        />
    );
};

export default People;
