const WRITE_PERMISSIONS = [
  'PROJECT',
  'UPM_SCHEMA',
  'UPM_READ',
  'UPM_PUB',
  'UPM_CREATE',
  'UPM_WRITE',
  'UPM_DELETE',
  'UPM_PUBLISH',
  'OPT_READ',
  'OPT_CREATE_ENRICHMENTS',
  'OPT_WRITE_ENRICHMENTS',
  'OPT_DELETE_ENRICHMENTS',
  'OPT_CREATE_INTENTS',
  'OPT_WRITE_INTENTS',
  'OPT_DELETE_INTENTS',
  'OPT_PUB',
  'OPT_PUBLISH',
  'OPT_CREATE_QUIRKS',
  'OPT_WRITE_QUIRKS',
  'OPT_DELETE_QUIRKS',
  'OPT_CREATE_SIGNALS',
  'OPT_WRITE_SIGNALS',
  'OPT_DELETE_SIGNALS',
  'OPT_CREATE_TESTS',
  'OPT_WRITE_TESTS',
  'OPT_DELETE_TESTS',
  'RDT_UPDATE',
  'RDT_CREATE',
  'RDT_DELETE',
  'UPM_DATACONN',
  'UPM_DATATYPE',
  'PRM_SCHEMA',
];

const makeApiKey = (teamId: string, projectId: string, name: string, permissions: string[]) => ({
  name,
  teamId,
  projects: [
    {
      projectId,
      permissions,
      roles: [],
      useCustom: true,
    },
  ],
  email: '',
  identity_subject: '',
  isAdmin: false,
});

export const makeWriteApiKey = (teamId: string, projectId: string) =>
  makeApiKey(teamId, projectId, 'Created by Demos CLI (write)', WRITE_PERMISSIONS);
