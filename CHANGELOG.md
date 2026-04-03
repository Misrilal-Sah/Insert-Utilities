# Changelog

All notable changes to the **Insert Utilities** extension will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.0] - 2025-04-15

### Added

#### Commands (12 total)
- `🔑 Insert UUID v4` — Inserts a standard lowercase UUID v4 with dashes
- `🔑 Insert UUID v4 (Uppercase)` — Inserts an uppercase UUID v4
- `🔑 Insert UUID v4 (No Dashes)` — Inserts a UUID v4 without dashes
- `🔑 Insert Multiple UUIDs` — Prompts for count, inserts N UUIDs (one per line)
- `📝 Insert Lorem Ipsum (1 Sentence)` — Inserts the classic opening sentence
- `📝 Insert Lorem Ipsum (50 Words)` — Inserts a short Lorem Ipsum block
- `📝 Insert Lorem Ipsum (150 Words)` — Inserts a medium Lorem Ipsum block
- `📝 Insert Lorem Ipsum (500 Words)` — Inserts a long Lorem Ipsum block
- `📝 Insert Lorem Ipsum (Custom Length)` — Prompts for a word count (1–5000)
- `🕐 Insert Current Timestamp` — Inserts timestamp using the configured format
- `🕐 Insert ISO Timestamp` — Inserts an ISO 8601 timestamp
- `🎲 Insert Random String` — Quick Pick menu with 7 random string options

#### Generators (4 modules)
- **UUID Generator** (`uuid.ts`) — Uses `crypto.randomUUID()`
- **Lorem Ipsum Generator** (`lorem.ts`) — 100+ word pool, realistic sentence and paragraph structure
- **Timestamp Generator** (`timestamp.ts`) — 6 configurable formats, no external libraries
- **Random String Generator** (`random.ts`) — Uses `crypto.randomBytes()` with rejection sampling to avoid bias

#### Settings (6 options)
- `insertUtilities.uuidFormat` — Default UUID case format (`lowercase` | `uppercase`)
- `insertUtilities.uuidIncludeDashes` — Toggle dashes in UUID output
- `insertUtilities.loremStartWithClassic` — Start Lorem Ipsum with classic opening
- `insertUtilities.timestampFormat` — Select from 6 timestamp format presets
- `insertUtilities.showNotification` — Toggle post-insert notification messages
- `insertUtilities.randomStringCharset` — Select character set for random strings

#### Keyboard Shortcuts (4 bindings)
- `Ctrl+Alt+U` / `Cmd+Alt+U` — Insert UUID v4
- `Ctrl+Alt+L` / `Cmd+Alt+L` — Insert Lorem Ipsum (150 words)
- `Ctrl+Alt+T` / `Cmd+Alt+T` — Insert Current Timestamp
- `Ctrl+Alt+R` / `Cmd+Alt+R` — Insert Random String

#### Context Menu
- Submenu `✨ Insert Utilities` added to the editor right-click context menu
- All 12 commands organized into 4 groups with separators

#### Architecture
- Multi-cursor support: all commands insert at every cursor position simultaneously
- Replace mode: if text is selected, all commands replace the selection
- Zero external npm dependencies — only Node.js built-in modules are used
- Clean modular architecture with one file per generator

---

[1.0.0]: https://github.com/username/insert-utilities/releases/tag/v1.0.0
