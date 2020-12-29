# App
Frontend part of Loopr project

## Requirements
- node 12.18.3
- yarn 1.x

## Setup
1. `yarn install`

## Development
-  `yarn dev`

## Testing
- `yarn test`

## Storybook
- `yarn storybook`

## Config
- You can edit config by setting environment variables in cli or in `.env.local` (see `.env` for config options)

## Translations
### Export CSV 
Run `yarn translations:export` and it will generate `translations.export.csv`.

### Import CSV
`yarn translations:import` will use `translations.import.csv` file. It uses default language translations files. It will not add or remove fields in default language files.
