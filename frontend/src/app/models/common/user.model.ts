
export interface ProfileDto {
  email_id: string;
  id: String
  userId?: string;
  user_name: string;
  role?: number;
  first_name?: string
  last_name?: string,
  mobile_number?: number,
  address_line1?: string,
  city?: string,
  street?: string,
  zipcode?: string,
  isPaid: boolean
}


export interface CoordinatorDto {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  mobile: string;
  department: string;
  __v: number;
}

export interface ThemeDto {
  _id: string,
  theme_name: string,
  description: string,
}

export interface VendorDto {
  _id: string;
  vendor_name: string;
  vendor_type: string;
  website: string;
  mobile: string;
  email: string;
  __v: number;
  reviews: any[]; // You can replace 'any' with a specific review interface if available
}

export interface VendorTypesDto {
  vendor_type: string;
  vendors: VendorDto[];
}


export interface EventDto {
  _id: string;
  user_id: string;
  coordinator_id: string;
  wedding_id: string;
  theme_id: string;
  vendor_id: string;
  location: string;
  event_date: string;
  event_type: string;
  guest_count: number;
  vendors: VendorDto[];
  __v: number;
  coordinatorDetails: CoordinatorDto;
  themeDetails: ThemeDto;
}

interface FoodRecommendation {
  food_id: number;
  cuisine_type: string;
  food_name: string;
  description: string;
  cultural_origin: string;
}

interface CulturalTradition {
  tradition_name: string;
  description: string;
  cultural_origin: string;
  religion: string;
}

interface Inspiration {
  _id: string;
  inspiration_type: string;
  title: string;
  description: string;
  __v: number;
}

export interface NewCreatedEventCreatedRecommendationsDto {
  created:boolean;
  message: string;
  food_recommendations: FoodRecommendation[];
  cultural_traditions: CulturalTradition[];
  inspirations: Inspiration[];

}

export interface RazorpayOrder {
  id: string;
  entity: string;
  amount: number;
  amount_paid: number;
  amount_due: number;
  currency: string;
  receipt: string;
  offer_id: string | null;
  status: string;
  attempts: number;
  notes: any[]
  created_at: number;
}

export interface CreateRazorPayVerifyDto {
  razorpay_order_id: string,
  razorpay_payment_id: string,
  razorpay_signature: string
}

export interface EventCreateDto {
  coordinator_id: string;
  theme_id: string;
  vendor_id?: string;
  location: string;
  event_date: string;
  event_type: string;
  guest_count: number;
  bride_first_name: string;
  bride_last_name: string;
  bride_email: string;
  bride_mobile: string;
  bride_nationality: string;
  bride_cultural_origin: string;
  bride_religion: string;
  bride_preferred_language: string;
  groom_first_name: string;
  groom_last_name: string;
  groom_email: string;
  groom_mobile: string;
  groom_nationality: string;
  groom_cultural_origin: string;
  groom_religion: string;
  groom_preferred_language: string;
  vendors: {
    vendor_type: string;
    vendor_id: string;
  }[];
}

export interface CheckListDto {
  _id: string;
  event_id: string;
  user_id: string;
  task_description: string;
  task_status: string;
  task_deadline: string;
  __v: number;
}

export interface CreateCheckListDto {
  event_id: string;
  task_description: string;
  task_status: string;
  task_deadline: string;
}

export interface CreateGuestListDto {
  event_id: string;
  guest_name: string;
  email: string;
  mobile: string;
  rsvp_status: 'Pending' | 'Accepted' | 'Declined';
}


export interface GuestDto {
  _id: string;
  event_id: string;
  guest_name: string;
  email: string;
  mobile: string;
  rsvp_status: 'Pending' | 'Accepted' | 'Declined';
  __v: number;
  isEditing?: boolean
}



export const recommendations: NewCreatedEventCreatedRecommendationsDto = {
  created:true,
  message: "Event created successfully",
  food_recommendations: [
    {
      food_id: 2,
      cuisine_type: "Italian",
      food_name: "Pasta Carbonara",
      description: "A creamy pasta dish with eggs, cheese, pancetta, and black pepper.",
      cultural_origin: "Italian",
    },
  ],
  cultural_traditions: [
    {
      tradition_name: "Mehndi",
      description: "Mehndi is a traditional pre-wedding ritual where the bride's hands and feet are adorned with intricate henna designs.",
      cultural_origin: "Indian",
      religion: "Hindu",
    },
  ],
  inspirations: [
    {
      _id: "64e605f7c5d4bc5d0687c960",
      inspiration_type: "Theme",
      title: "Whimsical Fairytale",
      description: "Transport guests to a magical world with enchanted decor.",
      __v: 0,
    },
  ],
};