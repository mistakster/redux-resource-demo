import React from 'react';

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

export default MarkButton;
