import React, { memo } from 'react';

const Item = memo(({ item }) => {
    return (
        <div title={JSON.stringify(item, null, 2)}>
            {item.name}
        </div>
    );
});

const List = ({ items, status }) => {
    if (status.succeeded) {
        if (items.length > 0) {
            return (
                <div>
                    {items.map(item => (
                        <Item key={item.id} item={item}/>
                    ))}
                </div>
            );
        } else {
            return (
                <div>Empty list</div>
            );
        }
    } else if (status.failed) {
        return (
            <div>Error! Refresh the page</div>
        );
    }

    return (
        <div>Loading&hellip;</div>
    );
};

const ListWrapper = memo(({ title, items, status }) => {
    console.log(`refresh ${title}`);

    return (
        <div>
            <h2>{title}</h2>
            <List items={items} status={status}/>
        </div>
    );
});

export default ListWrapper;
