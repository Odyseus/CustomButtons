### Requirements to build the HTML pages from the PUG files

- Node.js
    - Download the [source](https://nodejs.org/download/) and install.
```bash
$ ./configure
$ make
$ [sudo] make install
```

- Pug
```bash
$ [sudo] npm install pug-cli -g
```


## Building notes

#### General notes

- Break **script** closing tags on all JS files. From `"</script>"` to `"</scr"+"ipt>"`. It breaks page loading when the JS code is embedded in the HTML. It seems not to be a problem when the scripts are linked files.
- Use of official CDNs for the [jQuery](https://code.jquery.com/) and [Bootstrap(https://www.bootstrapcdn.com/)] script files.
- The *index-data.pug* file is not to be built. It contains data to be used when building the *index.pug* file.
- The 0build.sh file can be executed to build all PUG files. The output is one level up and will overwrite all HTML files.

#### Include files notes

- The *_navbar.pug* file has relative links.
- The *_navbar_for_standalone_doc.pug* file has absolute links.
- The *_olddatabase.html* file is used instead of a pure PUG file because, due to its large size, the PUG file takes an eternity to build.


#### Highlight.js notes

- Download [highlight.js](https://highlightjs.org/download/) with support for these languages only (CSS, HTML, XML, JSON and JavaScript).
- The xcode.css file is the theme used for syntax highlighting.


#### Bootstrap notes

- Bootstrap theme from [Bootswatch](http://bootswatch.com/flatly/).
- The *bootstrap.min.css* file has the **Lato** font family removed and all instances of **Lato** have been changed to **Open Sans**.
- The file *bootstrap-for-standalone.min.css* (for stand alone pages) has the same changes as the *bootstrap.min.css* file, plus the **Glyphicons Halflings** font family has been removed.
- If an icon from **Glyphicons Halflings** is ever needed on stand alone pages, just use something like the following:
```css
.glyphicon-chevron-up:before {
    content: url('Link to image') !important;
}
```