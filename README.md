# selector-scrapper
Monitor a specific element on a webpage, more info on this [blog post](https://stsourlidakis.com/blog/monitor-elements-on-a-webpage-with-nodejs/)

## Install dependencies
```bash
$ npm install
```

## Get the selector
![getting the selector](https://stsourlidakis.com/files/chromeSelector.gif)

## Run
```bash
$ node index "https://example.com" "#someSelector"
```
Or change the [default url/selector/delay](https://github.com/stsourlidakis/selector-scrapper/blob/master/index.js#L2-L4) in index.js and run
```bash
$ node index
```
