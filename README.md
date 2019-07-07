PepperLabs.io
===

### Build

```
$ npm run build
```

### Run

```
$ npm start
```

### Access tokens

Access tokens must be defined via an env variable `ACCESS_TOKENS` in a JSON format with an array of arrays, where
the each array contains 2 items: an access token and a source.
For example:

```
ACCESS_TOKENS='[["abc", "user 1"], ["def", "user 2"]]'
```
