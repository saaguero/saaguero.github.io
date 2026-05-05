---
title: "Improving Performance in Vim"
date: 2015-02-19
draft: false
---

This time I want to share with you some tips that might be handy to improve the performance in Vim. Note that for performance I mean to have a responsive & fast experience in Vim.

## Avoid (slow) plugins

If you can’t, use a package manager that supports lazy loading, like [vim-plug](https://github.com/junegunn/vim-plug). Want a real case? Here’s one that I struggled with recently:

I like [UltiSnips](https://github.com/sirver/ultisnips) plugin but I frequently don’t use it. But when I need it, I really need it. So, should I remove the plugin and just rely on some custom function? Perhaps. But hey! Let’s give a try to lazy loading!

![](/images/improving-performance-in-vim/0_yzBgnkE5CicibQiI.gif)

Using the tip from vim-plug wiki

There is a tip in vim-plug wiki about [how to lazy load UltiSnips](https://github.com/junegunn/vim-plug/wiki/faq#loading-plugins-manually). But I wanted a different way as I didn’t like the fact that when you go to insert mode for the first time it will freeze by a couple of milliseconds (yes, that bothers me, a lot!.)

![](/images/improving-performance-in-vim/0_1kVkI4pGu0bAgRyn.gif)

Using a custom function

So, I made a [custom function](https://github.com/saaguero/dotvim/blob/44c3bbc9b2996fcf7e86f624785a3a06ca978167/.vimrc#L60-L69) that loads UltiSnips only when triggering expansion key.

### Avoid having (thousands) plugins

If you can’t, use a package manager that supports parallel downloading, like [vim-plug](https://github.com/junegunn/vim-plug). If you’ve read the vim-plug documentation you might notice that you’ll need Vim with ruby support. You can inspect my [dotvim wiki](https://github.com/saaguero/dotvim/wiki/Vim-Bindings) in order to accomplish this.

## Avoid a (big) plugin for completion

Alert! This is a very personal one.

Vim’s built-in completion features, see *:h ins-completion*, are enough for my workflow. I did try some plugins like [YouCompleteMe](https://github.com/Valloric/YouCompleteMe), [Neocomplete](https://github.com/Shougo/neocomplete.vim), [SuperTab](https://github.com/ervandew/supertab), but none of those made me happy. I just needed two things:

- Tab mapping for triggering completions and,
- No popup if it isn’t strictly necessary (ie: I don’t want to be bother by a popup showing me that there is a single match.)

In reference to the first point the simplest way would be to have a custom function like [this one](https://github.com/garybernhardt/dotfiles/blob/master/.vimrc#L159-L173) but I was convinced to used the [VimCompletesMe](https://github.com/ajh17/VimCompletesMe). The reason? It has just a few lines of understandable code and it makes a really Smart Tab mapping.

For the second point just use the Vim setting *completeopt=menu*.

Still, sometimes when I *want to be precise with no ambiguities at all* about what I would like to complete, I used built in mappings (eg: C-X-L for line completion). Sorry for being repetitive but *:h ins-completion* is your friend!

## If you are using CtrlP…

…I recommend to improve the filtering speed using an external filter, like [ctrlp-py-matcher](https://github.com/FelikZ/ctrlp-py-matcher). It’s super cool when you have to Fuzzy Search not only thousands of thousands of files, but also stuff like a ctag file which might be really big for huge projects!

## Search faster than vimgrep

You can use plain old grep but I prefer a better solution out of the box. For that I recommend [Ag](https://github.com/ggreer/the_silver_searcher) as it has nice defaults that makes it faster than grep. If you’re in Windows, try [Pt](https://github.com/monochromegane/the_platinum_searcher) as it’s faster than Ag.

If you want to take advantage of Ag in Vim you can play with the *grepprg* and *grepformat* settings, for example [see here](https://github.com/saaguero/dotvim/blob/67f18869042773191d0135ed4b37fbe1fe11f37f/.vimrc#L294-L299).

## Neat stuff for Windows

Probably this is the *best thing* that I’ve found (by coincidence.)

There is a *tiny big* thing that was slowing down the whole Vim flow (specially the startup time). The thing was that I had my Power Plan set up to be Balanced instead of High Performance. Changing to the latter did the trick. Don’t believe me? Look:

![](/images/improving-performance-in-vim/1_F1j3B4CmzNgkTQ2XwghKew.gif)

Balanced vs. High Performance Power Plan

A final tip that might change your overall experience in Windows is that you can improve the System Performance by playing with the options in *%windir%\system32\SystemPropertiesPerformance.exe*. I disabled all of them except for “*Smooth edges of screen fonts”.* Give it a try, you won’t be disappointed.

That’s all my friends!
