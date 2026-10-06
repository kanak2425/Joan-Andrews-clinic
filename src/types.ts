export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  benefits: string[];
  duration: string;
  recommendedFor: string;
}

export interface ReviewItem {
  id: string;
  quote: string;
  author: string;
  context: string;
  rating: number;
  date: string;
}

export interface AppointmentFormData {
  fullName: string;
  phone: string;
  email: string;
  serviceId: string;
  preferredTime: string;
  notes: string;
}
