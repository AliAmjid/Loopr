export interface Breadcrumb {
  label: string;
  href?: string;
}

export type Breadcrumbs = Breadcrumb[];

export interface BreadcrumbsProps {
  breadcrumbs: Breadcrumbs;
}
