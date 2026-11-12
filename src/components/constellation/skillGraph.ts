/**
 * Builds the constellation's data model from the existing content files.
 * Pure data, computed once at module load: no React, no layout.
 */
import { constellation } from '../../content/constellation';
import { experience } from '../../content/experience';
import { projects } from '../../content/projects';
import { skillGroups } from '../../content/skills';
import type { ProjectLink } from '../../content/types';

export interface Category {
  id: string;
  title: string;
}

export type EvidenceKind = 'experience' | 'project' | 'supporting';

export interface Evidence {
  id: string;
  kind: EvidenceKind;
  name: string;
  context: string;
  /** In-page anchor to the full entry, when it is shown on the page. */
  href?: string;
  links: readonly ProjectLink[];
  summary: string;
  highlights: readonly string[];
  tech: readonly string[];
}

export interface SkillUse {
  evidence: Evidence;
  /** The sentence from that entry that best shows how the skill was used. */
  detail: string;
}

export interface SkillNode {
  id: string;
  name: string;
  description: string;
  /** Primary category: the `skillGroups` entry that lists this skill. */
  category: string;
  /** Primary category first, then any `alsoIn` categories. */
  categories: readonly string[];
  uses: readonly SkillUse[];
  /** Ids of skills used alongside this one, most shared entries first. */
  related: readonly string[];
}

export const categories: readonly Category[] = skillGroups.map(({ id, title }) => ({ id, title }));

const categoryTitles = new Map(categories.map((c) => [c.id, c.title]));

export function categoryTitle(id: string): string {
  return categoryTitles.get(id) ?? id;
}

const RELATED_LIMIT = 6;

function slug(name: string): string {
  return name
    .toLowerCase()
    .replace(/#/g, '-sharp')
    .replace(/\./g, 'dot-')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function escapeRegExp(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/** True when `term` appears in `text` as a whole word (so "SQL" doesn't match "SQLite"). */
function mentions(text: string, term: string): boolean {
  return new RegExp(`(^|[^A-Za-z0-9])${escapeRegExp(term)}(?![A-Za-z0-9])`, 'i').test(text);
}

const evidence: readonly Evidence[] = [
  ...experience.map<Evidence>((item) => ({
    id: `experience-${item.id}`,
    kind: 'experience',
    name: item.organization,
    context: item.title,
    href: `#${item.id}-org`,
    links: [],
    summary: item.summary,
    highlights: item.highlights,
    tech: item.tech,
  })),
  ...projects.map<Evidence>((item) => ({
    id: `project-${item.id}`,
    kind: 'project',
    name: item.name,
    context: 'Featured project',
    href: `#project-${item.id}`,
    links: item.links,
    summary: item.summary,
    highlights: item.highlights,
    tech: item.tech,
  })),
  ...constellation.supportingProjects.map<Evidence>((item) => ({
    id: `supporting-${item.id}`,
    kind: 'supporting',
    name: item.name,
    context: item.context,
    links: item.links,
    summary: item.summary,
    highlights: item.highlights,
    tech: item.tech,
  })),
];

const groupOfSkill = new Map<string, string>();
for (const group of skillGroups) {
  for (const item of group.items) {
    if (!groupOfSkill.has(item)) groupOfSkill.set(item, group.id);
  }
}

interface Draft {
  id: string;
  name: string;
  description: string;
  category: string;
  categories: string[];
  terms: string[];
  uses: SkillUse[];
}

const drafts: Draft[] = [];
for (const skill of constellation.skills) {
  const category = groupOfSkill.get(skill.name);
  if (!category) {
    if (import.meta.env.DEV) {
      console.warn(`[constellation] "${skill.name}" is not listed in skills.ts, so it was skipped.`);
    }
    continue;
  }
  const terms = [skill.name, ...(skill.evidenceAliases ?? [])];
  const lowerTerms = terms.map((t) => t.toLowerCase());

  const uses = evidence
    .filter((e) => e.tech.some((t) => lowerTerms.includes(t.toLowerCase())))
    .map<SkillUse>((e) => ({
      evidence: e,
      detail:
        e.highlights.find((h) => terms.some((t) => mentions(h, t))) ?? e.summary,
    }));

  if (uses.length === 0 && import.meta.env.DEV) {
    console.warn(`[constellation] "${skill.name}" has no matching experience or project.`);
  }

  drafts.push({
    id: slug(skill.name),
    name: skill.name,
    description: skill.description,
    category,
    categories: [category, ...(skill.alsoIn ?? []).filter((id) => id !== category)],
    terms,
    uses,
  });
}

// Skills that appear in the same experience or project are "related".
const skillsInEvidence = new Map<string, string[]>();
for (const draft of drafts) {
  for (const use of draft.uses) {
    const list = skillsInEvidence.get(use.evidence.id) ?? [];
    list.push(draft.id);
    skillsInEvidence.set(use.evidence.id, list);
  }
}

const order = new Map(drafts.map((d, index) => [d.id, index]));

export const skillNodes: readonly SkillNode[] = drafts.map((draft) => {
  const counts = new Map<string, number>();
  for (const use of draft.uses) {
    for (const other of skillsInEvidence.get(use.evidence.id) ?? []) {
      if (other !== draft.id) counts.set(other, (counts.get(other) ?? 0) + 1);
    }
  }
  const related = [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || order.get(a[0])! - order.get(b[0])!)
    .slice(0, RELATED_LIMIT)
    .map(([id]) => id);

  return {
    id: draft.id,
    name: draft.name,
    description: draft.description,
    category: draft.category,
    categories: draft.categories,
    uses: draft.uses,
    related,
  };
});

export const skillById: ReadonlyMap<string, SkillNode> = new Map(skillNodes.map((n) => [n.id, n]));

export function inCategory(node: SkillNode, categoryId: string | null): boolean {
  return categoryId === null || node.categories.includes(categoryId);
}
