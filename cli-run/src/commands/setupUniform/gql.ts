import fetch from 'node-fetch';

export const getAvailableTeams = async (params: UNIFORM_API.GetTeamsParams) => {
  const { apiHost = 'https://uniform.app', headers, subject } = params;
  const query = `
  query GetUserInfo($subject: String!) {
    info: identities_by_pk(subject: $subject) {
      name
      email_address
      teams: organizations_identities(order_by: { organization: { name: asc } }) {
        team: organization {
          name
          id
          sites {
            name
            id
          }
        }
      }
    }
  }
  `;

  const endpoint = new URL('/v1/graphql', apiHost);

  const response = await fetch(endpoint, {
    method: 'POST',
    body: JSON.stringify({
      query,
      variables: {
        subject,
      },
    }),
    headers,
  }).then(res => res.json());

  return (response as UNIFORM_API.TeamsResponse).data.info.teams;
};
