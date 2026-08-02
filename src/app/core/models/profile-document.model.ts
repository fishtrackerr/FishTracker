export interface ProfileDocument {
  id: string;
  type: string;
  title: string;
  description?: string;
  issueDate?: string;
  expiryDate?: string;
  imageIds: string[];
  /** Soft-delete: false hides from UI; omit/true = visible. */
  visible?: boolean;
  createdAt: string;
  updatedAt: string;
}
