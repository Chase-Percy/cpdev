---
title: "Creating a Website"
author: "Chase Percy"
type: ""
date: 2022-02-16T11:10:16+08:00
subtitle: "Hugo & Netlify Powered"
image: ""
bigimg: [{src: "/img/trees.jpg"}]
tags: []
---

At the start of the summer break I sat there wondering what a good summer project could be. A game engine would be fun, but
I had just spent the last few months developing one and needed a break. Several other ideas for apps useful to me came to mind,
but then it occurred to me that having a website to demo all my current and future projects would be highly beneficial.
<!--more-->

Having no idea at all about what to use to generate my website or even host it, I reached out to a friend who mentioned __[HUGO](https://gohugo.io/)__ and
suggested finding somewhere that will host a static website. From there my Google journey began, and I settled with HUGO and hosting through
Microsoft's __[Azure](https://azure.microsoft.com/en-au/?&ef_id=EAIaIQobChMI967dk6WD9gIVhTUrCh3XHApJEAAYASAAEgItmPD_BwE:G:s&OCID=AID2200144_SEM_EAIaIQobChMI967dk6WD9gIVhTUrCh3XHApJEAAYASAAEgItmPD_BwE:G:s&gclid=EAIaIQobChMI967dk6WD9gIVhTUrCh3XHApJEAAYASAAEgItmPD_BwE)__
as I had free hosting thanks to the __[GitHub student developer pack](https://education.github.com/pack)__.

Grabbing a free __[.tech](https://get.tech/)__ domain from the GitHub student pack I began the process of hosting my first page through Azure.
The process was a bit messy and the UI unintuitive, finding the static web hosting page tucked away under a mountain of sub menus.
Realising I needed an SSL certificate I switched to __[Cloudflare](https://www.cloudflare.com/en-gb/)__ as my DNS since they offered free SSL certificates.

But after all that mess around it was go time, and I began the process of learning some basic HTML/CSS/JS as well as the flow of HUGO.
The design process was great, and I found developing a front end solution to be very enjoyable. During development, I realised that providing
a message form would be ideal and quickly discovered that most solutions required heavy maintenance for security reasons or cost money if I went
with a third part solution. And this is where __[Netlify](https://www.netlify.com/)__ comes in! 

Netlify offered a form with up to 100 free messages, which is more than I'll ever need, unless I become highly sort after in the future. :smile:  
Switching to Netlify was easy and the UI was much easier than Azure. I also switched from Cloudflare to use Netlify's own DNS. Netlify also offers
plugins and asset optimization such as Bundling and minifying CSS & JS as well as caching old builds to save build minutes when new features
are pushed.

For vulnerability assessment I use __[SNYK](https://snyk.io/)__ to monitor my website, having found a few old JS libraries that needed to be updated
in the past. It scans my GitHub repo monthly and reports any issues that it may find, allowing me to stay on top of new vulnerabilities as they occur.
I also use a Content-Security-Policy (CSP) to ensure only authorised content is loaded on the website.

The design of the website itself is quite minimal and basic, but for my first attempt at a website I am quite happy with it. This website is 
a platform for me to demonstrate what I can do and who I am, and because of that I plan to keep developing it long into the future.