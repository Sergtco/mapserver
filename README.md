# Server
## How to run
``` sh
templ generate && go run .
```
or for live reloading
```sh
air
```
## Structure
- view/ - templates for components and pages
- handlers/ - all http handlers 
    - frontend.go - html related handlers used for frontend
    - api.go - api, used by frontend
