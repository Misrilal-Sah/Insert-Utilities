# Run Guide: Insert Utilities VS Code Extension

This is a complete, followable guide to:

- Set up the project
- Build and run the extension
- Verify every feature works
- Test behavior manually
- Package and publish

Use this file as your step-by-step checklist.

## 1. Prerequisites

- Node.js 18+ (Node.js 20 LTS recommended)
- npm 9+
- VS Code 1.75+
- `code` command in terminal (optional but useful)

Check versions:

```powershell
node -v
npm -v
code --version
```

## 2. Open the Project

```powershell
cd "c:\Users\Misrilal Sah (IND)\Desktop\Insert Utilities"
```

Then open this folder in VS Code.

## 3. Install Dependencies

```bash
npm install
```

Expected result:

- Installation finishes without `npm ERR!`.

## 4. Build the Extension

```bash
npm run compile
```

Expected result:

- TypeScript compiles successfully.
- JavaScript output is generated in `out`.

## 5. Lint the Code

```bash
npm run lint
```

Expected result:

- No ESLint errors.
- A TypeScript compatibility warning from `@typescript-eslint` may appear and can be non-blocking if there are no actual lint errors.

## 6. Run Extension in Development Host

You can run the extension in two ways.

### Option A (Recommended): F5 Debug

1. Open this project in VS Code.
2. Press `F5`.
3. A new window opens: Extension Development Host.
4. In that new window, open any text file (for example, `test.txt`).
5. Open Command Palette with `Ctrl+Shift+P` and search for `Insert Utilities`.

### Option B: CLI

```bash
code --extensionDevelopmentPath . --new-window
```

## 7. Verify Extension Loaded Correctly

In Extension Development Host:

1. Open `Ctrl+Shift+P`.
2. Search for `Insert Utilities`.
3. Confirm these commands are visible:

- Insert UUID v4
- Insert UUID v4 (Uppercase)
- Insert UUID v4 (No Dashes)
- Insert Multiple UUIDs
- Insert Lorem Ipsum (1 Sentence)
- Insert Lorem Ipsum (50 Words)
- Insert Lorem Ipsum (150 Words)
- Insert Lorem Ipsum (500 Words)
- Insert Lorem Ipsum (Custom Length)
- Insert Current Timestamp
- Insert ISO Timestamp
- Insert Random String

4. Right-click inside editor and confirm submenu `✨ Insert Utilities` appears.

## 8. Full Feature Verification Checklist

Create/open a file like `verify.txt` and run each test below.

## UUID tests

1. Run `Insert UUID v4`.

Expected:

- Looks like `f47ac10b-58cc-4372-a567-0e02b2c3d479`.
- Lowercase hex and dashes.

2. Run `Insert UUID v4 (Uppercase)`.

Expected:

- Same UUID shape, uppercase letters.

3. Run `Insert UUID v4 (No Dashes)`.

Expected:

- 32 hex characters, no `-`.

4. Run `Insert Multiple UUIDs` and enter `5`.

Expected:

- 5 UUID lines inserted.
- Values should be different.

5. Run `Insert Multiple UUIDs` and enter invalid values like `0`, `-1`, `abc`, `101`.

Expected:

- Validation message appears.
- Input rejected.

## Lorem Ipsum tests

1. Run `Insert Lorem Ipsum (1 Sentence)`.

Expected:

- One readable sentence.

2. Run `Insert Lorem Ipsum (50 Words)`.

Expected:

- About 50 words.

3. Run `Insert Lorem Ipsum (150 Words)`.

Expected:

- About 150 words.

4. Run `Insert Lorem Ipsum (500 Words)`.

Expected:

- Large multi-paragraph style text.

5. Run `Insert Lorem Ipsum (Custom Length)` and enter `200`.

Expected:

- About 200 words inserted.

6. Test invalid custom length values like `0`, `-5`, `abc`, `5001`.

Expected:

- Validation message appears.
- Input rejected.

## Timestamp tests

1. Run `Insert Current Timestamp`.

Expected:

- Timestamp appears in the configured default format.

2. Run `Insert ISO Timestamp`.

Expected:

- Format similar to `2026-04-01T12:34:56.000Z`.

## Random String tests

