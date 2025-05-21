export interface Metadata<T extends string = string> {
  accessor: T;
  label: string;
  description: string;
  imageUrl: string;
}
