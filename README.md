# TypeScript Monorepo

📦 Base Repository Template to build your Monorepo using [PNPM](https://pnpm.io/)

## Workspaces

### Features
 - Monorepo Managed by PNPM
 - Out of Box Editing - Start Coding and Publish packages without any setup required 
 - Support for [TypeScript](https://www.typescriptlang.org/)
 - Buddle packages using [Rollup](https://rollupjs.org/guide/en/) and compile using [Babel](https://babeljs.io/) (swc - In Progress)
 - [Concurrently](https://www.npmjs.com/package/concurrently) to run all packages at once

### Setup

 - Install PNPM globally 
```bash
$ npm i -g pnpm
```

 - BootStrap Packages and Dependencies
 ```bash
 $ pnpm bootstrap
 ```
 - Thats it 🎉

### Examples
 - Create React App 
 Full Example [here](examples/cra)

 TODO - check independent versioning 
      - try publishing package 