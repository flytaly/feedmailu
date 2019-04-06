/* eslint-disable import/prefer-default-export */
import { ME_QUERY } from '../components/card-header';

export const ME_QUERY_MOCK = {
    request: {
        query: ME_QUERY,
    },
    result: { data: { me: { id: 'id', email: 'email@test.com' } } },
};