1. Run `Insert Random String`.
2. In Quick Pick, test every option:

- Random String (16 chars)
- Random String (32 chars)
- Random String (64 chars)
- Random Hex (16 chars)
- Random Hex (32 chars)
- Random Number (6 digits)
- Random Number (10 digits)

Expected:

- Each option inserts output with matching length and character type.

## Keyboard shortcut tests

In editor text focus, verify:

- `Ctrl+Alt+U` inserts UUID v4
- `Ctrl+Alt+L` inserts Lorem Ipsum (150 Words)
- `Ctrl+Alt+T` inserts Current Timestamp
- `Ctrl+Alt+R` opens/inserts Random String flow

## Multi-cursor tests

1. Add 3 cursors using `Alt+Click`.
2. Run `Insert UUID v4`.

Expected:

- UUID inserted at all cursor positions.
- Each position should get a unique UUID.

## Selection replace tests

1. Select existing text.
2. Run any insert command.

Expected:

- Selected text is replaced by generated output.

## 9. Settings Verification

Open settings (`Ctrl+,`) and search `Insert Utilities`, or edit `settings.json`.

Test these settings one-by-one:

```json
{
  "insertUtilities.uuidFormat": "uppercase",
  "insertUtilities.uuidIncludeDashes": true,
  "insertUtilities.loremStartWithClassic": true,
  "insertUtilities.timestampFormat": "YYYY-MM-DD HH:mm:ss",
  "insertUtilities.showNotification": true,
  "insertUtilities.randomStringCharset": "alphanumeric"
}
```

Suggested checks:

1. Toggle `insertUtilities.showNotification` true/false and run commands.
2. Change `insertUtilities.timestampFormat` then run `Insert Current Timestamp`.
3. Toggle `insertUtilities.loremStartWithClassic` and compare lorem output start.

## 10. Development Workflow (Recommended)

Use watch mode for faster iteration:

```bash
npm run watch
```

Workflow:

1. Keep watch terminal running.
2. Edit `.ts` files.
3. Wait for compile success.
4. In Extension Development Host run `Developer: Reload Window`.
5. Retest command behavior.

## 11. Regression Smoke Test Before Packaging

Run before creating `.vsix`:

```bash
npm run compile
npm run lint
```

Then quickly verify in Development Host:

1. One UUID command
2. One Lorem command
3. Timestamp command
4. Random String command
5. Context submenu visibility
6. One keyboard shortcut

## 12. Package Extension (.vsix)

Install `vsce` once:

```bash
npm install -g @vscode/vsce
```

Create package:

```bash
vsce package
```

Expected output example:

- `insert-utilities-1.0.0.vsix`

Install local package:

```bash
code --install-extension insert-utilities-1.0.0.vsix
```

Optional: uninstall old version first:

```bash
code --uninstall-extension my-publisher-name.insert-utilities
```

## 13. Publish to Marketplace (When Ready)

1. Create a publisher on VS Code Marketplace.
2. Create a Personal Access Token (PAT).
3. Login:

```bash
vsce login <your-publisher-name>
```

4. Publish:

```bash
vsce publish
```

## 14. Troubleshooting

### Commands do not appear in Development Host

Actions:

1. Run `npm run compile` again.
2. Reload dev host (`Developer: Reload Window`).
3. Check if Extension Development Host opened from this project.

### `No files matching pattern "src"` during lint

Cause:

- Wrong lint script in some templates.

Fix:

- Use `eslint . --ext ts` (already configured in this repo).

### TypeScript `rootDir` errors

Fix:

- Ensure `tsconfig.json` uses `"rootDir": "."` for this flat file layout.

### `code` command not found

Fix:

- Windows: reinstall VS Code and enable Add to PATH.
- macOS/Linux: run `Shell Command: Install 'code' command in PATH`.

### Packaging fails

Checks:

1. Run `npm run compile`.
2. Confirm `main` points to `./out/extension.js` in `package.json`.
3. Retry `vsce package`.

## 15. What is tested here vs not tested

Tested by this guide:

- End-to-end manual validation of all commands and UX paths.
- Build and lint quality gates.

Not currently included in this repo:

- Automated unit tests.
- Automated integration tests.

If you want, next step can be adding an automated VS Code extension test suite.
