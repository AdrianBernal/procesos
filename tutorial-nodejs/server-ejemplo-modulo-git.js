var github=require("./github-mod.js");

github.getRepos("jgallud",function(repos){
	console.log("jgallud repos="+repos.length);
	console.log("Repos=",repos);
});
/*
github.getRepos("tesorieror",function(repos){
	console.log("tesorieror repos="+repos.length);
	console.log("Repos=",repos);
});
*/
