	Gidi's Starter Architecture using SASS.

1. Check that Node and SASS are installed globally.

2. Run "sass --watch assets/sass/main.sass:assets/css/style.css" or whatever directory the files are located if there are any changes

3. Use Ctrl + C to stop watching for changes

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
	