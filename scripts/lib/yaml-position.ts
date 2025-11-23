import YAML from 'yaml';

/**
 * Map a YAML path (array of keys/indices) to a 1-based line+col position within the provided frontmatter text.
 * Returns null when the position can't be determined.
 */
export function findYamlPosition(
  frontmatterText: string,
  pathArr: string[],
): { line: number; col: number } | null {
  try {
    const doc = YAML.parseDocument(frontmatterText);
    let node: any = doc.contents;

    for (const seg of pathArr) {
      if (!node) return null;
      // YAML.Collection types have items; node.type may vary
      if (node.items && Array.isArray(node.items)) {
        // Could be MAP or SEQ
        if (
          node.type === 'MAP' ||
          (node.toJSON &&
            typeof node.toJSON === 'function' &&
            typeof node.items[0]?.key !== 'undefined')
        ) {
          // Map: find pair with matching key
          const pair = node.items.find((p: any) => {
            const key = p.key;
            const keyStr = key && (key.value ?? (key.toString && key.toString()));
            return String(keyStr) === String(seg);
          });
          if (!pair) return null;
          node = pair.value;
        } else if (node.type === 'SEQ' || typeof Number(seg) === 'number') {
          const idx = Number(seg);
          if (!Number.isFinite(idx)) return null;
          node = node.items[idx];
        } else {
          return null;
        }
      } else if (node && node.items === undefined && node.type === 'MAP') {
        // fallback
        const pair = node.items?.find((p: any) => p.key && p.key.value === seg);
        if (!pair) return null;
        node = pair.value;
      } else {
        return null;
      }
    }

    if (!node) return null;

    // Obtain start offset from range or cstNode
    let start: number | null = null;
    if (node.range && Array.isArray(node.range)) {
      start = node.range[0];
    } else if (node.cstNode && node.cstNode.range && Array.isArray(node.cstNode.range)) {
      start = node.cstNode.range[0];
    } else if (node.cstNode && typeof node.cstNode.offset === 'number') {
      start = node.cstNode.offset;
    }

    if (start == null) return null;

    const before = frontmatterText.slice(0, start);
    const lines = before.split('\n');
    const line = lines.length;
    const col = lines[lines.length - 1].length + 1;
    return { line, col };
  } catch (err) {
    return null;
  }
}
