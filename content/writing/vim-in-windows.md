---
title: "Vim in Windows"
date: 2015-02-12
draft: false
---

This is my (ongoing) story about Vim in Windows. Yeah! Vim in Windows!

This is going to be question & answer, highlighting those things that I consider important to take into account.

Let’s start!

## Where should I obtain Vim for Windows?

Of course, the easiest answer is just grabbing the binary from [official vim site](http://www.vim.org/download.php). This should be fine if you don’t want to have the latest version with all the patches included. In addition, consider that console vim doesn’t include *python/ruby/lua bindings (*thanks @sudo-bang-bang for your [comment!](http://www.reddit.com/r/vim/comments/2dk460/vim_in_windows_part_1_feedback_welcome/cjq8o4r))

Since I want to use the latest version without compiling it, I’m required to search for another Vim binary. To date, I recommend one of the following alternatives:

- <http://solar-blogg.blogspot.ca/p/vim-build.html>
- <https://bitbucket.org/Haroogan/vim-for-windows/src>

The main difference is that the former is built using Visual Studio whereas the latter is built using MinGW-w64.

Remember that you can always compile Vim from scratch. You can follow the instructions from [here](http://vim.wikia.com/wiki/Building_Vim) or [there](http://solar-blogg.blogspot.ca/p/vim-build.html).

In the end I just stuck with [solar-blogg](http://solar-blogg.blogspot.ca/p/vim-build.html) x64 build as in my case it works better (discussion about *performance* can be found in this [reddit post](http://www.reddit.com/r/vim/comments/2cpw5d/how_to_improve_vim_startup_time_in_windows/).)

## Graphical Vim vs Console Vim

You might be wondering if Console Vim in Windows is possible and has benefits.

For Graphical Vim I’m referring to gvim, nothing new here, just open it and you can use it as you’re accustomed to.

For Console Vim I’m referring to vim. Try opening it in a windows console, you should see something like this:

![](/images/vim-in-windows/0_F17bF3wnlltwcAz-.gif)

So, yeah… it works but it doesn’t look quite good! Moreover, if you want to have a fullscreen console window you will have to use weird hacks like [this](http://superuser.com/questions/285984/how-do-i-full-screen-my-cmd).

We can do better than that. There is a simply and powerful solution and that would be to [Get rid of windows console and embrace cmder](https://medium.com/@saaguero/get-rid-of-windows-console-and-embrace-cmder-63aa49818781).

Once you install cmder, just open up vim. Try your favorite colorscheme like [badwolf](https://github.com/sjl/badwolf/) and… voilà!

![](/images/vim-in-windows/0_rScV5qEvX8py0vYY.gif)

Isn’t it *awesome*?

If for any reason this does not work for you, it might be because some settings are missing in your .vimrc ([reference](http://stackoverflow.com/questions/14315519/conemu-vim-syntax-highlight))

```
set term=xterm
set t_Co=256
let &t_AB="\e[48;5;%dm"
let &t_AF="\e[38;5;%dm"
```

We’ve seen different Vim distributions available for Windows; we did a comparison between using Graphical vs Console Vim. This is all you need to start using Vim in Windows.

In future posts I’ll surely delve into things like *How to efficiently use Vim plugins in Windows*, *Some tweaks and workarounds in Console Vim*, *Take advantage of Python support* and so on.
