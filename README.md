# Realtime Transport Map
Show real time transport locations on a map.

## Map highlights
 - Zoom (mouse scroll)
 - Filter Routes
 - Show/Hide Stops
 - Vehicles are triangle and Stops are rectangular
 - Vehicles color, Stops color (inherited from associated Route color)
 - Vehicles heading (shown by rotating triangle)

## Demo:
 http://realtime-transport-map.surge.sh

## Tools:
 - Build tool: Angular CLI
 - SPA Framework: Angular 5
 - UI Framework: Angular Material
 - Data Visulization Framework: D3.js
 - Data Flow: @ngrx/store, @ngrx/effects, RxJs

## Performance consideration:
 - Progressive Web App philosophy (Service Worker)
 - Used associative array for faster and partial data update
 - Requested data in chunks to ensure optimize the http traffic

## Development consideration:
 - Modular, single source of truth, SRP, LIFT (Locate quickly, Identify at a glance, Flat structure, and Try to be DRY)
 - Unit Tests (critical cases only)

## Development server
Run `ng serve`. Navigate to `http://localhost:4200/`.

## Build
Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests
Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
