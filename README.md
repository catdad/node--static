node--static
============

This is a simple static file server for any local folder. Yes, there are a lot of them. Yes, I wrote another one. No, there are no advantages of this one over any other one. Use it if you want, I don't care.

  node app.js /path/to/folder
  
or, of course

  node app.js c:\path\to\folder
  
It will server any static file in the root folder, or any child folders, just like you would expect from a web server. Everything will come back gzipped.
