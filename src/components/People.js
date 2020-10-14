import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getResources, getStatus } from 'redux-resource';
import List from './List';
import { readPeople } from '../redux/actions/people';

const peopleSelector = people => {
    console.log('getting people items');
    const items = getResources(people, 'main');

    console.log('getting people status');
    const status = getStatus(people, 'requests.readPeople||main.status');

    return {
        items,
        status
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

const People = () => {
    const { items, status } = useGetPeople();

    return (
        <List
            title="People"
            items={items}
            status={status}
        />
    );
};

export default People;
