# hawbridge_coders

This is the base website for the Hawbridge Coding Club.  It will be the foundation for learning to develop a simple web application to be run on [heroku](https://www.heroku.com/home).

Table Of Contents
=================

#### Dynamic Web Applications
* [Introduction](#introduction)
* [Static Files](#static-files)
* [Dynamic Pages](#dynamic-pages)
* [XHTML and the Document Object Model](#xhtml-and-the-document-object-model)
* [Style](#style)
* [Javascript](#javascript)

#### Getting Started
* [Creating a Github Account](#creating-a-github-account)
* [Fork this Repository](#fork-this-repository)
* [Creating a Heroku Account and Free Application](#creating-a-heroku-account-and-free-application)
* [Linking Heroku and Github](#linking-heroku-and-github)

#### Working with Github
* [Using the Github Web Interface](#using-the-github-web-interface)
* [Managing your Github Repository with Branches](#managing-your-github-repository-with-branches)
* [Weekly Pull Requests](#weekly-pull-requests)
* [How Not to Break the Build](#how-not-to-break-the-build)

Introduction
============
This repository holds all of the 'code' for a simple, but functional web application. A web application is a system designed to be served from a web server, and present a mixture of [static](#static-files) and [dynamic](#dynamic-pages) content in one or more 'pages' that present all of the ways that users can interact with the system.  Google, Amazon, even the heroku dashboard are all examples of web applications. 

Because they serve dynamic content, web applications must be created using one of the variety of programming languages available (Java, Ruby, Python, Javascript, and others). These programming languages are required to respond to a request for a page on the application, and present content to the user based on the nature of the request. They typically provide special libraries or modules that make it easier for developers to write dynamic applications. This web application is written in [Sinatra](http://www.sinatrarb.com/), a framework module provided for the Ruby programming language.

All web servers work the same way, whether they are static file servers, or dynamic web applications.  A request is made by a client (usually, though not always, a browser) for a page (e.g. http://dmlond-hawbridge-coders.herokuapp.com, http://dmlond-hawbridge-coders.herokuapp.com/hello_world, or http://dmlond-hawbridge-coders.herokuapp.com/js/hawbridge_coders.js). The many internet service providers that make up the internet infrastructure interpret this as a request for a path ('/', '/hello_world', or '/js/hawbridge_coders.js') at a domain ('http://dmlond-hawbridge-coders.herokuapp.com'), and route the request to the webserver hosted on the domain.  The webserver then takes the path, and attempts to serve it. If it is programmed or configured to serve something at that path, it returns the content with a status 200 (which means 'OK' to the browser). If it is not programmed or configured to serve the content, it may return content (usually a page that says something along the lines of 'not found'), but it always returns a status 404 (which the browser interprets as 'Not Found' and can present you with information regardless of whether the server returns anything). The path '/' is special. It is called the 'root' of the server or application. It is typically, though not always, interpreted by web servers as a request for an 'index' of things (either files, directories, or other pages) served by the webserver. Paths to the domain can include the root path (e.g. http://dmlond-hawbridge-coders.herokuapp.com/) or leave it off (http://dmlond-hawbridge-coders.herokuapp.com). The webserver is almost always configured to interpret the two requests as the same request. Note that a webserver can serve content (files or applications) at paths beyond the root. So, a request for 'https://github.com/dmlond/hawbridge_coders' gets routed as a request for the path '/dmlond/hawbridge_coders' at the domain 'https://github.com'. The github application interprets this as a request for the 'index' of things served at the path '/dmlond/hawbridge_coders/' in the same way as it interprets a request for https://github.com as a request for the 'index' of things served at the root path '/'. In some cases, such as for static files, webservers may prevent requests for indexes (e.g. a request for http://dmlond-hawbridge-coders.herokuapp.com/js returns a 404 not found response because the web server is configured not to serve indexes of the 'js' directory).

Static Files
============
In its infancy, the internet as we know it was made up of many web servers that served files to users.  These files would never change over time (unless the humans managing the web site uploaded new versions of the files for it to serve), or change from one request to another, and had no idea of a concept of a 'user'. Everyone got the same content, and it was all anonymyous. These files are termed 'static' because they always remain the same.

Modern web applications still rely on the ability to serve static files. Image files are typically served as static files (it is computationally expensive to dynamically generate an image). [Stylesheet](#style) and [Javascript](#javascript) 'code' is also often served as static files (although these can be, and often are generated dynamically).

Sinatra makes static files available in the 'public' directory within the root of the directory containing the application code (this term 'root' keeps popping up, and has the same meaning when navigating a file system or a webserver). The web application takes a request for a path, such as /js/hawbridge_coders.js, and, if everything after the initial '/' (the root) is found as a static file in the 'public' directory (e.g. public/js/hawbridge_coders.js), it will serve that content to anyone requesting it, without requiring any authentication (this is one reason why some applications serve javascript and even images dynamically, in order to enforce authentication through the dynamic system before serving these 'assets').

This application makes two static files available, a javascript file and a stylesheet file.  By convention, these are seperated into seperate directories, js and css, within the public directory, which are reflected in different paths in the url used to request each asset.

Dynamic Pages
=============
Dynamic pages are what make modern web applications flexible and interesting. They are created with each request, 'dynamically', by some programming language. The language may be a 'server-side' language such as ruby, java, or python, a 'client-side' language, or, most often, mixtures of both.

Server side languages run on the host web server, and respond to requests to the user with dynamic content. Users must click on a link, or push a button to get new content.

Client side languages rely on the browser (Google Chrome, Firefox, Safari, Internet Explorer) running on the user's computer to allow them to run inside them when the user uses the browser to request a page from a server. Client side languages are much more responsive to user actions, because they run on the users computer ('in the browser'), immediately in response to user actions. If a user request requires information to be provided by the web server hosting the application, the call for this content can be run in the background while the user continues to interact with the site. Currently, [Javascript](#javascript) and [Stylesheets](#style) are the main client-side languages supported by all modern web browsers.

Sinatra makes dynamic content available from the 'views' directory in the root of the directory containing the application code. In sinatra, dynamic code must be 'rendered' by the code programmed to handle the path request. The entire web application is served by a one or more ruby files. This application uses a single ruby script [hello.rb](/blob/master/hello.rb). Inside this script, you will see the code to handle a 'get' request to the root of the application. It does so by rendering the :index as an [erb template](http://www.stuartellis.eu/articles/erb/). Sinatra interprets this as a request to use the views/index.erb file as a template, and use the ruby erb template processing system to dynamically fill out any variables that are in the template with real values, and then serve the content to the user. Currently, the root index is not very dynamic. It could just as easily be served as a static file index.html in the public directory without needing to write the code to handle the request in hello.rb. But, this will change.  Note that the hello.rb ruby script supports 'get' requests to two other paths '/hello' and '/goodbye' with dynamic content. The code for these paths return content right from the ruby program, and do not rely on templates. This could change if we need it to, thats what makes dynamic web applications so flexible. To change the way a path is handled, you change the code responding to that path to handle it any way you need it to be handled.

XHTML and the Document Object Model
=====================
About 1-5% of all web content is in the form of files like images, music files, pdf files, word documents, etc.  The rest of the 95-99% of content on the web is served in a format called [XHTML](https://en.wikipedia.org/wiki/XHTML), or Extensible Hyper Text Markup Language. XHTML is an XML form of HTML. XML is a system designed to allow programs to represent objects in a text format that makes it easy for other programs to read them in and process their information.  An object is a defined thing with optional attributes, and may contain other objects in it. They are defined with an opening 'tag' and a matching closing 'tag'. There are potentially many different XML systems out there, but the one that is used on the web is a special system of XML which only supports certain objects defined for use in web browsers using the XHTML standard.  These are things you may have seen if you look at the 'source' for any website that you visit (e.g. visit http://dmlond-hawbridge-coders.herokuapp.com in your chrome browser, then hit the 'View' menu at the top of the browser, hit 'Developer', then hit 'View Source', in firefox you have to right click your mouse (ctrl-click on a mac laptop), then hit view source).  This shows you the raw XHTML. You should see a bunch of stuff between a single <html> tag and its corresponding closing </html> tag (note the '/' in front of the name of the closing tag). Inside the ```<html></html>``` are a single ```<head></head>``` and ```<body></body>```. This web page is actually written with spacing to help you see the hierarchical relationships of the different objects, but this is not always the case (compare google.com, or even github.com). 

The 'head' object defines information 'about' the page (the meta information). It can influence the way the browser presents you with information only in the title of the page (in the tab), and sometimes a 'favicon' (note the little github octocat in the tab next to the title of this github page). It can, and often does specify the location of javascript and stylesheet 'assets' that must be loaded by the browser before it loads and presents the 'body'. These objects use object attributes to specify the urls to these assets (they can be hosted by the same web application, or hosted on other web applications). One notable object in the 'head' object is:
```
<link rel="stylesheet" href="/css/hawbridge_coders.css"/>
```
This is a 'link' object. Often, when an object will not contain other objects inside of them, such as this link, the opening and closing 'tag' are specified in a single tag ending with '/>'. This 'link' object has 2 attributes: 'rel', and 'href'. You should be able to see what each of these attributes is set to in the particular object. You will see lots of different attributes used in xhtml objects.

The 'body' object presents the main visible part of the page, and instructs the browser on how to render it. It can include many different types of objects in it, and these objects will often contain other objects within them, hierarchically. For example, in the index for this web application, you see a 'div' object with an attribute 'id' set to 'welcome', which contains an 'h1' large header object, and a 'p' paragraph object.  The 'h1' header object contains the text 'Hawbridge Coders', and the 'p' object contains the text 'Welcome'.

The objects in the body will often have an 'id' and/or a 'class'. These are attributes that are used by [Javascript](#javascript) and [Style](#style) to identify objects on which to act. The 'id' for every single object in an HTML document must be unique from the 'id' of the other objects in the page. This allows style and javascript to easily access a single element to act upon. Objects can have multiple values for 'class', seperated by spaces, and multiple objects can have the same value of class. This allows javascript and style to act on multiple objects in your document at the same time, such as to apply a common font color scheme to all objects with a specific class.

There are many other special attributes that you may find interesting and useful, such as 'onclick' for ```<button>``` objects (see javascript below). See if you can figure out how the ```<href>``` object and attributes function using a google search for [html href](http://lmgtfy.com/?q=html+href).

The XHTML page returned by a web application (e.g. the ```<html>``` object and all of its internal objects) is called a 'Document', and Javascript and Style are said to manipulate the 'Document Object Model' or DOM. You will see lots of tutorials about javascript and style talk about the DOM. 

Style
=====
Web applications often make use of [style](#style) to make them visually appealing, present visual cues to the user to reinforce verbal responses, and even make pages more accessible to users with visual impairments. Style is a client-side language that instructs modern browsers to present the information in the body of the DOM in a specific way. When you see boxes around information, or complex organization of things on the page, this is accomplished with style. Style can be written in many ways. You can specify style for a specific object in the DOM using attributes, called 'inline style':
```
<h1 style="color:blue;margin-left:30px;">This is a heading.</h1>
```
You can also specify style as an object in the head, called 'internal style':
```
<head>
<style>
body {
    background-color: linen;
}

h1 {
    color: maroon;
    margin-left: 40px;
} 
</style>
</head>
```
This would impact the entire document.

Most modern applications, including this one, create one or more files, called stylesheets that they serve statically or dynamically by their application, and instruct the browser to load and process them by creating a special 'link' object with rel and href attributes inside the DOM head.
```
<link rel="stylesheet" href="/css/hawbridge_coders.css"/>
```

This application uses a static css file [hawbridge_coders.css](/public/css/hawbridge_coders.css), but other applications use dynamic style generators, such as [sass](http://sass-lang.com/).

Both internal style, and external style files use the same syntax, called css. It consists of a set of instructions to act on objects in the DOM to apply a set of style attributes, which the browser then uses to display the information with different orientation, outlines, font colors, etc. Objects in a stylesheet can be referenced by:
* object type, e.g. 'p' which instructs the browser to apply the same style to ALL 'p' objects on the page
* id, e.g. '#welcome' which instructs the browser to apply a style to a single object, with the id 'welcome'
* class, e.g. '.hideable' which instructs the browser to apply a style to all objects with class 'hideable'
* combinations of type and either class or id (usually class, since id is supposed to be globally unique across the board, while class is not). For example, 'div.hideable' would instruct the browser to apply a style to all divs with class 'hideable'. Note that you may see style applied to '.hideable' and 'div.hideable' in the same stylesheet, which would specify a style to apply to all objects with class 'hideable' and then specify a further style to add to this style specifically for any 'div' object with class 'hideable'.
* multiple targets on the same line, seperated by spaces, e.g. 'h1 h2 h3' would specify style to apply to any h1, h2, or h3 object.
 
See if you can figure out what style hawbridge_coders.css specifies for our index.

Javascript
==========
Javascript is experiencing heavy changes. There are many different frameworks out there to make it easy to add cool features, interactivity, and even accessibility (e.g. for color-blind, or even blind users). This application uses plain javascript in [hawbridge_coders.js](/public/js/hawbridge_coders.js). There are other systems, such as [react](https://facebook.github.io/react/) and [coffeescript](http://coffeescript.org/), that use static or dynamically generated files in a different syntax than javascript, but which ultimately are turned into javascript that is returned to the browser. Another very popular javascript enhancement is [jquery](https://jquery.com/). It enhances javascript to use a syntax which is easier to write and understand by developers.

This application javascript defines 2 functions, and then instructs the browser to process one of the functions, toggle_hideable, as soon as the window finishes loading (e.g. it has rendered the body).

The toggle_hideable function is designed to find all objects in the DOM of class 'hideable' and hide them if they are currently visible, but reveal them if they are currently hidden. The function also changes the text on the button with id 'toggle_hideable_button' in coordination with the state of the hideable object, e.g. if it is hidden, the button is set to say 'Reveal Hidden Message', and if it is revealed, set the button to say 'Hide Message'. By running this function once when the page initially loads, the 'hideable' objects start in the hidden state. By setting toggle_hideable as the value of the 'onclick' attribute for the button with id 'toggle_hideable_button', the button is given an action by the browser of calling that function. Click it a few times to see what happens.

The toggle_item_color function takes an argument 'item' and looks for the object in the DOM with the provided item as id. It will then change the color of that object to 'red' if it is currently 'blue', and vice versa. It also toggles the text on the button for that item to reflect what the button does given the state of the item. Notice how the button for each item (item1 and item2) uses the id of the item in the id of the button to link the item state with the state of the button used to toggle that items state. Also note how the 'onclick' attribute for each button passes the id of its target item (item1 or item2) as the argument to toggle_item_color. Click each one to see how they work.

Creating a Github Account
=========================
  Using your browser, navigate to [Github](https://github.com)
Create an account. You should use a typical username for yourself (maybe reuse your gmail or facebook username), and a very strong password (10 characters, letters, numbers, spaces, dashes, special characters). You will need to supply an email address, and you will need to be able to login to this email to confirm the account.

  You might use this account for a very long time, so make it something that represents you as a person. If you want, you can add a a profile picture/avatar as well. If you already have an account that you can login with, skip this step.

Fork this Repository
====================

  Using your browser, make sure you are logged into Github and viewing [dmlond/hawbridge_coders](https://github.com/dmlond/hawbridge_coders). Click the 'Fork' button. This makes a copy of hawbridge_coders repository, with any branches that I have created, owned and managed by your account. I can never revoke your fork, nor make any changes to your copy of the code, except through the mechanism of a pull-request which you can deny.  Note, this repository is Licensed with the [GPL Version 2 Open Source License](https://opensource.org/licenses/gpl-2.0.php).  All forks of this repository must also be licensed with the GPL Version 2 license, and refer back to the original dmlond/hawbidge_coders.

Creating a Heroku Account and Free Application
==============================================

  Using your browser, navigate to [heroku](https://id.heroku.com/login). Click Sign Up.  You can choose any username that you want, but you should probably reuse your github username to make things easy (but use a different password unless your github password is very strong).  You will need to supply an email address, and you will need to be able to login to this email to confirm the account. You will also be required to register a text messaging capable phone, and it will send you a confirmation text message.

  Once you login, you will be presented with the Heroku 'Dashboard'. To create your first 'Application' click on the 'Personal Applications' link on the left, then click the '+' button on the top right. Chose 'Create new app'. Name it with your username appended to '-hawbridge-coders' (e.g. mine is called dmlond-hawbridge-coders).

  You can create and destroy applications all you want, and you can create multiple applications, so dont worry if you dont like this name. It is just to make it easier to standardize the way we all navigate to your sight when it is live.

Linking Heroku and Github
=========================

  There are tons of documentation pages on heroku.  [Github Heroku Integration](https://devcenter.heroku.com/articles/github-integration) is one that will teach you how to link your github account with your heroku account.  This makes it so that you can automatically launch the code from your github repository to make it live on a heroku URL address.  You should link your hawbridge-coders application with the 'master' branch of your github repository to start with, but you can always change this to a different branch, or turn off automatic deploy and use the 'deploy' dashboard to manually deploy any of your other branches at any time.

  Once you link the account and set up the auto deploy to deploy the master branch of your hawbridge_coders Github repository, heroku will attempt to build the code into a running application.  You can monitor the 'build' process using the heroku dashboard for the application.  Click the 'Activities' tab.  It will show all activities, including builds.  You should see an activity with 'Build Succeeded', and a subsequent activity 'Deployed'.  If you see this, you can navigate to the 'Settings' tab of the heroku dashboard for your hawbridge-coders application, and scroll down to the 'Domains' setting. Copy the 'Heroku Domain' and paste it into another browser tab and hit enter. It should look something like the original [dmlond-hawbridge-coders](http://dmlond-hawbridge-coders.herokuapp.com). See notes about this [Application](/TheApplication.md) for details of what the application provides.  This may change from week to week as new versions of the hawbridge-coders application are created.

Using the Github Web Interface
==============================

  Github is not just a code repository. It also allows editing of items stored in your repository, and easy management of branches. You can write an entire website using the Github web interface alone. When you click on a file in the repo browser, it will display a summary header with information about the file (number of lines, and size in bytes) and a list of actions available to you to perform on the file (if you are not logged in to github, you may not see all of these actions). It will then display the file, either with syntax highlighting if it is one of many supported programming languages, or in [Github Markdown](https://help.github.com/articles/markdown-basics/).  

* `Raw`: Allows you to view the file in its plain text form (without syntax highlighting or markdown formatting). This also provides you with a link that you can use to download a copy of just one file without cloning the entire repository.
* `Blame`: Shows you information about Github users that have changed your file. Unless you use the settings to invite other Github users to edit your repository, you will most likely only see your account and dmlond in the list of 'committers'.
* `History`: Shows you a list of all commits made to change that file.  You can click each 'commit' to see how the file changed using a ['Diff' syntax](https://github.com/blog/1932-syntax-highlighted-diffs).
* Tv Screen: If you have installed Github Desktop (see below) and cloned this repository, this will launch Github Desktop and open this file for viewing on your local machine.
* Pencil: This will allow you to make changes to the content of the file using your browser, just as if it is a text editor that is installed on your machine.
* Trashcan: This allows you to remove the file from your repo with a commit. The file is not permenantly gone. If you (or anywone else) looks at the history of the repository, you can find the file in any commit previous to the 'commit' where you deleted the file. This is a powerful feature of git. If you really want a file back, you can use Github to revive the file and commit it back to the repository. Note, **IF YOU EVER STORE SENSITIVE INFORMATION** in a file, deleting the file with this feature will not prevent other users from finding that information.  You should **NEVER** store sensitive information in your github repository.

  If you are using your own computer, you may want to investigate installing the [Github Desktop](https://desktop.github.com/) application, and a text editor designed for programmers, such as [atom](https://atom.io) or [sublime](http://www.sublimetext.com/). We will attempt to use the Github browser interface in this class.

Managing your Github Repository with Branches
=============================================

Git organizes your code repository into distinct 'branches'. A git repository always starts with a single 'branch' called 'master'. You can create as many branches as you want. In these branches, you can make small changes to your code, and submit the changes just to that branch, and test them out. If they work, you can come back to the master branch and 'merge' just these changes.  Or you can create a totally new branch called 'develop' where you write your code, and work with this branch (branch from and merging to this branch) until you are satisfied with it overall, and merge the 'develop' branch to 'master'. These are just 2 of the ways that programmers manage their code using git and GitHub.

The `master` branch, and all `version-` branches (e.g. version-1.0) of dmlond/hawbridge_coders are [designed to build and deploy successfully on heroku](#weekly-pull-requests). For this reason, it important to keep your master branch and `version-` branches in sync with their counterparts in dmlond/hawbridge_coders. Since branching in github is really easy, and you can create as many branches as you want, you should use branches to try new things out. You can change your heroku app to auto deploy a different branch at any time. With autodeploy set up on a branch, each time you commit changes to the branch, an attempt is made to build and deploy the application to heroku automatically.  If the build is successful, the new changes will be made 'live'.  If the [build breaks](#how-not-to-break-the-build) you will need to figure out what changes you made that broke it (GitHub history can be very helpful here). Here is a typical workflow that you can use to try things out on your own:

* Create a branch (some developers name branches for trying things out starting with 'try_', followed by something that they are tryig, e.g. 'try_change_variable'). At the top of your Github page, find the 'Branch' button (it lists the branch that you are currently viewing, most likely 'master'), and click it. In the field that says 'find or create a new branch' type something. If there is already a branch named with what you are typing, it will suggest it to you, and you can click that branch to view the state of the repository at that branch. If what you are typing does not exist, it will suggest that you 'Create branch: ... from master'. You can create branches from any branch, so if you want to start from `version-1.0` and work out from there, choose `version-1.0` first, then click the 'Branch' button again and type something new and choose 'Create branch: ... from version-1.0'. Create a new branch 'try_change_index' from master.
* Edit [views/index.erb](/views/index.erb). Change 'Hawbridge Coders' to something else. Scroll to the bottom and type something in the 'Commit changes' form. Click 'Commit changes'.
* Open the heroku dashboard, choose your hawbridge-coders app, and navigate to 'deploy'. Scroll down to the bottom, where it says 'Deploy a GitHub branch', and click the list box. You should see your new branch in the list. Click that to deploy that branch and make it live, provided you didn't [break the build](#how-not-to-break-the-build).

Weekly Pull Requests
====================
Each week, I will submit pull requests to your repository with changes from dmlond/hawbridge_coders that I have made to add new features, branches, or edit the instructions and documentation. You should login to your Github hawbridge_coders account, and click on the `Pull requests` link on the right hand menu. Here you will see any open pull requests that I (or others, possibly) have created to suggest changes that you should make to your fork of the code (you can also see closed pull requests by clicking on 'closed' at the top). Click on the pull request, and it will give you information about the pull request, including how it would change your repository. It will give you the option of merging the changes that I have made into your repository.  You can then Confirm these merged changes. This will change your branch. You can also ignore pull requests by closing them without merging them, if you are not interested in the changes that they would provide to your code.

If I make a pull request to you, I will also create a new `version-` branch in my own repository. You should shift-click the link to 'dmlond/hawbridge_coders' that is under your repository name at the top of the page to open dmlond/hawbridge_coders in another browser tab, and then click 'Branches' to see the branches that I have created. You can synchronize these to your repository, and keep them in sync, by doing the following in the tab with your fork of the repository:

* Click 'Branches'
* type the `version-` exactly as it appears in dmlond/hawbridge_coders
* click 'Create branch: version- from 'master'

If I see that you have synced my version branches, I will create pull requests to suggest changes to your version branch from my version branch to help keep them in sync.

The dmlond/master and all dmlond `version-` branches are designed to build and deploy successfully. If you have not changed your fork master, or version- branches, these should continue to build successfully for you as well.

How Not to Break the Build
==========================
 The safest file for you to change is [views/index.erb](/views/index.erb). This is a special HTML file that can allow ruby code to be inserted into it using a 'templating' syntax called [ERB](http://www.stuartellis.eu/articles/erb/). There really isnt anything you can do to this file that will prevent heroku from successfully building and deploying your application, and only a few things that you can do with bad ruby syntax in the template to cause the application not to load when you view it in your browser.
  The next file that you can change is [hello.rb](/hello.rb). This is a ruby script. It is easier to write bad ruby code which can cause the site not to load when you visit it in your browser. You should work through the Sinatra tutorials mentioned in the [Application Documentation](/TheApplication.md) before you edit this file.
  The final file that you can change is [config.ru](/config.ru). Again, you should read about sinatra and ruby before you edit this file.
  You should **NOT** change the Gemfile. If you have read about ruby and its [Bundler gem management system](http://bundler.io/), and if you can: 
  * clone the repository to your machine with ruby and bundler installed
  * run bundle on the application, which updates Gemfile.lock
  * commit and push these changes back to your repository

you can change the Gemfile. No one ever edits Gemfile.lock, it is generated by bundler when you run bundle on your application. Because the Gemfile and Gemfile lock files are designed to be 'in sync', you cannot successfully deploy an application to heroku unless you have done this process on your machine (which I will have done for each master and `version-` branch). If you dont want to break the build, do not edit these files.
