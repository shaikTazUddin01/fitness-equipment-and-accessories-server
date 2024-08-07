export type TOrder = {
    customerName: string;
    customerEmail: string;
    customerNumber: string;
    customerAddress: string;
    productName: string;
    productCategory: string;
    productPrice: number;
    totalItem: number;
    totalPrice: number;
    delivaryFee?:number |null,
    paymentStatus?: "payment complete" | "cash on delivery";
    totalPayment: number | null;
    status?: 'delivered' | 'onProcess' | 'cancel' | 'pending' | 'shipped' | 'returned';
  };
  