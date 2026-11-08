# Change Log

All notable changes to the "tagged-todos" extension will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/).

## [0.1.0] - 2026-11-08

### Added

- **Tagged TODOs** view in the Activity Bar.
- Detects `TODO[tag]: text` comments in any file of the workspace (case-insensitive, `:` optional).
- TODOs grouped by tag in uppercase, with the number of TODOs per tag.
- TODOs without a tag are grouped under `UNTAGGED`.
- Each TODO shows its file and line, and opens the file at that line on click.
- The tree refreshes automatically when you save a file.
