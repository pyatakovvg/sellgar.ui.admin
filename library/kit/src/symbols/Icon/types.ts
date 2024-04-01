export const icons = [
  'spinner',
  'calendar-days',
  'check',
  'xmark',
  'exclamation',
  'circle-exclamation',
  'lightbulb',
  'chevron-right',
  'chevron-left',
  'chevron-up',
  'chevron-down',
  'circle-chevron-right',
  'circle-chevron-left',
  'circle-chevron-up',
  'circle-chevron-down',
  'signs-post',
  'floppy-disk',
  'stack-overflow',
  'box',
  'shop',
  'users',
  'ellipsis',
  'plus',
  'gear',
  'trash',
  'ban',
] as const;

export type IIcon = (typeof icons)[number];

export const weights = ['solid', 'regular', 'brands'];
export type IWeight = (typeof weights)[number];
