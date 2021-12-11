---
title: "Unix Shell"
author: "Chase Percy"
type: "page"
date: 2021-11-13T16:52:11+08:00
subtitle: "ICT374 Project"
image: ""
tags: []
---

{{< lazyimg src="/img/unix/icons.webp" title="C | GITHUB" >}}

{{< whiteLine >}}

## A minimal but complete unix shell
-- Todo: add video

{{< line >}}

## Development Team
- Chase Percy
- [Nunzia Sorrentino](https://au.linkedin.com/in/nunzia-sorrentino-bbb393111)

## Repo
- [Unix Shell](https://gitfront.io/r/cp-dev/10f2867377fcb983d308959b7c5ac3098a5c72e3/ICT374/)   
(Hosted through GitFront instead of a public GitHub repo to help prevent plagiarism)

## Project Planning and Tools
{{< columns >}}
- Weekly meetings
- Git with GitHub for source control
  - Git flow model
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

{{< whiteLine >}}

{{< lazyimg src="/img/unix/kanban.webp" >}}

{{< line >}}

## Features developed by me
{{< whiteLine >}}
### Tokenization
The tokenizer is responsible for transforming user input into a format that can be processed when the program creates
commands from the input.
For the tokenization process I wanted to ensure that it would be able to scale for any future requirements or larger
input from a user. To cater for this a vector like data structure was created and used when processing and storing user
input.

{{< lazyimg src="/img/unix/tokenization.webp" >}}

{{< whiteLine >}}

### Wildcards
Both the * and ? wildcards are supported and are expanded during the tokenization process.

{{< lazyimg src="/img/unix/wildcard.webp" >}}

{{< whiteLine >}}

### Command Creation
Command creation is the process of converting the tokens into a format that can be processed by the shell. This takes
into account the `? & ;` separators and separates commands appropriately.

{{< lazyimg src="/img/unix/command.webp" >}}

{{< whiteLine >}}

### Shell Built-ins
CD, Change the shell prompt, and exit were provided as built in shell commands that were executed from the parent
shell. The only built-in that was executed in a child process was the PWD command so that it's output could be used
with file redirection and piping between processes.

{{< lazyimg src="/img/unix/built-ins.webp" >}}
