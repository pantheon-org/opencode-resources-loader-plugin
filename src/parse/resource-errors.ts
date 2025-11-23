// Simple in-memory registry for resource validation errors

type ResourceErrorEntry = {
  path: string;
  errors: unknown[];
  updatedAt: number;
};

const errors = new Map<string, ResourceErrorEntry>();

/**
 * Add or replace resource error entry for a given path
 */
export const addResourceError = (path: string, errs: unknown[]) => {
  errors.set(path, { path, errors: errs, updatedAt: Date.now() });
};

/**
 * Clear errors for a specific path
 */
export const clearResourceError = (path: string) => {
  errors.delete(path);
};

/**
 * Get errors for a specific path
 */
export const getResourceError = (path: string) => {
  return errors.get(path) || null;
};

/**
 * List all resource errors sorted by most recent
 */
export const listResourceErrors = () => {
  return Array.from(errors.values()).sort((a, b) => b.updatedAt - a.updatedAt);
};

/**
 * Clear all errors
 */
export const clearAllResourceErrors = () => {
  errors.clear();
};
