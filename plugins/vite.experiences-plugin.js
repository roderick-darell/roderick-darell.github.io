import { readFileSync, existsSync } from "fs";
import { resolve } from "path";
import { sanitizeHTML } from "../utils/sanitize.js";

export default function experiencesPlugin() {
  return {
    name: "inject-experiences",
    transformIndexHtml(html) {
      try {
        const experiencesPath = resolve(process.cwd(), "public/api/experiences.json");

        if (!existsSync(experiencesPath)) {
          console.warn("Experiences JSON not found at:", experiencesPath);
          return html;
        }

        const data = JSON.parse(readFileSync(experiencesPath, "utf-8"));
        if (!Array.isArray(data) || data.length === 0) return html;

        const format = (v) => {
          if (!v) return "";
          if (v === "present") return "Present";
          const [y, m] = v.split("-");
          const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
          return `${months[Number(m) - 1]} ${y}`;
        };

        const experiencesHTML = data
          .map((e) => {
            const dateRange = `${format(e.start)} — ${format(e.end)}`;
            const bullets = (e.bullets || []).map((b) => `<li>${sanitizeHTML(b)}</li>`).join("");
            const tags = (e.tags || []).map((t) => `<span class="exp-tag">${sanitizeHTML(t)}</span>`).join("");

            const iconClass = e.icon ? sanitizeHTML(e.icon) : "fa-briefcase";

            return `
<article class="experience-item" role="listitem">
  <div class="experience-marker" aria-hidden="true">
    <i class="fas ${iconClass}"></i>
  </div>

  <div class="experience-card">
    <div class="experience-top">
      <div class="experience-title">
        <h3>${sanitizeHTML(e.title)}</h3>
        <p class="experience-meta"><strong>${sanitizeHTML(e.company)}</strong> • ${sanitizeHTML(e.location || "")}</p>
      </div>
      <div class="experience-dates">${sanitizeHTML(dateRange)}</div>
    </div>

    <ul class="experience-bullets">${bullets}</ul>
    <div class="experience-tags">${tags}</div>
  </div>
</article>
            `.trim();
          })
          .join("\n");

        return html.replace(/{{EXPERIENCES}}/g, experiencesHTML);
      } catch (err) {
        console.error("Error in experiences plugin:", err);
        return html;
      }
    }
  };
}
