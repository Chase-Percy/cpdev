---
title: "Unix Shell"
author: "Chase Percy"
type: "page"
date: 2021-11-13T16:52:11+08:00
subtitle: "ICT374 Project"
image: ""
tags: []
bigimg: [{src: "/img/unix/banner.png"}]
---
{{< lazyimg src="/img/unix/icons.png" title="C | GITHUB" >}}

{{< spacer >}}
{{% centre %}}
## A minimal but complete unix shell
{{< spacer >}}
{{< youtube bSUyzbG0CxU >}}
{{< spacer >}}

{{< line >}}
{{< spacer >}}
## Development Team
Chase Percy  
__[Nunzia Sorrentino](https://au.linkedin.com/in/nunzia-sorrentino-bbb393111)__
{{< spacer >}}
## Source Code
__[Unix Shell Repo](https://gitfront.io/r/cp-dev/10f2867377fcb983d308959b7c5ac3098a5c72e3/ICT374/)__   
{{< spacer >}}
## Project Planning and Tools
{{% /centre %}}
{{< columns >}}
- Weekly meetings
- Git with GitHub for source control
  - __[Git Flow Model]({{< ref "/post/gitflow.md" >}})__
  - Branch Protection
- Build Generation
  - Make
  - CMake

{{< column >}}
- CI/CD
  - GitHub Actions
  - Static Analyzer (CPPCheck)
  - Valgrind memcheck
  - Make generation testing
- Kanban Board

{{< endcolumns >}}

{{< spacer >}}

{{< lazyimg src="/img/unix/kanban.png" >}}
{{< spacer >}}
{{< line >}}
{{% centre %}}
{{< spacer >}}
## Features developed by me
{{< spacer >}}
### Tokenization
The tokenizer is responsible for transforming user input into a format that can be processed when the program creates
commands from the input.
For the tokenization process, I wanted to ensure that it would scale for any future requirements or larger
input from a user. A vector-like data structure was created and used when processing and storing user
input to cater for this.
{{< spacer >}}
{{< lazyimg src="/img/unix/tokenization.png" >}}

{{< spacer >}}

### Wildcards
Both the * and ? wildcards are supported and are expanded during the tokenization process.
{{< spacer >}}
{{< lazyimg src="/img/unix/wildcard.png" >}}

{{< spacer >}}

### Command Creation
Command creation is converting the tokens into a format that the shell can process. This considers the `? & ;` separators and separates commands appropriately.
{{< spacer >}}
{{< lazyimg src="/img/unix/command.png" >}}

{{< spacer >}}

### Shell Built-ins
CD, Change the shell prompt, and exit is provided as built-in shell commands that were executed from the parent
shell. The only built-in that was executed in a child process was the PWD command so that its output could be used
with file redirection and piping between processes.
{{< spacer >}}
{{< lazyimg src="/img/unix/built-ins.png" >}}
{{% /centre %}}
