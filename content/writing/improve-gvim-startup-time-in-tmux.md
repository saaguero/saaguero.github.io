---
title: "Improve gvim startup time in tmux"
date: 2015-08-22
draft: false
---

Here is a quick tip if you happen to be using gvim in tmux.

First of all, why would anyone want to use gvim in tmux? Well, personally it was the easiest way to have clipboard support, you know the feature that let you copy & paste in your system clipboard.

So, after you install gvim, for instance under Fedora:

```
yum install vim-X11
```

And define a convenient alias for running gvim inside the terminal:

```
alias vim=gvim -v
```

Then this will be OK until you run vim in tmux where you might experience an annoying huge startup time.

In order to fix it, just use the option -X in your vim alias:

```
alias vim=gvim -v -X
```

This will disable the connection to a X11 server, of course this will also turn off the system clipboard feature that we want to keep.

There is a workaround, though. Simply add the following line to your *.vimrc* file:

```
call serverlist()
```

And that’s it. Enjoy!
