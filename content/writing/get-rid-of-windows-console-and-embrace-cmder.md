---
title: "Get Rid of Windows Console and Embrace Cmder"
date: 2015-02-11
draft: false
---

![](/images/get-rid-of-windows-console-and-embrace-cmder/1_97PX1Y4ScADoGAiCv72lEQ.png)

Have you ever dream having a console with the power and feeling like the one in Ubuntu?

cmder is the answer. Period.

Worth to mention that cmder is what it’s thanks to the great open-source projects [conemu](https://code.google.com/p/conemu-maximus5/), [clink](http://mridgers.github.io/clink/), [msysgit](http://msysgit.github.io/).

I won’t duplicate what is already said in [cmder home page](http://bliker.github.io/cmder/). Take a look. Really. [Go!](http://bliker.github.io/cmder/)

However, I want to give you two tips:

## Changing Font Size using Ctrl + Mouse Wheel

**NOTE**: already merged in upstream.

I submitted a [pull request](https://github.com/bliker/cmder/pull/125). You can grab the patch from there. The change is straightforward using ConEmu Macros:

Edit your *\cmder\config\ConEmu.xml* settings file:

```
<value name=”KeyMacro03" type=”dword” data=”000011d0"/> 
<value name=”KeyMacro03.Text” type=”string” data=”FontSetSize(1,2)”/> 
<value name=”KeyMacro04" type=”dword” data=”000011d1"/> 
<value name=”KeyMacro04.Text” type=”string” data=”FontSetSize(1,-2)”/> 
There you go. Now you can use the hotkey Ctrl + Mouse Wheel to change the font size.
```

## Increase the response-time when navigating through folders

I noticed that the git facilities that comes with cmder are pretty nice, but it introduces an undesirable tiny-lag when navigating through folders.

The thing is that cmder comes with a [clink lua plugin](https://github.com/mridgers/clink/blob/master/docs/clink.md) in order to detect if you are in a git repository and hence applying nice prompt styling (for example showing in which branch you are working on.)

If you prefer increasing the response time the simplest solution is to delete that lua plugin. Find it in *\cmder\git.lua* and proceed to delete it.

That’s all!
