{
"version": 2,
"installCommand": "npm install",
"builds": [
{
"src": "./index.js",
"use": "@vercel/node"
}
],
"routes": [
{
"src": "^/(.*)$", // Q: what is this?
// A: this is a regular expression that matches all paths
// Q: is this why the root throws a 500?
// A: yes, because the root path is not matched by this regex
// Q: what regex should I use to match the root path as well as all other paths?
// A: ^\/(.*)$
"dest": "./index.js" // Q: what is this?
// A: this is the path to the file that will be used to handle the request
// Q: in this case that would be index.js right?
// A: yes
// Q: what should I change this to?
// A: "./index.js"
}
]
}
