# virtual-sites-as-code
Generate standard virtual sites from yaml files

## Execute
```
npx mastermind-hostascode user/reponame/filename.yaml
```
## Features
- Download master config from GitHub private repo

## Notes
### GitHub API token
2 options to pass token:
- Pass as second CLI argument: 
```
npx mastermind-hostascode jhfoo/reponame/config.yaml <api token>
```
- Add line to ~/.mastermind: 
```
github_token=<api token>
```