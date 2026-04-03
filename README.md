# ✨ Insert Utilities — UUID, Lorem Ipsum & More

**The all-in-one text generator for developers**

[![Version](https://img.shields.io/visual-studio-marketplace/v/Misrilal-Sah.insert-utilities?style=flat-square&color=1E1E2E&labelColor=6C6FE4&label=version)](https://marketplace.visualstudio.com/items?itemName=Misrilal-Sah.insert-utilities)
[![Installs](https://img.shields.io/visual-studio-marketplace/i/Misrilal-Sah.insert-utilities?style=flat-square&color=1E1E2E&labelColor=6C6FE4&label=installs)](https://marketplace.visualstudio.com/items?itemName=Misrilal-Sah.insert-utilities)
[![Rating](https://img.shields.io/visual-studio-marketplace/r/Misrilal-Sah.insert-utilities?style=flat-square&color=1E1E2E&labelColor=6C6FE4&label=rating)](https://marketplace.visualstudio.com/items?itemName=Misrilal-Sah.insert-utilities)
[![License: MIT](https://img.shields.io/badge/license-MIT-6C6FE4?style=flat-square&color=1E1E2E&labelColor=6C6FE4)](LICENSE)

Stop switching between browser tabs to grab UUIDs, lorem ipsum text, or timestamps. **Insert Utilities** brings all of them directly into your editor — with a keyboard shortcut, the Command Palette, or a right-click context menu.

---

## Features

### 🔑 UUID Generator
Generate UUID v4 identifiers in three formats, or insert dozens at once with a single prompt.

### 📝 Lorem Ipsum Generator
Realistic placeholder text with proper sentences, commas, and paragraph breaks — not just a wall of random words.

### 🕐 Timestamp Generator
Six timestamp formats including ISO 8601 and Unix epoch, configured to your preference.

### 🎲 Random String Generator
Cryptographically secure alphanumeric, hex, and numeric strings — safe for tokens, passwords, and test data.

---

## Commands

| Command | Description | Shortcut |
|---|---|---|
| 🔑 Insert UUID v4 | `f47ac10b-58cc-4372-a567-0e02b2c3d479` | `Ctrl+Alt+U` |
| 🔑 Insert UUID v4 (Uppercase) | `F47AC10B-58CC-4372-A567-0E02B2C3D479` | — |
| 🔑 Insert UUID v4 (No Dashes) | `f47ac10b58cc4372a5670e02b2c3d479` | — |
| 🔑 Insert Multiple UUIDs | Prompts for count, inserts one UUID per line | — |
| 📝 Insert Lorem Ipsum (1 Sentence) | Classic opening sentence | — |
| 📝 Insert Lorem Ipsum (50 Words) | Short paragraph block | — |
| 📝 Insert Lorem Ipsum (150 Words) | Medium paragraph block | `Ctrl+Alt+L` |
| 📝 Insert Lorem Ipsum (500 Words) | Long multi-paragraph block | — |
| 📝 Insert Lorem Ipsum (Custom Length) | Prompts for word count (1–5000) | — |
| 🕐 Insert Current Timestamp | Uses format from Settings | `Ctrl+Alt+T` |
| 🕐 Insert ISO Timestamp | `2025-04-15T14:30:45.000Z` | — |
| 🎲 Insert Random String | Quick Pick with 7 options | `Ctrl+Alt+R` |

All commands are accessible from:
- **Keyboard shortcuts** (see table above)
- **Command Palette** (`Ctrl+Shift+P` → type "Insert Utilities")
- **Right-click context menu** → `✨ Insert Utilities`

---

## Key Advantages

✅ **Zero external dependencies** — uses only Node.js built-in `crypto` module  
✅ **Multiple UUID formats** — lowercase, uppercase, and no-dashes variants  
✅ **Realistic Lorem Ipsum** — proper sentences, commas, and paragraph breaks  
✅ **6 timestamp formats** — including ISO 8601, Unix epoch, and locale-friendly  
✅ **Cryptographically secure random strings** — `crypto.randomBytes()`, not `Math.random()`  
✅ **Multi-cursor support** — inserts at all cursor positions simultaneously  
✅ **Replace or insert** — respects text selections; replaces selected text  

---

## Screenshots

> **Screenshot 1:** UUID insertion via Command Palette  
> *(place `assets/screenshot-uuid.png` here)*

> **Screenshot 2:** Lorem Ipsum context menu submenu  
> *(place `assets/screenshot-lorem.png` here)*

> **Screenshot 3:** Multi-cursor UUID insertion  
> *(place `assets/screenshot-multicursor.png` here)*

---

## Demo

> *(place `assets/demo.gif` here — record with VS Code's built-in screen recorder)*

---

## Installation

**From the VS Code Marketplace:**

1. Open VS Code
2. Press `Ctrl+P` and type: `ext install Misrilal-Sah.insert-utilities`
3. Press Enter

**From the CLI:**

```bash
code --install-extension Misrilal-Sah.insert-utilities
```

---

## Usage

### ⌨️ Keyboard Shortcuts

| Action | Windows / Linux | macOS |
|---|---|---|
| Insert UUID v4 | `Ctrl+Alt+U` | `Cmd+Alt+U` |
| Insert Lorem Ipsum (150 words) | `Ctrl+Alt+L` | `Cmd+Alt+L` |
| Insert Timestamp | `Ctrl+Alt+T` | `Cmd+Alt+T` |
| Insert Random String | `Ctrl+Alt+R` | `Cmd+Alt+R` |

### 🔑 UUID Examples

```
Lowercase (default):
f47ac10b-58cc-4372-a567-0e02b2c3d479

Uppercase:
F47AC10B-58CC-4372-A567-0E02B2C3D479

No Dashes:
f47ac10b58cc4372a5670e02b2c3d479

Multiple (5 UUIDs):
a1b2c3d4-e5f6-7890-abcd-ef1234567890
b2c3d4e5-f6a7-8901-bcde-f12345678901
c3d4e5f6-a7b8-9012-cdef-123456789012
d4e5f6a7-b8c9-0123-defa-234567890123
e5f6a7b8-c9d0-1234-efab-345678901234
```

### 📝 Lorem Ipsum Examples

**1 Sentence:**
```
Lorem ipsum dolor sit amet, consectetur adipiscing elit.
```

**50 Words:**
```
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod 
tempor incididunt ut labore et dolore magna aliqua. Enim ad minim veniam, 
quis nostrud exercitation ullamco laboris nisi aliquip ex ea commodo 
consequat duis aute irure.
```

**500 Words (excerpt):**
```
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod 
tempor incididunt ut labore et dolore magna aliqua. Enim ad minim veniam, 
quis nostrud exercitation ullamco laboris nisi aliquip ex ea commodo.

Duis aute irure in reprehenderit voluptate velit esse cillum fugiat nulla 
pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui 
officia deserunt mollit anim id est laborum...
```

### 🕐 Timestamp Format Examples

| Setting Value | Example Output |
|---|---|
| `YYYY-MM-DD HH:mm:ss` | `2025-04-15 14:30:45` |
| `YYYY-MM-DDTHH:mm:ssZ` | `2025-04-15T14:30:45.000Z` |
| `MM/DD/YYYY HH:mm:ss` | `04/15/2025 14:30:45` |
| `DD/MM/YYYY HH:mm:ss` | `15/04/2025 14:30:45` |
| `MMMM DD, YYYY` | `April 15, 2025` |
| `Unix Epoch` | `1713189045` |

### 🎲 Random String Examples

```
Alphanumeric (16):  aB3xK9mZpQ2rLw7Y
Alphanumeric (32):  aB3xK9mZpQ2rLw7YnT5sF1uD8vE4cH6j
Alphanumeric (64):  aB3xK9mZ...64 chars total
Hex (16):           3f9a2b1c4e8d07a5
Hex (32):           3f9a2b1c4e8d07a51b6c3d2e5f4a7890
Number (6):         482930
Number (10):        7391028456
```

---

## Settings

Open VS Code Settings (`Ctrl+,`) and search for **"Insert Utilities"**, or add these directly to your `settings.json`:

```json
{
  // UUID format: "lowercase" or "uppercase"
  "insertUtilities.uuidFormat": "lowercase",

  // Include dashes in UUID
  "insertUtilities.uuidIncludeDashes": true,

  // Start Lorem Ipsum with "Lorem ipsum dolor sit amet..."
  "insertUtilities.loremStartWithClassic": true,

  // Default timestamp format
  // Options: "YYYY-MM-DD HH:mm:ss" | "YYYY-MM-DDTHH:mm:ssZ" |
  //          "MM/DD/YYYY HH:mm:ss" | "DD/MM/YYYY HH:mm:ss" |
  //          "MMMM DD, YYYY" | "Unix Epoch"
  "insertUtilities.timestampFormat": "YYYY-MM-DD HH:mm:ss",

  // Show notification toast after inserting
  "insertUtilities.showNotification": true,

  // Character set for random strings
  // Options: "alphanumeric" | "alphabetic" | "numeric" | "hex"
  "insertUtilities.randomStringCharset": "alphanumeric"
}
```

---

## Multi-Cursor Support

Insert Utilities fully supports VS Code's multi-cursor editing. Place multiple cursors with `Alt+Click` (or `Ctrl+Alt+Down/Up`), then run any Insert Utilities command — a unique value will be inserted at **each cursor position** simultaneously.

This is especially useful for:
- Generating a UUID for each row in a data fixture
- Filling multiple placeholder fields with different lorem text
- Inserting the current timestamp in multiple log lines at once

---

## Comparison

| Feature | Insert Utilities | UUID Generator | Lorem Ipsum |
|---|---|---|---|
| UUID v4 | ✅ | ✅ | ❌ |
| UUID uppercase | ✅ | ⚠️ Some | ❌ |
| UUID no-dashes | ✅ | ⚠️ Some | ❌ |
| Multiple UUIDs | ✅ | ⚠️ Some | ❌ |
| Lorem Ipsum | ✅ | ❌ | ✅ |
| Timestamps | ✅ | ❌ | ❌ |
| Random strings | ✅ | ❌ | ❌ |
| Multi-cursor | ✅ | ⚠️ Varies | ⚠️ Varies |
| Zero dependencies | ✅ | ⚠️ Varies | ⚠️ Varies |
| Keyboard shortcuts | ✅ | ⚠️ Varies | ⚠️ Varies |

---

## FAQ

**Are the UUIDs truly random and safe to use as identifiers?**  
Yes. All UUIDs are generated using Node.js `crypto.randomUUID()`, which produces cryptographically secure UUID v4 values compliant with RFC 4122.

**Can I customize the Lorem Ipsum output?**  
Yes. Use the `insertUtilities.loremStartWithClassic` setting to control whether text always starts with "Lorem ipsum dolor sit amet...". You can also use the Custom Length command to generate exactly as many words as you need.

**Does it work with multiple cursors?**  
Yes — fully. Every command inserts at all active cursor positions simultaneously. If you have 10 cursors, you get 10 insertions in one action.

**Does this extension install any external packages?**  
No. Insert Utilities has zero runtime dependencies. It uses only Node.js built-in modules (`crypto`) and the VS Code API. This makes it fast, secure, and safe for restricted environments.

**Can I change the keyboard shortcuts?**  
Yes. Open `Keyboard Shortcuts` (`Ctrl+K Ctrl+S`), search for "Insert Utilities", and reassign any binding to your preference.

---

## Development

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or later
- [Visual Studio Code](https://code.visualstudio.com/) v1.75 or later
- TypeScript (`npm install` will bring it as a dev dependency)

### Setup

```bash
git clone https://github.com/Misrilal-Sah/Insert-Utilities.git
cd Insert-Utilities
npm install
```

### How to Run (Extension Host)

1. Open the folder in VS Code
2. Press `F5` — this compiles the TypeScript and launches a new **Extension Development Host** window
3. In the new window, open any file and use `Ctrl+Shift+P` → type **"Insert Utilities"** to see all commands

Alternatively, compile manually and then press F5:

```bash
npm run compile   # one-time build
npm run watch     # recompile on every save
```

The compiled output goes to the `out/` folder (listed in `.gitignore`).

### How to Test — All Features

There are no automated tests (pure VS Code extension), so testing is done manually in the Extension Development Host window:

#### UUID Commands
| Command | How to test | Expected result |
|---|---|---|
| `Insert UUID v4` (`Ctrl+Alt+U`) | Open a `.txt` file, press shortcut | 36-char lowercase UUID with dashes, e.g. `f47ac10b-58cc-4372-a567-0e02b2c3d479` |
| `Insert UUID v4 (Uppercase)` | Command Palette | Same UUID but UPPERCASE |
| `Insert UUID v4 (No Dashes)` | Command Palette | 32-char UUID without dashes |
| `Insert Multiple UUIDs` | Command Palette → enter `5` | 5 UUIDs, one per line |
| Settings — `uuidFormat: "uppercase"` | Set setting, press `Ctrl+Alt+U` | Primary UUID command now inserts uppercase |
| Settings — `uuidIncludeDashes: false` | Set setting, press `Ctrl+Alt+U` | Primary UUID command inserts no dashes |
| Multi-cursor UUID | Place 3 cursors (`Alt+Click`), press `Ctrl+Alt+U` | 3 different UUIDs inserted simultaneously |

#### Lorem Ipsum Commands
| Command | How to test | Expected result |
|---|---|---|
| `Insert Lorem Ipsum (1 Sentence)` | Command Palette | Classic opening sentence exactly |
| `Insert Lorem Ipsum (50 Words)` | Command Palette | ~50 word paragraph |
| `Insert Lorem Ipsum (150 Words)` (`Ctrl+Alt+L`) | Shortcut | ~150 words, possibly multiple paragraphs |
| `Insert Lorem Ipsum (500 Words)` | Command Palette | Multi-paragraph block |
| `Insert Lorem Ipsum (Custom Length)` | Command Palette → enter `200` | ~200 words |
| `Insert Lorem Ipsum (Custom Length)` — validation | Enter `0` | Error: "Please enter a number greater than 0" |
| `Insert Lorem Ipsum (Custom Length)` — validation | Enter `9999` | Error: "Maximum is 5000 words" |
| Settings — `loremStartWithClassic: false` | Set setting, insert lorem | Text starts with random word, not "Lorem ipsum" |

#### Timestamp Commands
| Command | How to test | Expected result |
|---|---|---|
| `Insert Current Timestamp` (`Ctrl+Alt+T`) | Shortcut | Format from settings, e.g. `2025-04-15 14:30:45` |
| `Insert ISO Timestamp` | Command Palette | ISO 8601 format, e.g. `2025-04-15T14:30:45.000Z` |
| Settings — `timestampFormat: "Unix Epoch"` | Set setting, press `Ctrl+Alt+T` | Unix epoch integer, e.g. `1713189045` |
| Settings — `timestampFormat: "MMMM DD, YYYY"` | Set setting, press `Ctrl+Alt+T` | e.g. `April 15, 2025` |

#### Random String Command
| Command | How to test | Expected result |
|---|---|---|
| `Insert Random String` (`Ctrl+Alt+R`) — 16 chars | Select from QuickPick | 16 alphanumeric chars |
| `Insert Random String` — Hex 32 | Select "Random Hex (32 chars)" | 32 hex chars `[0-9a-f]` |
| `Insert Random String` — Number 6 | Select "Random Number (6 digits)" | 6-digit numeric string |
| Settings — `randomStringCharset: "alphabetic"` | Set setting, run `Ctrl+Alt+R`, pick "Random String (16 chars)" | Letters only (no digits) |
| Uniqueness check | Run same command 10× | All outputs differ |

#### Context Menu
- Right-click in any open editor → hover **✨ Insert Utilities** → verify all 4 subgroups appear (UUID, Lorem, Timestamp, Random)

#### Notification / Status Bar
- After any insert, check for the info toast (bottom right) and the `✅ Inserted …` status bar message
- Set `insertUtilities.showNotification: false` → re-run a command → toast should not appear

---

## Contributing

Contributions, bug reports, and feature requests are welcome!

1. Fork the [repository](https://github.com/Misrilal-Sah/Insert-Utilities)
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m 'Add my feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Open a Pull Request

Please follow the existing code style and ensure all TypeScript compiles without errors (`npm run compile`).

---

## Issues

Found a bug or have a suggestion? Please [open an issue](https://github.com/Misrilal-Sah/Insert-Utilities/issues) on GitHub. Include your VS Code version and OS when reporting bugs.

---

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for a detailed version history.

---

## License

MIT — see [LICENSE](LICENSE) for details.

---

## Support

If this extension saves you time, consider:
- ⭐ Starring the [GitHub repository](https://github.com/Misrilal-Sah/Insert-Utilities)
- 📝 Leaving a review on the [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=Misrilal-Sah.insert-utilities)
- 🐛 Reporting issues or contributing improvements

---

**Author:** Misrilal Sah · [GitHub](https://github.com/Misrilal-Sah) · [Marketplace](https://marketplace.visualstudio.com/publishers/Misrilal-Sah)
