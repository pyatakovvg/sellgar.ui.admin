export interface IBreadcrumbRoot {
  isRoot: boolean;
}

export interface IBreadcrumbLabel {
  label: string;
}

export interface IBreadcrumbLink {
  label: string;
  href: string;
}

export type IBreadcrumb = IBreadcrumbRoot | IBreadcrumbLabel | IBreadcrumbLink;
