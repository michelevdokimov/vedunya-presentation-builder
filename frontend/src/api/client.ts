import type { Presentation } from '../types';
import { metadata as vedunyaMetadata } from '../presentations/vedunya-product';

// Static presentations data - no backend required
const PRESENTATIONS: Presentation[] = [
  {
    id: vedunyaMetadata.id,
    title: vedunyaMetadata.title,
    description: vedunyaMetadata.description,
    slideCount: vedunyaMetadata.slideCount,
    createdAt: vedunyaMetadata.createdAt,
    updatedAt: vedunyaMetadata.updatedAt,
  },
];

class ApiClient {
  async fetchPresentations(): Promise<Presentation[]> {
    // Return static data instead of API call
    return Promise.resolve(PRESENTATIONS);
  }

  async fetchPresentation(id: string): Promise<Presentation> {
    const presentation = PRESENTATIONS.find(p => p.id === id);
    if (!presentation) {
      throw new Error(`Presentation '${id}' not found`);
    }
    return Promise.resolve(presentation);
  }
}

export const apiClient = new ApiClient();
