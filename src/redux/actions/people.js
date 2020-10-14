import createActionCreators from 'redux-resource-action-creators';
import resultsMapper from '../../utils/resultsMapper';

export function readPeople(list) {
    return async (dispatch, getState, { fetchApi }) => {
        const readListAction = createActionCreators('read', {
            resourceType: 'people',
            requestKey: `readPeople||${list}`,
            list,
            mergeListIds: false
        });

        dispatch(readListAction.pending());

        try {
            const response = await fetchApi('people/');

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
