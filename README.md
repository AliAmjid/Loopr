# Loopr
- [Api](./api)
- [App](./app)

## Makefile
Run `make` and appropriate command

|Commands|Info|
|---|---|
|dev-build|Builds bundle in **development** mode|
|dev-up|Starts bundle in **development** mode|
|dev-up-build|Builds and then starts the bundle in **development** mode|
|dev-down|Remove bundle in **development** mode|

## Bundle parts
### [Api](./api)
> Backend
- Default port: (no SSL) 4000
- Alternative SSL: 4001 (https://localhost:4001/graphql)
### [App](./app)
> Frontend web app
- Default port: 3000
- Alternative SSL: (https://localhost:4001/)
### [Docs](./docs)
> User documentation for `app` 
- Default port: 3001
### [Storybook](./app)
> Showcase of components for `app`
>
> Runs only in docker development mode  
- Default port: 3002
