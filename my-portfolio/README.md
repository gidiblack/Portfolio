	Gidi's Starter Architecture using Gulp and Sass.

1. Check that Node and Gulp are installed globally.

2. Run "npm install" inside project dircectory to install dependencies from the package.json file.

3. Run "gulp" inside project directory to preprocess using the prepared gulpfile.js and watch for changes.

3. go to "gitignore.io" and add parameters like your OS, node, sass, etc to create new gitignore file. Copy generated code and save it as ".gitinore" in the main project directory. 



// Sass Partials 

1. Helpers
	This is for style code that helps you throughout the project, code that just runs independently - contains partials like _normalize, _mixins, _variables..

2. Basics
	This could also be called the foundation because it contains basic styles that are used throughout web projects - contains partials like _links, _buttons...

3. Layout
	For layout and larger pieces like headers, footers and navs...

4. Pages
	For page-specific styles like homepage, about page...
	