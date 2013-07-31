Package.describe({
  summary: "Meteor smart package for GraphicsMagick node.js"
});

if((typeof Npm==="object")||(typeof Npm==="function")){
  if (typeof Npm.depends == "function"){
    Npm.depends({gm: "1.11.0"});
  }
}

Package.on_use(function (api) {
  api.add_files('gm_server.js', 'server');
});

