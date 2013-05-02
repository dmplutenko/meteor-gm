GM =(function(){
  
  var installNodeJsPackage=function(meteorPackage,nodePackage){
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
    packagePath=path.join(process.env.PACKAGE_DIRS, meteorPackage);
    var pac;
    try{
      pac=require(nodePackage);
    }catch(e){
      spawnSync("npm",["install",nodePackage],{cwd:packagePath,stdio:'inherit'});
      pac=require(nodePackage); 
    }
    return pac;
  }

  var installNodeJsPackageInDir=function(meteorPackage,nodeDir){
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
  }
  
  return installNodeJsPackage('gm', 'gm');
}) 
//AWS =installNodeJsPackageInDir('aws-sdk-js', 'aws-sdk-js');
