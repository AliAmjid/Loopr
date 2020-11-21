export interface HasAccessProps {
  requiredResources: string[][];
  role?: { resources?: ({ name: string } | undefined | null)[] | null } | null;
}
