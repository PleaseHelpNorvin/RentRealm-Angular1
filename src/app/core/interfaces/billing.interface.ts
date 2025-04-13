import { Payment } from "./payment.interface";

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
    status: String;
    checkout_session_id: String;
    created_at: string;
    updated_at: string; 
    payments?: Payment[];
}