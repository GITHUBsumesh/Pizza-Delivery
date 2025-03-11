export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  address?: string;
  email: string;
  password?: string; // optional since `select: false`
  role: "admin" | "user";
  isVerified: boolean;
  profilePic?: string;
  cart?: string; // assuming it's storing the ObjectId as a string
  emailVerificationToken?: string;
  emailVerificationExpires?: Date;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Category {
  _id: string;
  name: string;
  selectionType?: "single" | "multiple";
}

export interface Ingredient {
  _id: string;
  name: string;
  category?: Category;
  image?: string;
  price: number;
  stock?: number;
  threshold?: number;
}
export type items = {
  category: Category;
  ingredients: Ingredient[];
  _id?: string;
};
export interface Item {
  _id: string;
  items: items[];
  quantity: number;
  price: number;
}

export interface Cart {
  _id: string;
  user: string;
  items: Item[];
  totalPrice: number;
}
export type razorPayDetails = {
  orderId?: string;
  paymentId?: string;
  signature?: string;
  status?: "pending" | "captured" | "failed";
  amount?:number;
  currency?:string;
  created_at?:Date;
};
export type status = 
    | "Order Received"
    | "In the Kitchen"
    | "Sent to Delivery"
    | "Delivered"
    | "Cancelled";
;


export interface Order {
  paymentMethod: "COD" | "RazorPay" | undefined;
  _id?: string;
  user?: User;
  items?: Item[];
  totalPrice?: number;
  status?: status;
  payment?: {
    method?: "COD" | "RazorPay";
    razorPayDetails?: razorPayDetails;
  };
  orderedTime?: Date;
  deliveryTime?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}


export interface Inventory {
  _id: string;
  category: Category;
  ingredients: Ingredient[];
  isDeleted?: boolean;
  updatedAt?: Date;
  createdAt?: Date;
}
