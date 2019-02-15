PepperLabs.io
===

## Using `dist` for Github Pages

### Clone the repository into `dist`
```
$ git clone git@github.com:pepper-labs/pepperlabs.io.git --branch gh-pages dist
```

### Build

```
$ npm run build
```

### Release

```
$ cd dist && git add --all && git commit -m "Release at $(date)" && git push
```
