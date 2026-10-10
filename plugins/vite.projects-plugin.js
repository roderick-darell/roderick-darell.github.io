import { readFileSync, existsSync } from 'fs';
import { resolve } from 'path';
import { sanitizeHTML, sanitizeURL } from '../utils/sanitize.js';
import { getProjectTypeIcon, getProjectCategory, isPlaceholderImage } from '../utils/project-icons.js';

export default function projectsPlugin() {
  return {
    name: 'inject-projects',
    transformIndexHtml(html) {
      try {
        const projectsPath = resolve(process.cwd(), 'public/api/projects.json');

        if (!existsSync(projectsPath)) {
          console.warn('Projects JSON not found at:', projectsPath);
          return html;
        }

        const projectsData = JSON.parse(readFileSync(projectsPath, 'utf-8'));

        if (projectsData.length === 0) return html;

        // Filter out hidden projects (only show projects where hidden is false or doesn't exist)
        const visibleProjects = projectsData.filter(project => project.hidden !== true);

        if (visibleProjects.length === 0) return html;

        // Generate HTML for projects grid
        const projectsHTML = visibleProjects
          .map((project, index) => {
            const typeIcon = getProjectTypeIcon(project.type);

            const projectIcon = !isPlaceholderImage(project.icon)
              ? `<img src="${project.icon}" alt="${project.title} icon" class="project-icon">`
              : `<i class="fas ${typeIcon}" aria-hidden="true"></i>`;

            // Capitalize project type for tooltip
            const capitalizedType = project.type ? project.type.charAt(0).toUpperCase() + project.type.slice(1).toLowerCase() : '';
            
            const category = getProjectCategory(project.type);
            const statusBadge = project.status
              ? `<span class="project-badge project-badge-status">${sanitizeHTML(project.status)}</span>`
              : '';

            return `                    <article class="project-card" data-project="${index}" data-category="${category.key}" role="listitem">
                      <div class="project-card-overlay"></div>
                      <div class="project-type-icon project-type-${project.type} tooltip-container">
                          <i class="fas ${typeIcon}" aria-label="${project.type} project type" aria-hidden="true"></i>
                          <div class="tooltip tooltip-left" aria-hidden="true">${capitalizedType}</div>
                      </div>
                      <div class="project-header">
                          ${projectIcon}
                          <h3>${project.title}</h3>
                      </div>
                      <div class="project-badges">
                          <span class="project-badge project-badge-${category.key}">${category.label}</span>
                          ${statusBadge}
                      </div>
                      ${project.date ? `<span class="project-date">${sanitizeHTML(project.date)}</span>` : ''}
                      <p>${project.description}</p>
                      <div class="project-links">
                          ${project.links && project.links.length > 0
                            ? `<a href="${sanitizeURL(project.links[0].url)}" target="_blank" class="project-link" rel="noopener noreferrer">${sanitizeHTML(project.links[0].text)}</a>`
                            : ''}
                      </div>
                  </article>`;
          })
          .join('\n');

        const dataCount = visibleProjects.filter((p) => getProjectCategory(p.type).key === 'data').length;
        const otherCount = visibleProjects.length - dataCount;
        // Filtres en CSS pur (boutons radio + :has), ils marchent même si le JavaScript échoue
        const filtersHTML = `<div class="project-filters" role="radiogroup" aria-label="Filtrer les projets">
                    <input type="radio" name="project-filter" id="project-filter-all" class="project-filter-input" checked>
                    <label for="project-filter-all" class="project-filter">Tous (${visibleProjects.length})</label>
                    <input type="radio" name="project-filter" id="project-filter-data" class="project-filter-input">
                    <label for="project-filter-data" class="project-filter">Projets Data (${dataCount})</label>
                    <input type="radio" name="project-filter" id="project-filter-autre" class="project-filter-input">
                    <label for="project-filter-autre" class="project-filter">Autres projets (${otherCount})</label>
                </div>`;

        return html.replace(/{{PROJECT_FILTERS}}/, filtersHTML).replace(/{{PROJECTS}}/, projectsHTML);
      } catch (error) {
        console.error('Error in projects plugin:', error);
        return html;
      }
    },
  };
}
