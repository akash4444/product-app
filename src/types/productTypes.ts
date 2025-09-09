type Reviews = {
  rating: number;
  comment: string;
  reviewerName: string;
};

export type CartItem = {
  id: string;
  title: string;
  price: number;
  quantity: number;
  thumbnail: string;
  rating: number;
  reviews: Reviews[];
  tags: string[];
  description: string;
};
