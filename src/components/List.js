import React, { memo } from 'react';
import './List.css';

const Item = ({ item, renderAction }) => {
    return (
        <div className="list-item">
            <span className="list-item__name">{item.name}</span>
            {renderAction && renderAction(item, 'list-item__action')}
        </div>
    );
};

const MemoizedItem = memo(Item);

const List = ({ items, status, renderAction }) => {
    if (status.succeeded) {
        if (items.length > 0) {
            return (
                <div>
                    {items.map(item => (
                        <MemoizedItem
                            key={item.id}
                            item={item}
                            renderAction={renderAction}
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

const ListWrapper = ({ title, items, status, renderAction }) => {
    console.log(`refresh ${title}`);

    return (
        <div>
            <h2>{title}</h2>
            <List
                items={items}
                status={status}
                renderAction={renderAction}
            />
        </div>
    );
};

export default memo(ListWrapper);
