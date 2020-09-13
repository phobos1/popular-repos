import { gql } from '@apollo/client';

export const GET_LICENSES = gql`
    query GetLicenses {
        licenses {
            name
            key
        }
    }
`;
