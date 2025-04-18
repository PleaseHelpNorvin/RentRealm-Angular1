import { Billing } from "./billing.interface";
import { RentalAgreement } from "./rental_agreement.interface";

export interface Payment {
    id: number;
    billing_id: number;
    payable_type: String;
    payable_id: number;
    profile_id: number;
    amount_paid: number;
    payment_method: String;
    paymongo_payment_reference: String;
    // payment_proof_url: [] i dont know what is this;
    status: String;
    created_at: string;
    updated_at: string; 
    payable?: RentalAgreement; 
    billing?: Billing;
}

export interface PaymentResponse {
    success: boolean;
    message: string;
    data: {
        payments: Payment[];
    }
}