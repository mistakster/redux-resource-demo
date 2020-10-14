import createActionCreators from 'redux-resource-action-creators';
import resultsMapper from '../../utils/resultsMapper';

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

            dispatch(readListAction.succeeded({
                resources: resultsMapper(response)
            }));
        } catch (err) {
            dispatch(readListAction.failed({
                error: err
            }));
        }
    };
}
