export interface DashboardData {
    property_count: number;
    room_count: number;
    total_paid_count: string;
    overdue_payments_sum: number;
    handyman_count: number;
    available_handyman_count: number;
    tenant_count: number;
    pending_reservation_count: number;
    total_agreements_count: number;
    total_users_count: number;
    total_payment_count: number;
    paid_payment_count: number;
    partial_payment_count: number;
    pending_payment_count: number;
    occupied_room_count: number;
    vacant_room_count: number;
    new_tenant_count: number;
  }
  

  export interface DashboardResponse {
    success: boolean;
    message: string;
    data: DashboardData;
  }
  