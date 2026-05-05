---
title: "Setting up Vim in Windows"
date: 2015-02-13
draft: false
---

I want to share with you my current setup for Vim in Windows. Give it a try and take your own conclusions. If you just want to answer the questions: Vim in windows? Is that even worth it? I invite you to read [Vim in Windows](https://medium.com/@saaguero/vim-in-windows-1e0789127ed6).

Since that I know some people might prefer “video instructions” and others “text instructions” I will make you both happy (out of topic: I got inspired from the great video/text tutorials by [Drew Neil](http://vimcasts.org/).)

The title might suggest you that it will just cover Vim in Windows, but as you’ll see, it will also mention additional tools that I need on a daily basis.

That said, let’s start!

*(This post included a video walkthrough — see the notes below.)*

### Notes

Download and Install the full version of [cmder](http://bliker.github.io/cmder/)

I recommend that version as it comes with [msysgit](http://msysgit.github.io/) which includes neat unix tools such as git, grep, sort, awk, sed and find among others.

Download and install [Python](https://www.python.org/download).

Currently I’m using Python x64 2.7.8. This is necessary as some vim plugins requires python. **Note**: If you already have python x86, when you install python x64 choose a different destination folder. Furthermore, remember to mark the option to include python in the environment variable %PATH%.

Download and install the latest [Vim x64 binaries](http://solar-blogg.blogspot.ca/p/vim-build.html) (by solar-blogg)

Get your .vimrc (ie: mine is in [github](https://github.com/saaguero/dotvim)) and copy it to your home folder %HOMEPATH% or make a symbolic link with:

```
mklink %HOMEPATH%\.vimrc c:\path\to\your\.vimrc
```

Open cmder. Note that if you execute vim, it will launch the vim that comes with cmder. In order to use the solar-blogg distribution we have to tweak a cmder’s batch script which is executed whenever we launched cmder.

Edit the file */path/to/your/cmder/vendor/init.bat*, search for the PATH variable and add to the very beginning the path to the vim we installed. After performing the steps, it should look like:

```
@set PATH=C:\screencast\vim\vim74;%CMDER_ROOT%\bin;...
```

Open cmder again, execute vim and there you go! Note that if you’re using my [.vimrc](https://github.com/saaguero/dotvim), vim is going to install all the plugins.

If you want to see this setup in action, watch the video above.

### Random Tips

If you want to use mouse events in console vim (text selection, resizing splits and so on) go to cmder settings and activate the option to *send mouse events to console* which you can find inside *Keys & Macro -\> Controls*.

I recommend you to start using a windows package manager. The one that I recently start using is [Chocolatey](http://santiagoaguero.com/vim-in-windows-my-setup/chocolatey.org).

Give it a try to the tool [ag](http://chocolatey.org/packages/ag) (the silver searcher). Install it using *cinst ag* and there you go! Chocolatey publishes the binary in a common folder that tracks in the %PATH% variable, so you can just run *ag.*

Remember that in Vim you can use external tools to do the job, therefore I recommend to try out the [vim plugin Ag](https://github.com/rking/ag.vim) (which interacts with the ag tool that we installed.) I hope you can agree with me that **this is awesome!**

That’s all for today. Have fun!
