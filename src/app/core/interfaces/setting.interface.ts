export interface Setting {
    id: number;
    user_id: number;
    default_min_lease: number;
    default_reservation_fee: number;
    created_at: string;
    updated_at: string;
}

export interface SettingResponse {
    success: boolean;
    message: string;
    data?: {
        setting: Setting;
    }
}