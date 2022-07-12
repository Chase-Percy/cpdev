---
title: "Magazine Service"
author: "Chase Percy"
type: "page"
date: 2022-07-07T09:17:24+08:00
subtitle: "ICT373 Project"
image: ""
tags: []
bigimg: [{src: "/img/ms/banner.png"}]
---
{{< lazyimg src="/img/ms/icons.png" class="lazyimg" title="JAVA | JAVA FX | GITHUB" >}}

{{< spacer >}}

{{< centreText h="2" >}}
A CRUD Application
{{< spacer >}}
{{< /centreText >}}
{{< youtube 7Z-3r7mR0Ss >}}
{{< spacer >}}
{{< line >}}
{{< spacer >}}

{{% centre %}}

## Project Planning and Tools
{{% /centre %}}

{{< columns >}}
- Javadoc 
- Trello

{{< column >}}
- Git with GitHub for source control
  - __[Git Flow Model]({{< ref "/post/gitflow.md" >}})__
  - Git LFS

{{< endcolumns >}}

{{< spacer >}}

{{% centre %}}
## Overview


This simple application was created using java SE 8 and the JavaFX library for GUI rendering and handling. The purpose
was to create a CRUD application designed using OOP. The application supported the serialization of magazines and their customers 
so they could be loaded and saved from a file. The application also supported limited multithreading when processing the
view information. 

{{< spacer >}}
### Create

The creation pane guides the user through creating a new magazine, the supplements it offers, and the customers who will
use the new magazine, if there are any, to begin with. Invalid information is not accepted, and a message will be shown
to the user to explain how to fix the issue.
{{< spacer >}}

{{< lazyimg src="/img/ms/create.png" class="lazyimg">}}

{{< spacer >}}
### Edit

The edit pane allows the user to edit existing supplements or customers using a table view. Exceptions will be caught and 
explained to the user if the new information is invalid.
{{< spacer >}}

{{< lazyimg src="/img/ms/edit.png" class="lazyimg">}}

{{< spacer >}}
### View

The view pane allows the user to view the supplement and customer information (including their billing emails), without
being able to edit it.
{{< spacer >}}

{{< lazyimg src="/img/ms/view.png" class="lazyimg">}}

{{% /centre %}}
