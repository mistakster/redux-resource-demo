import React, { memo } from 'react';
import './List.css';

const DeleteButton = ({ item, onDelete }) => (
    <button
        type="button"
        className="list-item__button list-item__button_delete"
        onClick={() => onDelete(item)}
    >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            height="24"
            width="24"
            className="list-item__button-icon"
        >
            <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17
                    12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"/>
        </svg>
    </button>
)

const Item = memo(({ item, onDelete }) => {
    return (
        <div className="list-item">
            <span className="list-item__name">{item.name}</span>
            {onDelete && (
                <DeleteButton item={item} onDelete={onDelete}/>
            )}
        </div>
    );
});

const List = ({ items, status, onDelete }) => {
    if (status.succeeded) {
        if (items.length > 0) {
            return (
                <div>
                    {items.map(item => (
                        <Item key={item.id} item={item} onDelete={onDelete}/>
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

const ListWrapper = memo(({ title, items, status, onDelete }) => {
    console.log(`refresh ${title}`);

    return (
        <div>
            <h2>{title}</h2>
            <List items={items} status={status} onDelete={onDelete}/>
        </div>
    );
});

export default ListWrapper;
