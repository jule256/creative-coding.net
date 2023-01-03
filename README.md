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

- [ ] sliding mechanism in [/work](https://2023.creative-coding.net/work) does not work 🤨
- [ ] initial hiding in [/cv](https://2023.creative-coding.net/cv) does not work

### ... features

- [ ] read `package.json`'s version and display it somewhere
- [ ] i18n
- [ ] automated testing
- [ ] deploy the result of `npm run nuxt build`
- [ ] archive the PHP version of the page