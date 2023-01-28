# creative-coding.net

[personal website](https://www.creative-coding.net/) of Julian Mollik

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

## open ...

### ... issues

- [x] sliding mechanism in [/work](https://www.creative-coding.net/work) does not work 🤨
- [x] initial hiding in [/cv](https://www.creative-coding.net/cv) does not work
- [x] _http_ ➔ _https_ redirect
- [x] get rid of the "`[ goto ]`" formatting error
- [ ] enable opening hide/show links in new tabs

### ... features

- [x] read `package.json`'s version and display it ~~somewhere~~ in the footer
- [ ] i18n
- [ ] automated testing
- [ ] deploy the result of `npm run nuxt build`
- [x] archive the [PHP version of the page](https://v1.creative-coding.net/)
- [ ] TypeScript
- [ ] eslint & prettier
- [x] mobile viewports