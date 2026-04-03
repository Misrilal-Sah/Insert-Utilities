import * as vscode from 'vscode';

/**
 * Inserts text at all cursor positions in the active editor.
 * Accepts either a plain string (same value at every cursor) or a generator
 * function that is called **once per cursor** so each cursor gets a unique value.
 * If a selection is active, it replaces the selected text.
 *
 * @param textOrGenerator - A string, or a () => string factory called per cursor
 * @returns true if the insert was successful, false otherwise
 */
export async function insertTextAtCursor(textOrGenerator: string | (() => string)): Promise<boolean> {
  const editor = vscode.window.activeTextEditor;

  if (!editor) {
    vscode.window.showErrorMessage('Insert Utilities: No active editor found.');
    return false;
  }

  const success = await editor.edit((editBuilder) => {
    for (const selection of editor.selections) {
      // Call the generator fresh for every cursor so each gets a unique value
      const text = typeof textOrGenerator === 'function' ? textOrGenerator() : textOrGenerator;
      if (selection.isEmpty) {
        // No selection — insert at cursor position
        editBuilder.insert(selection.active, text);
      } else {
        // Text is selected — replace with the new text
        editBuilder.replace(selection, text);
      }
    }
  });

  return success;
}

/**
 * Shows an information notification after a successful insert.
 * Respects the `insertUtilities.showNotification` setting.
 * Also briefly shows a status bar message.
 *
 * @param type - A short label describing what was inserted (e.g. "UUID v4")
 * @param preview - A preview of the inserted text
 */
export function showInsertNotification(type: string, preview: string): void {
  const config = vscode.workspace.getConfiguration('insertUtilities');
  const show = config.get<boolean>('showNotification', true);

  if (!show) {
    return;
  }

  // Truncate preview if it's too long
  const truncated = preview.length > 40
    ? preview.substring(0, 40) + '...'
    : preview;

  vscode.window.showInformationMessage(`Inserted ${type}: ${truncated}`);

  // Show a brief status bar message for 3 seconds
  vscode.window.setStatusBarMessage(`✅ Inserted ${type}`, 3000);
}
