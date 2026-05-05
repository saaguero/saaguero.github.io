#!/usr/bin/env node
// generate-resume-html.mjs — pure Node.js (no npm), reads data/resume.json,
// writes an ATS-friendly HTML to stdout (or a file if path given as $1).

import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const outPath = process.argv[2] ?? null;

const resume = JSON.parse(readFileSync(resolve(ROOT, "data", "resume.json"), "utf8"));
const b = resume.basics ?? {};
const loc = b.location ?? {};

// ——— helpers ———
const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
function fmtDate(s) {
  if (!s) return "";
  const [y, mo] = s.split("-").map(Number);
  return `${MONTHS[mo - 1]} ${y}`;
}
function range(s, e) { return `${fmtDate(s)} — ${e ? fmtDate(e) : "Present"}`; }
function esc(s) {
  return String(s ?? "")
    .replace(/&/g, "&amp;").replace(/</g, "&lt;")
    .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

// ——— contact row ———
const contactParts = [];
if (b.email) contactParts.push(`<a href="mailto:${esc(b.email)}">${esc(b.email)}</a>`);
if (b.url) contactParts.push(`<a href="${esc(b.url)}">${esc(b.url.replace(/^https?:\/\//, ""))}</a>`);

// ——— sections ———
function workSection(items) {
  if (!items?.length) return "";
  return `<section class="s">
  <h2>Experience</h2>
  ${items.map(w => `<div class="entry">
    <div class="eh">
      <span class="etitle">${esc(w.position)}${w.name ? ` @ ${esc(w.name)}` : ""}</span>
      <span class="edates">${range(w.startDate, w.endDate)}</span>
    </div>
    ${w.highlights?.length ? `<ul>${w.highlights.map(h => `<li>${esc(h)}</li>`).join("")}</ul>` : ""}
  </div>`).join("")}
</section>`;
}

function skillsSection(items, languages) {
  if (!items?.length) return "";
  const langLine = languages?.length
    ? `<div class="skill-row"><span class="sname">Languages:</span> <span class="skws">${languages.map(l => `${esc(l.language)} (${esc(l.fluency)})`).join(", ")}</span></div>`
    : "";
  return `<section class="s">
  <h2>Skills</h2>
  <div class="skills">
    ${items.map(s => `<div class="skill-row">
      <span class="sname">${esc(s.name)}:</span>
      <span class="skws">${(s.keywords ?? []).map(esc).join(", ")}</span>
    </div>`).join("")}
    ${langLine}
  </div>
</section>`;
}

function educationSection(items) {
  if (!items?.length) return "";
  return `<section class="s">
  <h2>Education</h2>
  ${items.map(e => `<div class="entry">
    <div class="eh">
      <span class="etitle">${esc(e.studyType)}${e.area ? ` — ${esc(e.area)}` : ""}${e.institution ? ` @ ${esc(e.institution)}` : ""}</span>
      <span class="edates">${e.startDate ? e.startDate.slice(0,4) : ""}${e.endDate ? ` — ${e.endDate.slice(0,4)}` : ""}</span>
    </div>
    ${e.score ? `<div class="esub">${esc(e.score)}</div>` : ""}
  </div>`).join("")}
</section>`;
}

function languagesSection(items) {
  if (!items?.length) return "";
  const langs = items.map(l => `${esc(l.language)} (${esc(l.fluency)})`).join(" &nbsp;&middot;&nbsp; ");
  return `<section class="s"><h2>Languages</h2><p class="langs">${langs}</p></section>`;
}

// ——— full HTML ———
const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { background: #fff; color: #000; }
  body {
    font-family: "Palatino Linotype", "Book Antiqua", Palatino, "Georgia", serif;
    font-size: 9.2pt;
    line-height: 1.22;
    padding: 0;
  }

  @page { size: Letter; margin: 14mm 18mm; }

  /* ——— Header ——— */
  .header { margin-bottom: 8pt; }
  .header h1 {
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: baseline;
    column-gap: 10pt;
    font-size: 20pt;
    font-weight: bold;
    letter-spacing: 0.03em;
  }
  .header .name { justify-self: start; }
  .header .headline { font-size: 11pt; font-weight: normal; color: #222; white-space: nowrap; justify-self: end; }
  .header .contact {
    font-size: 8pt;
    font-weight: normal;
    letter-spacing: 0;
    text-align: left;
    margin-top: 2pt;
  }
  .header .contact a { color: #1f4e79; text-decoration: none; border-bottom: 0.4pt solid rgba(31, 78, 121, 0.4); }
  .header .contact .sep { color: #888; margin: 0 5pt; }

  /* ——— Sections ——— */
  .s { margin-top: 9pt; }
  .s h2 {
    font-size: 10.8pt;
    font-weight: bold;
    border-bottom: 0.75pt solid #000;
    padding-bottom: 2pt;
    margin-bottom: 6pt;
  }

  /* ——— Work entry ——— */
  .entry { margin-bottom: 7pt; page-break-inside: avoid; }
  .entry:last-child { margin-bottom: 0; }
  .eh {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 8pt;
  }
  .etitle { font-weight: bold; font-size: 9.6pt; }
  .edates { font-style: italic; font-size: 8.8pt; white-space: nowrap; flex-shrink: 0; }
  .esub { font-size: 8.8pt; color: #444; margin-top: 1pt; }

  ul { margin-top: 3pt; padding-left: 13pt; list-style: disc; }
  li { font-size: 8.6pt; margin-bottom: 0.9pt; line-height: 1.18; }

  /* ——— Skills ——— */
  .skills { font-size: 8.7pt; }
  .skill-row { margin-bottom: 1.6pt; }
  .sname { font-weight: bold; }
  .skws { color: #333; }

  /* ——— Languages ——— */
  .langs { font-size: 8.9pt; }
</style>
</head>
<body>

<header class="header">
  <h1>
    <span class="name">${esc(b.name)}</span>
    ${b.label ? `<span class="headline">${esc(b.label)}</span>` : ""}
  </h1>
  <div class="contact">${contactParts.join('<span class="sep">&middot;</span>')}</div>
</header>

${workSection(resume.work)}
${skillsSection(resume.skills, resume.languages)}
${educationSection(resume.education)}

</body>
</html>`;

if (outPath) {
  writeFileSync(outPath, html, "utf8");
  console.error(`→ HTML written to ${outPath}`);
} else {
  process.stdout.write(html);
}
