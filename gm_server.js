Meteor.GM = (function(meteorPackage,nodePackage){
  if (nodePackage===undefined){
    nodePackage=meteorPackage;
  }
  var require;
  if( (typeof Npm!=="object")&&(typeof Npm!=="function") ){
    require=__meteor_bootstrap__.require;
  }else if(typeof Npm.require == "function"){
    require=Npm.require;
  }else{
    require=__meteor_bootstrap__.require;
  }
  
  var pac;
  try{
    pac=require(nodePackage);
  }catch(e){
    var path = require('path');
    var child_process = require('child_process');
    var future = require ('fibers/future');
    var spawnSync = function(file, args, options) {
      var wrapped = future.wrap(function(cb) {
        var proc= child_process.spawn(file, args, options);
        proc.on('close', function(code, signal) {
          cb(code !== 0 ? "Command failed with exit code " + code : null);
        });
        proc.on('error', function(error) {
          cb(error);
        });
      });
      wrapped().wait();
    };
    
    try{
      var packagePath=path.join(process.env.PACKAGE_DIRS, meteorPackage);
      spawnSync("npm",["install",nodePackage],{cwd:packagePath,stdio:'inherit'});
      pac=require(nodePackage); 
    }catch(e2){
      console.log("Install node package "+nodePackage+" on heroku...");
      var fs=require('fs');
      var smartLock=JSON.parse(fs.readFileSync(path.join(process.env.PWD,'smart.lock')) );
      
      var binPath=path.join(process.env.PWD,'.meteorite/meteors/meteor/meteor',smartLock.meteor.commit,'dev_bundle/bin')
      var npmPath=path.join(binPath,'npm');
      var packagePath=path.join(binPath,'node_modules',nodePackage);
      
      spawnSync(npmPath,["install",nodePackage],{cwd:binPath,stdio:'inherit'});
      pac=require(packagePath);
    }
  }
  return pac;
})('gm', 'gm');

/*var installNodeJsPackageInDir=function(meteorPackage,nodeDir){
  var require=__meteor_bootstrap__.require;
  var path = require('path');
  var child_process = require('child_process');
  var future = require ('fibers/future');
  var spawnSync = function(file, args, options) {
    var wrapped = future.wrap(function(cb) {
      var proc = child_process.spawn(file, args, options);
      proc.on('close', function(code, signal) {
        cb(code !== 0 ? "Command failed with exit code " + code : null);
      });
      proc.on('error', function(error) {
        cb(error);
      });
    });
    wrapped().wait();
  };
  packagePath=path.join(process.env.PACKAGE_DIRS, meteorPackage,nodeDir);
  var pac;
  try{
    pac=require(packagePath);
  }catch(e){
    spawnSync("npm",["install"],{cwd:packagePath,stdio:'inherit'});
    pac=require(packagePath); 
  }
  return pac;
}*/