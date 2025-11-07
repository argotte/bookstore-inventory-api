import { CreateCategoryDto } from '../../categories/dto/create-category.dto';

export const SEED_CATEGORIES: CreateCategoryDto[] = [
  {
    name: 'Programming',
    description:
      'Books about programming, software development, and computer science',
  },
  {
    name: 'Science Fiction',
    description: 'Science fiction novels and stories',
  },
  {
    name: 'Business',
    description: 'Business, management, and entrepreneurship books',
  },
  {
    name: 'Self-Help',
    description: 'Personal development and self-improvement books',
  },
  {
    name: 'Technology',
    description: 'Books about technology, AI, and innovation',
  },
  {
    name: 'History',
    description: 'Historical books and biographies',
  },
  {
    name: 'Philosophy',
    description: 'Philosophy and critical thinking books',
  },
];
