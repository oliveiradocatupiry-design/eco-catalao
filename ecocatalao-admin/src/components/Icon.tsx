import {
  BookOpen,
  Box,
  GlassWater,
  Layers3,
  LayoutDashboard,
  Leaf,
  MapPin,
  Milk,
  Newspaper,
  Recycle,
  Settings,
  Sprout,
  Trash2,
} from "lucide-react";
const icons = {
  dashboard: LayoutDashboard,
  types: Recycle,
  subtypes: Layers3,
  ideas: Sprout,
  education: BookOpen,
  points: MapPin,
  settings: Settings,
  recycle: Recycle,
  bottle: Milk,
  paper: Newspaper,
  metal: Trash2,
  glass: GlassWater,
  box: Box,
  leaf: Leaf,
};
export type IconKey = keyof typeof icons;
export function Icon({ name, size = 20 }: { name: IconKey; size?: number }) {
  const Component = icons[name];
  return <Component size={size} strokeWidth={1.7} aria-hidden="true" />;
}
