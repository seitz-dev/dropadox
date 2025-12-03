import path from "path";

/**
 * Parses a path string (with UUID-based file name) and returns the file name without the UUID
 * @param filePath The filepath
 * @returns The filename
 */
export function getFileName(filePath: string): string {
  // get the platform-correct filename ("123.uuid.txt")
  const base = path.basename(filePath);

  // find the FIRST dot, which separates UUID from real name
  const firstDot = base.indexOf(".");

  // if no dot found, return as-is, if there's only one dot
  if (firstDot === base.lastIndexOf(".")) {
    return base; // no uuid found, return as-is
  }

  return base.substring(firstDot + 1);
}