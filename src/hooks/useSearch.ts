import { useMemo } from 'react';
import { useDocuments } from './useDocuments';
import { useCustomers } from './useCustomers';
import type { DocumentResponse } from '@/types/document.types';
import type { Customer } from '@/types/customer.types';

export interface SearchResult {
  id: string;
  title: string;
  subtitle: string;
  type: 'document' | 'customer';
  data: DocumentResponse | Customer;
}

export const useSearch = (query: string) => {
  const { data: documents = [], isLoading: isLoadingDocs } = useDocuments();
  const { data: customers = [], isLoading: isLoadingCustomers } = useCustomers();

  const searchResults = useMemo(() => {
    if (!query || query.trim().length < 2) {
      return [];
    }

    const results: SearchResult[] = [];
    const searchTerm = query.toLowerCase().trim();

    // Search through documents
    documents.forEach((doc) => {
      const matchFields = [
        doc.documentTitle,
        doc.documentNo,
        doc.customerName,
        doc.documentType,
        doc.documentAuthor,
        doc.status,
        doc.transactionInfo.state,
      ].join(' ').toLowerCase();

      if (matchFields.includes(searchTerm)) {
        results.push({
          id: `doc-${doc.id}`,
          title: doc.documentTitle,
          subtitle: `${doc.documentType.replace(/_/g, ' ')} • ${doc.customerName} • ${doc.documentNo}`,
          type: 'document',
          data: doc,
        });
      }
    });

    // Search through customers
    customers.forEach((customer) => {
      const matchFields = [
        customer.companyName,
        customer.contactPerson,
        customer.email,
        customer.registrationNumber,
        customer.address,
        customer.phone.toString(),
      ].join(' ').toLowerCase();

      if (matchFields.includes(searchTerm)) {
        results.push({
          id: `customer-${customer.id}`,
          title: customer.companyName,
          subtitle: `${customer.contactPerson} • ${customer.email} • ${customer.registrationNumber}`,
          type: 'customer',
          data: customer,
        });
      }
    });

    return results.slice(0, 10); // Limit to 10 results
  }, [query, documents, customers]);

  const hasQuery = query.trim().length >= 2;
  const isCurrentlySearching = hasQuery && (isLoadingDocs || isLoadingCustomers);

  return {
    searchResults,
    isSearching: isCurrentlySearching,
    hasQuery,
  };
};