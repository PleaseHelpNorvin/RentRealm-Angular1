import { Payment } from "./payment.interface";
import { RentalAgreement } from "./rental_agreement.interface";
import { Tenant } from "./tenant.interface";
import { UserProfile } from "./users.interface";

export interface LatestBilling {
    billing_month: string;
    status: string;
    total_amount: number;
    amount_paid: number;
    remaining_balance: number;
}
export interface NextBilingMonth {
    next_billing_month: string;

}

export interface Billing {
    id: number;
    profile_id: number;
    billable_type: String;
    billable_id: number;
    billing_title: String;
    total_amount: number;
    amount_paid: number;
    remaining_balance: number;
    billing_month: string;
    due_date: string;
    status: String;
    checkout_session_id: String;
    created_at: string;
    updated_at: string; 
    payments?: Payment[];
    rental_agreements?:  RentalAgreement[];
    user_profile?: UserProfile;
    billable?: Tenant ;
    rentalAgreementBillable?: RentalAgreement;
}

export interface BillingResponse {
    success: boolean;
    message: string;
    data: {
        billings: Billing[];
    }; 
}

