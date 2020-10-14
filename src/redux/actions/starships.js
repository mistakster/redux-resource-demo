import { actionTypes } from 'redux-resource';
import createActionCreators from 'redux-resource-action-creators';
import resultsMapper from '../../utils/resultsMapper';

export function markStarship(item) {
    return {
        type: actionTypes.UPDATE_RESOURCES,
        resources: {
            starships: {
                [item.id]: {
                    name: item.name.toUpperCase(),
                }
            }
        },
        meta: {
            starships: {
                [item.id]: {
                    marked: true
                }
            }
        }
    };
}

export function readStarships(list) {
    return async (dispatch, getState, { fetchApi }) => {
        const readListAction = createActionCreators('read', {
            resourceType: 'starships',
            requestKey: `readStarships||${list}`,
            list,
            mergeListIds: false
        });

        dispatch(readListAction.pending());

        try {
            const response = await fetchApi('starships/');

            dispatch(readListAction.succeeded(resultsMapper(response)));
        } catch (err) {
            dispatch(readListAction.failed({
                error: err
            }));
        }
    };
}
