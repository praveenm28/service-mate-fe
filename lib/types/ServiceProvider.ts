import { CategoryRespone } from "./CategoryResponse";
import { CityResponse } from "./CityResponse";
import { ReviewResponse } from "./ReviewResponse";
import { TagResponse } from "./TagReponse";
import { UserResponse } from "./UserResponse";
import { WorkingTimeResponse } from "./WorkingTimeResponse";

export interface ServiceProvider {
  id: number;
  userResponse: UserResponse;
  bio: string;
  name: string;
  qualification: string;
  experience: string;
  licenceNo: string;
  avgRating: number;
  reviewResponse: ReviewResponse[];
  paymentPerHour: number;
  cityResponses: CityResponse[];
  tagResponses: TagResponse[];
  categoryResponses: CategoryRespone[];
  workedImages: string[];
  workingTimeRespones: WorkingTimeResponse[];
  verified: boolean;
  availableForEmergency: boolean;
  businessName: string;
}
