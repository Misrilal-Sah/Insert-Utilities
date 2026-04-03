import * as vscode from 'vscode';

// Generators
import { generateUUID, generateUUIDUppercase, generateUUIDNoDashes, generateMultipleUUIDs } from './uuid';
import { generateLoremSentence, generateLorem } from './lorem';
import { generateTimestamp } from './timestamp';
import { generateRandomString, generateRandomNumber } from './random';

// Helpers
import { insertTextAtCursor, showInsertNotification } from './editor';

/**
 * Reads the Insert Utilities configuration from VS Code settings.
 */
function getConfig() {
  const config = vscode.workspace.getConfiguration('insertUtilities');
  return {
    uuidFormat:            config.get<string>('uuidFormat', 'lowercase'),
    uuidIncludeDashes:     config.get<boolean>('uuidIncludeDashes', true),
    loremStartWithClassic: config.get<boolean>('loremStartWithClassic', true),
    timestampFormat:       config.get<string>('timestampFormat', 'YYYY-MM-DD HH:mm:ss'),
    showNotification:      config.get<boolean>('showNotification', true),
    randomStringCharset:   config.get<string>('randomStringCharset', 'alphanumeric')
  };
}

/**
 * Extension activation entry point.
 * Called once by VS Code when any of the extension's commands are first used.
 */
