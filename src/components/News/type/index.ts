export interface NewsResponseDto {
  id: string;
  date: string;
  date_to: null | string;
  name: string;
  description: string;
  is_conference: boolean;
  link: string;
  proof_image_link: null | string;
}
