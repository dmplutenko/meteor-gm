Package.describe({
  summary: "Meteor smart package for GraphicsMagick node.js"
});

Package.on_use(function (api) {
  api.add_files('gm_server.js', 'server');
});

