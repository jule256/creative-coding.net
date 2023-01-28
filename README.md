# creative-coding.net

[personal website](https://www.creative-coding.net/) of Julian Mollik

## requirements

Node.js 18 (with [global `fetch`](https://nodejs.org/de/blog/announcements/v18-release-announce/))

## setup

```bash
npm install
```

## development

create an `.env` file with

```bash
HATEOAS_INDEX: 'http://path.to.local.api'
```

start the development server with

```bash
npm run dev
```

## production

create an `.env.production` file with

```bash
HATEOAS_INDEX: 'https://path.to.production.api/'
```

generate a static production build:

```bash
npm run generate:prod 
```

copy the content of `.output/public` to any static hosting

## unit testing

create an `.env.unittest` file with

```bash
IS_UNIT_TEST: true
```

run all available unit tests

```bash
npm run test:unit
```

## open ...

### ... issues

- [x] sliding mechanism in [/work](https://www.creative-coding.net/work) does not work 🤨
- [x] initial hiding in [/cv](https://www.creative-coding.net/cv) does not work
- [x] _http_ ➔ _https_ redirect
- [ ] enable opening hide/show links in new tabs
- [ ] get rid of the "`[ goto ]`" formatting error

### ... features

- [x] read `package.json`'s version and display it ~~somewhere~~ in the footer
- [ ] i18n
- [ ] automated testing
- [ ] deploy the result of `npm run nuxt build`
- [x] archive the [PHP version of the page](https://v1.creative-coding.net/)
- [ ] TypeScript
- [ ] eslint & prettier
- [x] mobile viewports