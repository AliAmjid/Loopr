# Loopr app
Frontend part of Loopr project

## Requirements
- node 12.16.3
- yarn 1.x

## Setup
1. `yarn install`

## Development
start app in development mode: `yarn dev`

## Rules
- Before each commit run `yarn fix` or at least before pull request 
- Every component (`components` folder) must have storybook file
- Test everything
- Translate everything 
    - Every page(folder) even components must have own translation file
    - Write only into cs folder, others will be translated later

## Other
- Do not update core-js to version 3 - next-i18next requires version 2, it would break storybook