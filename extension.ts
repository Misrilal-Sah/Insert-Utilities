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
  context.subscriptions.push(
    vscode.commands.registerCommand('insert-utilities.insertUUID', async () => {
      const { uuidFormat, uuidIncludeDashes } = getConfig();
      let text = generateUUID();
      if (uuidFormat === 'uppercase')  { text = text.toUpperCase(); }
      if (!uuidIncludeDashes)           { text = text.replace(/-/g, ''); }
      const ok = await insertTextAtCursor(text);
      if (ok) { showInsertNotification('UUID v4', text); }
    })
  );

  // 2. Insert UUID v4 (UPPERCASE with dashes)
  context.subscriptions.push(
    vscode.commands.registerCommand('insert-utilities.insertUUIDUppercase', async () => {
      const text = generateUUIDUppercase();
      const ok = await insertTextAtCursor(text);
      if (ok) { showInsertNotification('UUID v4 (Uppercase)', text); }
    })
  );

  // 3. Insert UUID v4 (no dashes)
  context.subscriptions.push(
    vscode.commands.registerCommand('insert-utilities.insertUUIDNoDashes', async () => {
      const text = generateUUIDNoDashes();
      const ok = await insertTextAtCursor(text);
      if (ok) { showInsertNotification('UUID v4 (No Dashes)', text); }
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
      const text = generateMultipleUUIDs(count);
      const ok = await insertTextAtCursor(text);
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

  // 6. Insert ~50 words of Lorem Ipsum
  context.subscriptions.push(
    vscode.commands.registerCommand('insert-utilities.insertLoremShort', async () => {
      const { loremStartWithClassic } = getConfig();
      const text = generateLorem(50, loremStartWithClassic);
      const ok = await insertTextAtCursor(text);
      if (ok) { showInsertNotification('Lorem Ipsum (50 words)', text); }
    })
  );

  // 7. Insert ~150 words of Lorem Ipsum
  context.subscriptions.push(
    vscode.commands.registerCommand('insert-utilities.insertLoremMedium', async () => {
      const { loremStartWithClassic } = getConfig();
      const text = generateLorem(150, loremStartWithClassic);
      const ok = await insertTextAtCursor(text);
      if (ok) { showInsertNotification('Lorem Ipsum (150 words)', text); }
    })
  );

  // 8. Insert ~500 words of Lorem Ipsum
  context.subscriptions.push(
    vscode.commands.registerCommand('insert-utilities.insertLoremLong', async () => {
      const { loremStartWithClassic } = getConfig();
      const text = generateLorem(500, loremStartWithClassic);
      const ok = await insertTextAtCursor(text);
      if (ok) { showInsertNotification('Lorem Ipsum (500 words)', text); }
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
      const text = generateLorem(count, loremStartWithClassic);
      const ok = await insertTextAtCursor(text);
      if (ok) { showInsertNotification(`Lorem Ipsum (${count} words)`, text); }
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

      let text: string;
      let label: string;

      switch (selected.label) {
        case 'Random String (16 chars)':
          text  = generateRandomString(16, randomStringCharset === 'alphabetic' ? 'alphabetic' : 'alphanumeric');
          label = 'Random String (16)';
          break;
        case 'Random String (32 chars)':
          text  = generateRandomString(32, randomStringCharset === 'alphabetic' ? 'alphabetic' : 'alphanumeric');
          label = 'Random String (32)';
          break;
        case 'Random String (64 chars)':
          text  = generateRandomString(64, randomStringCharset === 'alphabetic' ? 'alphabetic' : 'alphanumeric');
          label = 'Random String (64)';
          break;
        case 'Random Hex (16 chars)':
          text  = generateRandomString(16, 'hex');
          label = 'Random Hex (16)';
          break;
        case 'Random Hex (32 chars)':
          text  = generateRandomString(32, 'hex');
          label = 'Random Hex (32)';
          break;
        case 'Random Number (6 digits)':
          text  = generateRandomNumber(6);
          label = 'Random Number (6)';
          break;
        case 'Random Number (10 digits)':
          text  = generateRandomNumber(10);
          label = 'Random Number (10)';
          break;
        default:
          text  = generateRandomString(16, randomStringCharset);
          label = `${preferred} (16)`;
      }

      const ok = await insertTextAtCursor(text);
      if (ok) { showInsertNotification(label, text); }
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
