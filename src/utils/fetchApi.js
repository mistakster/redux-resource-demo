/**
 * Request headers builder
 * @param {Function} getState
 * @param {String} [method]
 * @param {Object} [body]
 * @returns {Object}
 */
function buildFetchOptions(getState, method = 'GET', body) {
    const { token } = getState();

    const options = {
        headers: {
            Authorization: `Bearer ${token}`
        },
        method
    };

    if (body) {
        options.body = JSON.stringify(body);
        options.headers['Content-Type'] = 'application/json';
    }

    return options;
}

/**
 * Bind fetch method to the store
 * @param {Object} store
 * @returns {function(*=, *=, *=): Promise<null|*>}
 */
export default function bindFetchApi(store) {
    /*
     * @param {String} url
     * @param {String} [method]
     * @param {Object} [body]
     * @returns {Promise<null|any>}
     */
    return async (url, method, body) => {
        const options = buildFetchOptions(store.getState, method, body);
        const res = await fetch(`https://swapi.dev/api/${url}`, options);

        if (!res.ok) {
            throw new Error(res.statusText);
        }

        if (res.status === 204) {
            return null;
        }

        return await res.json();
    };
}
