/**
 * Project Type Icons Utility
 * Returns the appropriate Font Awesome icon class for a given project type
 * @param {string} projectType - The project type (dev, film, music, community, etc.)
 * @returns {string} The Font Awesome icon class name (e.g., 'fa-code', 'fa-users')
 */
export function getProjectTypeIcon(projectType) {
  switch (projectType) {
    case 'data':
      return 'fa-database';
    case 'dev':
      return 'fa-code';
    case 'pro':
      return 'fa-briefcase';
    case 'film':
      return 'fa-video';
    case 'music':
      return 'fa-music';
    case 'community':
      return 'fa-users';
    default:
      return 'fa-folder';
  }
}


/**
 * Category used for the visible tag and the filter buttons.
 * Every "data" project is tagged "Projet Data", everything else "Autre projet".
 * @param {string} projectType
 * @returns {{key: string, label: string}}
 */
export function getProjectCategory(projectType) {
  return projectType === 'data'
    ? { key: 'data', label: 'Projet Data' }
    : { key: 'autre', label: 'Autre projet' };
}

/**
 * True when an image path is still a placeholder (YYYY) or empty.
 * Lets the site fall back to the type icon instead of a broken image.
 * @param {string} path
 * @returns {boolean}
 */
export function isPlaceholderImage(path) {
  return !path || String(path).includes('YYYY');
}
