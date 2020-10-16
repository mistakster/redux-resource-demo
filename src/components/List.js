import React, { memo } from 'react';
import './List.css';

const MarkButton = ({ item, onMark }) => (
    <button
        type="button"
        className={`list-item__button list-item__button_mark ${item.marked ? 'list-item_marked' : ''}`}
        onClick={() => onMark(item)}
    >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            height="24"
            width="24"
            className="list-item__button-icon"
        >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2
            15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
    </button>
);

const DeleteButton = ({ item, disabled, onDelete }) => (
    <button
        type="button"
        className="list-item__button list-item__button_delete"
        onClick={() => onDelete(item)}
        disabled={disabled}
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

const Item = ({ item, isDeletePending, onDelete, onMark }) => {
    return (
        <div className="list-item">
            <span className="list-item__name">{item.name}</span>
            {onDelete && (
                <DeleteButton
                    item={item}
                    disabled={isDeletePending}
                    onDelete={onDelete}
                />
            )}
            {onMark && (
                <MarkButton
                    item={item}
                    onMark={onMark}
                />
            )}
        </div>
    );
};

const MemoizedItem = memo(Item);

function isPending(statuses, id) {
    return !!(statuses && statuses[id] && statuses[id].pending);
}

const List = ({ items, status, deleteStatuses, onDelete, onMark }) => {
    if (status.succeeded) {
        if (items.length > 0) {
            return (
                <div>
                    {items.map(item => (
                        <MemoizedItem
                            key={item.id}
                            item={item}
                            isDeletePending={isPending(deleteStatuses, item.id)}
                            onDelete={onDelete}
                            onMark={onMark}
                        />
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

const ListWrapper = ({ title, items, status, deleteStatuses, onDelete, onMark }) => {
    console.log(`refresh ${title}`);

    return (
        <div>
            <h2>{title}</h2>
            <List
                items={items}
                status={status}
                deleteStatuses={deleteStatuses}
                onDelete={onDelete}
                onMark={onMark}
            />
        </div>
    );
};

export default memo(ListWrapper);
