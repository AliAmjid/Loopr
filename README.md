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
|prod-build|Builds bundle in **production** mode|
|prod-up|Starts bundle in **production** mode|
|prod-up-build|Builds and then starts the bundle in **production** mode|
|prod-down|Remove bundle in **production** mode|

## Bundle parts
### [Api](./api)
> Backend
- Default port: 4000
### [App](./app)
> Frontend web app
- Default port: 3000
### [Docs](./docs)
> User documentation for `app` 
- Default port: 3001
### [Storybook](./app)
> Showcase of components for `app`
>
> Runs only in docker development mode  
- Default port: 3002
