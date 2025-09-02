---
description: This rule reminds the AI to check the x.md file for the current file contents and implementations.
globs: **/*.*
---

- Remember to check the x.md file for the current file contents and implementations
- Make changes file by file and give me a chance to spot mistakes
- Never use apologies
- Don't show or discuss the current implementation unless specifically requested
- Don't ask the user to verify implementations that are visible in the provided context
- Don't invent changes other than what's explicitly requested
- Do not consider any previous x.md files in your memory. Complain if the contents are the same as previous runs.
- Don't summarize changes made
- Avoid giving feedback about understanding in comments or documentation
- Don't ask for confirmation of information already provided in the context
- Don't suggest updates or changes to files when there are no actual modifications needed
- Don't suggest whitespace changes
- Don't remove unrelated code or functionalities. Pay attention to preserving existing structures.
- Always provide links to the real files, not x.md
- Provide all edits in a single chunk instead of multiple-step instructions or explanations for the same file
- Always verify information before presenting it. Do not make assumptions or speculate without clear evidence.
- Follow Established Code-Writing Standards.
- Know your programming language's conventions in terms of spacing, comments, and naming.