import { dirname, basename, relative, sep } from 'path';
import { ResourceType } from './types';

/**
 * Generate tool name from resource path and type
 * Examples:
 *   .opencode/checklist/api-documentation.md → checklist_api_documentation
 *   .opencode/knowledge-base/jenkins-patterns.md → knowledge_base_jenkins_patterns
 *   .opencode/task/deployment/prod-deploy.md → task_deployment_prod_deploy
 */
export const generateToolName = (
  resourcePath: string,
  baseDir: string,
  type: ResourceType,
): string => {
  const rel = relative(baseDir, resourcePath);
  const dirPath = dirname(rel);
  const fileName = basename(resourcePath, '.md');

  // Get subdirectory structure after the type directory
  const pathParts = dirPath.split(sep);
  const typeIndex = pathParts.findIndex((p) => p === type);
  const subDirs = typeIndex !== -1 ? pathParts.slice(typeIndex + 1).filter((p) => p !== '.') : [];

  // Build tool name: type_subdir_filename
  const typePrefix = type.replace(/-/g, '_');
  const nameParts = [...subDirs, fileName].join('_').replace(/-/g, '_');

  return nameParts ? `${typePrefix}_${nameParts}` : typePrefix;
};
