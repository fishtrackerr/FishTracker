export interface ProfileDocument {
  id: string;
  type: string;
  title: string;
  description?: string;
  issueDate?: string;
  expiryDate?: string;
  imageIds: string[];
  createdAt: string;
  updatedAt: string;
}
