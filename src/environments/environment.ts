// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  backendUrlCollegues: 'http://localhost:8080/collegues',
  backendUrlCheck: 'http://localhost:8080/check',
  backendUrlVotes: 'http://localhost:8080/votes',
  backendUrlComments: 'http://localhost:8080/comments'
};