export function activate(context: vscode.ExtensionContext): void {
  console.log('[Insert Utilities] Extension activated.');

  // ─────────────────────────────────────────────
  // UUID COMMANDS
  // ─────────────────────────────────────────────

  // 1. Insert UUID v4 — respects uuidFormat and uuidIncludeDashes settings
  // Generator is called per cursor so each cursor gets a unique UUID
  context.subscriptions.push(
    vscode.commands.registerCommand('insert-utilities.insertUUID', async () => {
      const { uuidFormat, uuidIncludeDashes } = getConfig();
      let preview = '';
      const generate = () => {
        let t = generateUUID();
        if (uuidFormat === 'uppercase')  { t = t.toUpperCase(); }
        if (!uuidIncludeDashes)           { t = t.replace(/-/g, ''); }
        if (!preview) { preview = t; }
        return t;
      };
      const ok = await insertTextAtCursor(generate);
      if (ok) { showInsertNotification('UUID v4', preview); }
    })
  );

  // 2. Insert UUID v4 (UPPERCASE with dashes) — unique per cursor
  context.subscriptions.push(
    vscode.commands.registerCommand('insert-utilities.insertUUIDUppercase', async () => {
      let preview = '';
      const generate = () => { const t = generateUUIDUppercase(); if (!preview) { preview = t; } return t; };
      const ok = await insertTextAtCursor(generate);
      if (ok) { showInsertNotification('UUID v4 (Uppercase)', preview); }
    })
  );

  // 3. Insert UUID v4 (no dashes) — unique per cursor
  context.subscriptions.push(
    vscode.commands.registerCommand('insert-utilities.insertUUIDNoDashes', async () => {
      let preview = '';
      const generate = () => { const t = generateUUIDNoDashes(); if (!preview) { preview = t; } return t; };
      const ok = await insertTextAtCursor(generate);
      if (ok) { showInsertNotification('UUID v4 (No Dashes)', preview); }
    })
  );

  // 4. Insert multiple UUIDs — prompts user for a count
  context.subscriptions.push(
    vscode.commands.registerCommand('insert-utilities.insertMultipleUUIDs', async () => {
      const input = await vscode.window.showInputBox({
        prompt: 'How many UUIDs to generate?',
        placeHolder: 'Enter a number (e.g., 5)',
        validateInput: (value) => {
          const n = parseInt(value, 10);
          if (isNaN(n) || n < 1)   { return 'Please enter a number greater than 0.'; }
          if (n > 100)             { return 'Maximum is 100 UUIDs at once.'; }
          return null; // Valid
        }
      });

      if (input === undefined) { return; } // User cancelled

      const count = parseInt(input, 10);
      // Each cursor gets its own independent set of N UUIDs
      const ok = await insertTextAtCursor(() => generateMultipleUUIDs(count));
      if (ok) { showInsertNotification(`${count} UUIDs`, `(${count} UUIDs generated)`); }
    })
  );

  // ─────────────────────────────────────────────
  // LOREM IPSUM COMMANDS
  // ─────────────────────────────────────────────

  // 5. Insert one sentence of Lorem Ipsum
  context.subscriptions.push(
    vscode.commands.registerCommand('insert-utilities.insertLoremSentence', async () => {
      const text = generateLoremSentence();
      const ok = await insertTextAtCursor(text);
      if (ok) { showInsertNotification('Lorem Ipsum (1 sentence)', text); }
    })
  );

  // 6. Insert ~50 words of Lorem Ipsum — unique per cursor
  context.subscriptions.push(
    vscode.commands.registerCommand('insert-utilities.insertLoremShort', async () => {
      const { loremStartWithClassic } = getConfig();
      let preview = '';
      const generate = () => { const t = generateLorem(50, loremStartWithClassic); if (!preview) { preview = t; } return t; };
      const ok = await insertTextAtCursor(generate);
      if (ok) { showInsertNotification('Lorem Ipsum (50 words)', preview); }
    })
  );

  // 7. Insert ~150 words of Lorem Ipsum — unique per cursor
  context.subscriptions.push(
    vscode.commands.registerCommand('insert-utilities.insertLoremMedium', async () => {
      const { loremStartWithClassic } = getConfig();
      let preview = '';
      const generate = () => { const t = generateLorem(150, loremStartWithClassic); if (!preview) { preview = t; } return t; };
      const ok = await insertTextAtCursor(generate);
      if (ok) { showInsertNotification('Lorem Ipsum (150 words)', preview); }
    })
  );

  // 8. Insert ~500 words of Lorem Ipsum — unique per cursor
  context.subscriptions.push(
    vscode.commands.registerCommand('insert-utilities.insertLoremLong', async () => {
      const { loremStartWithClassic } = getConfig();
      let preview = '';
      const generate = () => { const t = generateLorem(500, loremStartWithClassic); if (!preview) { preview = t; } return t; };
      const ok = await insertTextAtCursor(generate);
      if (ok) { showInsertNotification('Lorem Ipsum (500 words)', preview); }
    })
  );

  // 9. Insert custom word count of Lorem Ipsum
  context.subscriptions.push(
    vscode.commands.registerCommand('insert-utilities.insertLoremCustom', async () => {
      const input = await vscode.window.showInputBox({
        prompt: 'How many words of Lorem Ipsum?',
        placeHolder: 'Enter word count (e.g., 200)',
        validateInput: (value) => {
          const n = parseInt(value, 10);
          if (isNaN(n) || n < 1)  { return 'Please enter a number greater than 0.'; }
          if (n > 5000)           { return 'Maximum is 5000 words.'; }
          return null; // Valid
        }
      });

      if (input === undefined) { return; } // User cancelled

      const count = parseInt(input, 10);
      const { loremStartWithClassic } = getConfig();
      let preview = '';
      const generate = () => { const t = generateLorem(count, loremStartWithClassic); if (!preview) { preview = t; } return t; };
      const ok = await insertTextAtCursor(generate);
      if (ok) { showInsertNotification(`Lorem Ipsum (${count} words)`, preview); }
    })
  );

  // ─────────────────────────────────────────────
  // TIMESTAMP COMMANDS
  // ─────────────────────────────────────────────

  // 10. Insert timestamp using the format from settings
  context.subscriptions.push(
    vscode.commands.registerCommand('insert-utilities.insertTimestamp', async () => {
      const { timestampFormat } = getConfig();
      const text = generateTimestamp(timestampFormat);
      const ok = await insertTextAtCursor(text);
      if (ok) { showInsertNotification('Timestamp', text); }
    })
  );

  // 11. Insert ISO 8601 timestamp (always ISO, regardless of settings)
  context.subscriptions.push(
    vscode.commands.registerCommand('insert-utilities.insertTimestampISO', async () => {
      const text = generateTimestamp('YYYY-MM-DDTHH:mm:ssZ');
      const ok = await insertTextAtCursor(text);
      if (ok) { showInsertNotification('ISO Timestamp', text); }
    })
  );

  // ─────────────────────────────────────────────
  // RANDOM STRING COMMAND
  // ─────────────────────────────────────────────

  // 12. Insert random string — lets user pick type via Quick Pick
  context.subscriptions.push(
    vscode.commands.registerCommand('insert-utilities.insertRandomString', async () => {
      const { randomStringCharset } = getConfig();

      // Map charset setting to a descriptive label prefix shown as "recommended"
      const charsetLabel: Record<string, string> = {
        alphanumeric: 'Random String',
        alphabetic:   'Random String',
        numeric:      'Random Number',
        hex:          'Random Hex'
      };
      const preferred = charsetLabel[randomStringCharset] ?? 'Random String';

      const items: vscode.QuickPickItem[] = [
        { label: 'Random String (16 chars)',  detail: 'Alphanumeric — e.g. aB3xK9mZpQ2rLw7Y' },
        { label: 'Random String (32 chars)',  detail: 'Alphanumeric — 32 character string' },
        { label: 'Random String (64 chars)',  detail: 'Alphanumeric — 64 character string' },
        { label: 'Random Hex (16 chars)',     detail: 'Hexadecimal  — e.g. 3f9a2b1c4e8d07a5' },
        { label: 'Random Hex (32 chars)',     detail: 'Hexadecimal  — 32 hex character string' },
        { label: 'Random Number (6 digits)',  detail: 'Numeric only — e.g. 482930' },
        { label: 'Random Number (10 digits)', detail: 'Numeric only — e.g. 7391028456' }
      ];

      const selected = await vscode.window.showQuickPick(items, {
        placeHolder: `Select the type of random string to insert (default charset: ${randomStringCharset})`,
        matchOnDetail: true
      });

      if (!selected) { return; } // User cancelled

      // Generator is defined per selection so each cursor gets a unique value
      let generate: () => string;
      let label: string;

      switch (selected.label) {
        case 'Random String (16 chars)':
          generate = () => generateRandomString(16, randomStringCharset === 'alphabetic' ? 'alphabetic' : 'alphanumeric');
          label = 'Random String (16)';
          break;
        case 'Random String (32 chars)':
          generate = () => generateRandomString(32, randomStringCharset === 'alphabetic' ? 'alphabetic' : 'alphanumeric');
          label = 'Random String (32)';
          break;
        case 'Random String (64 chars)':
          generate = () => generateRandomString(64, randomStringCharset === 'alphabetic' ? 'alphabetic' : 'alphanumeric');
          label = 'Random String (64)';
          break;
        case 'Random Hex (16 chars)':
          generate = () => generateRandomString(16, 'hex');
          label = 'Random Hex (16)';
          break;
        case 'Random Hex (32 chars)':
          generate = () => generateRandomString(32, 'hex');
          label = 'Random Hex (32)';
          break;
        case 'Random Number (6 digits)':
          generate = () => generateRandomNumber(6);
          label = 'Random Number (6)';
          break;
        case 'Random Number (10 digits)':
          generate = () => generateRandomNumber(10);
          label = 'Random Number (10)';
          break;
        default:
          generate = () => generateRandomString(16, randomStringCharset);
          label = `${preferred} (16)`;
      }

      let preview = '';
      const wrappedGenerate = () => { const t = generate(); if (!preview) { preview = t; } return t; };
      const ok = await insertTextAtCursor(wrappedGenerate);
      if (ok) { showInsertNotification(label, preview); }
    })
  );
}

/**
 * Extension deactivation hook.
 * VS Code calls this when the extension is unloaded.
 */
export function deactivate(): void {
  console.log('[Insert Utilities] Extension deactivated.');
}
