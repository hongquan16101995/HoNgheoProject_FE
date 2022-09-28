interface Transaction {
  id?: number;
  total?: number;
  time?: string;
  description?: string;
  categories?: Category[];
}
