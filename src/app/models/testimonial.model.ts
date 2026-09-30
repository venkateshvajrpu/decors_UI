export type Rating = 1 | 2 | 3 | 4 | 5;

export interface Testimonial {
  name: string;
  event: string;
  location: string;
  quote: string;
  rating: Rating;
}
