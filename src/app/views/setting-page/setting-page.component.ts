import { Component } from '@angular/core';
import { SettingService } from '../../core/service/setting/setting.service';
import { Users, UserSettingResponse } from '../../core/interfaces/users.interface';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/service/auth/auth.service';

@Component({
  selector: 'app-setting-page',
  imports: [CommonModule,FormsModule],
  templateUrl: './setting-page.component.html',
  styleUrl: './setting-page.component.css'
})
export class SettingPageComponent {
  adminUserWithSetting?: Users;
  userForm = {
    name: '',
    email: '',
    admin_phone: '',
    password: ''
  };

  settingForm = {
    default_min_lease: 6,
    default_reservation_fee: 0
  };
  constructor(private settingService:SettingService, private authService: AuthService ){}

  ngOnInit(): void {
    this.loadUserSetting()
  }

  loadUserSetting(): void {
    this.settingService.showUserSetting().subscribe({
      next: (res: UserSettingResponse) => {
        console.log("loadUserSetting",res);
        this.adminUserWithSetting = res?.data.user;
        this.userForm = {
          name: res.data.user.name,
          email: res.data.user.email,
          admin_phone: res.data.user.admin_phone || '',
          password: ''
        };

        this.settingForm = {
          default_min_lease: res.data.user.setting?.default_min_lease ??  6,
          default_reservation_fee: res.data.user.setting?.default_reservation_fee ?? 0
        };
      },
      error: (err) => {
        console.error('Error loadUserSetting:', err);
      }
    })
  }

  updateUser(): void {
    const confirmed = window.confirm("Are you sure you want to update your account settings?");
    if (!confirmed) return;
  
    const { name, email, admin_phone, password } = this.userForm;
  
    this.settingService.putAdminUpdate(name, email, admin_phone, password).subscribe({
      next: (res) => {
        console.log("Update successful", res);
        alert("Account updated successfully!");
        this.loadUserSetting();
      },
      error: (err) => {
        console.error("Update failed", err);
        alert("Something went wrong while updating your account.");
      }
    });
  }
  updateSetting(): void {
    const confirmSave = window.confirm("Save Property Info changes?");
    if (!confirmSave) return;
  
    const user_id = this.authService.getAdminId();
  
    const payload = {
      user_id: user_id,
      default_min_lease: this.settingForm.default_min_lease,
      default_reservation_fee: this.settingForm.default_reservation_fee
    };
  
    this.settingService.postUpdateSetting(payload).subscribe({
      next: (res) => {
        console.log("Property info updated successfully!", res);
        alert("Property settings saved.");
      },
      error: (err) => {
        console.error("Failed to update property info", err);
        alert("Failed to save property settings.");
      }
    });
  }
}
