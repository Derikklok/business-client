export type DocumentType =
  | "invoice"
  | "estimate"
  | "purchase_order"
  | "rental_proposal";

export type DocumentStatus = "draft" | "completed";

export type PaymentState = "paid" | "unpaid";

export interface TransactionInfo {
  state: PaymentState;
  paidDate?: string;
}

export interface SignatureInfo {
  createdBy: string;
  designation: string;
}

export interface CreateDocumentRequest {
  customerId: string;
  documentType: DocumentType;
  mentionedDate: string;
  documentTitle: string;
  specialNotes?: string;
  termsAndConditions?: string;
  signature: SignatureInfo;
  status: DocumentStatus;
  transactionInfo: TransactionInfo;
  documentAuthor: string;
}

export interface UpdateDocumentRequest {
  documentTitle?: string;
  specialNotes?: string;
  termsAndConditions?: string;
  signature?: SignatureInfo;
  status?: DocumentStatus;
  transactionInfo?: TransactionInfo;
}

export interface DocumentResponse {
  id: string;
  customerId: string;
  customerName: string;
  documentType: DocumentType;
  documentNo: string;
  mentionedDate: string;
  createdDate: string;
  documentTitle: string;
  specialNotes?: string;
  termsAndConditions?: string;
  signature: SignatureInfo;
  status: DocumentStatus;
  transactionInfo: TransactionInfo;
  documentAuthor: string;
  createdAt: string;
  updatedAt: string;
}
