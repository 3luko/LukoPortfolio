/**
 * Static radial layout for the constellation, in viewBox units.
 *
 * The centre node sits in the middle, category hubs sit on an inner ellipse, and each
 * category's skills fill an angular sector on three staggered outer rings, so neighbouring
 * labels don't collide. Computed once; there is no physics or per-frame work.
 */
import { categories, skillNodes } from './skillGraph';

export const VIEW_WIDTH = 1000;
export const VIEW_HEIGHT = 700;

export interface Point {
  x: number;
  y: number;
}

export interface Edge {
  id: string;
  from: Point;
  to: Point;
  /** Skill id at the outer end; undefined for centre-to-hub spokes. */
  skill?: string;
  /** Category the edge belongs to. */
  category: string;
  secondary?: boolean;
}

export interface GraphLayout {
  center: Point;
  hubs: ReadonlyMap<string, Point>;
  nodes: ReadonlyMap<string, Point>;
  edges: readonly Edge[];
}

const CENTER: Point = { x: VIEW_WIDTH / 2, y: 340 };
const HUB = { rx: 195, ry: 118 };
const RINGS = [
  { rx: 295, ry: 178 },
  { rx: 375, ry: 240 },
  { rx: 455, ry: 302 },
];
/** Empty slots left between neighbouring categories. */
const GAP_SLOTS = 0.9;

function onEllipse(angle: number, rx: number, ry: number): Point {
  return {
    x: Math.round(CENTER.x + rx * Math.cos(angle)),
    y: Math.round(CENTER.y + ry * Math.sin(angle)),
  };
}

function computeLayout(): GraphLayout {
  const groups = categories
    .map((c) => ({ id: c.id, skills: skillNodes.filter((n) => n.category === c.id) }))
    .filter((g) => g.skills.length > 0);

  const totalSlots = groups.reduce((sum, g) => sum + g.skills.length + GAP_SLOTS, 0);
  const slot = (2 * Math.PI) / totalSlots;

  const hubs = new Map<string, Point>();
  const nodes = new Map<string, Point>();

  // Centre the first category at the top of the ellipse.
  let angle = -Math.PI / 2 - ((groups[0]?.skills.length ?? 0) * slot) / 2;

  for (const group of groups) {
    const span = group.skills.length * slot;
    hubs.set(group.id, onEllipse(angle + span / 2, HUB.rx, HUB.ry));
    group.skills.forEach((skill, index) => {
      const ring = RINGS[index % RINGS.length];
      nodes.set(skill.id, onEllipse(angle + (index + 0.5) * slot, ring.rx, ring.ry));
    });
    angle += span + GAP_SLOTS * slot;
  }

  const edges: Edge[] = [];
  for (const [id, hub] of hubs) {
    edges.push({ id: `spoke-${id}`, from: CENTER, to: hub, category: id });
  }
  for (const skill of skillNodes) {
    const point = nodes.get(skill.id)!;
    skill.categories.forEach((categoryId, index) => {
      const hub = hubs.get(categoryId);
      if (!hub) return;
      edges.push({
        id: `link-${categoryId}-${skill.id}`,
        from: hub,
        to: point,
        skill: skill.id,
        category: categoryId,
        secondary: index > 0,
      });
    });
  }

  return { center: CENTER, hubs, nodes, edges };
}

export const layout: GraphLayout = computeLayout();

export function toPercent(point: Point): { left: string; top: string } {
  return {
    left: `${(point.x / VIEW_WIDTH) * 100}%`,
    top: `${(point.y / VIEW_HEIGHT) * 100}%`,
  };
}
