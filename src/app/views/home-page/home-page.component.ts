import { Component, AfterViewInit, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomCardComponent } from "../../shared/components/custom-card/custom-card.component";
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartType } from 'chart.js';
import { DashboardService } from '../../core/service/dashboard/dashboard.service';
import { DashboardData, DashboardResponse } from '../../core/interfaces/dashboard.interface';



declare const $: any; // jQuery for calendar

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, CustomCardComponent, BaseChartDirective],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit, AfterViewInit, OnDestroy {

  dashboardData: DashboardData = {
    property_count: 0,
    room_count: 0,
    total_paid_count: '0.00',
    overdue_payments_sum: 0,
    handyman_count: 0,
    available_handyman_count: 0,
    tenant_count: 0,
    pending_reservation_count: 0,
    total_agreements_count: 0,
    total_users_count: 0,
    total_payment_count: 0,
    paid_payment_count: 0,
    partial_payment_count: 0,
    pending_payment_count: 0,
    occupied_room_count: 0,
    vacant_room_count: 0,
    new_tenant_count: 0,
  };

  constructor(private dasboardService: DashboardService) {}

  private intervalId: any;

  public paymentChartLabels: string[] = ['Paid', 'Partial', 'Pending'];
  public paymentChartData: ChartConfiguration<'pie'>['data'] = {
    labels: this.paymentChartLabels,
    datasets: [
      {
        data: [0, 0, 0],
        backgroundColor: ['#ADD8E6', '#87CEEB', '#4682B4'],
      },
    ],
  };
  public paymentChartType: ChartType = 'pie';

  public tenantChartLabels: string[] = ['Occupied Rooms', 'Vacant Rooms', 'New Tenants'];
  public tenantChartData: ChartConfiguration<'bar'>['data'] = {
    labels: this.tenantChartLabels,
    datasets: [
      {
        label: 'Occupied Room',
        data: [0],
        backgroundColor: '#ADD8E6',
      },
      {
        label: 'Vacant Room',
        data: [0],
        backgroundColor: '#87CEEB',
      },
      {
        label: 'New Tenants',
        data: [0],
        backgroundColor: '#4682B4',
      },
    ],
  };

  public tenantChartType: ChartType = 'bar';
  public chartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
  };

  ngOnInit(): void {
    this.loadDashboardData();
    this.intervalId = setInterval(() => {
      this.loadDashboardData();
    }, 5000);
  }

  ngAfterViewInit(): void {
    // jQuery UI datepicker initialization
    $('#miniCalendar').datepicker({
      showOtherMonths: true,
      selectOtherMonths: true
    });
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  loadDashboardData(): void {
    this.dasboardService.getDashboardData().subscribe({
      next: (res: DashboardResponse) => {
        if (res.success) {
          this.dashboardData = res.data;

          this.paymentChartData = {
            labels: this.paymentChartLabels,
            datasets: [
              {
                data: [
                  this.dashboardData.paid_payment_count,
                  this.dashboardData.partial_payment_count,
                  this.dashboardData.pending_payment_count
                ],
                backgroundColor: ['#ADD8E6', '#87CEEB', '#4682B4'],
              },
            ],
          };

          this.tenantChartData = {
            labels: ['Tenants Overview'],
            datasets: [
              {
                label: 'Occupied Room',
                data: [this.dashboardData.occupied_room_count],
                backgroundColor: '#ADD8E6',
              },
              {
                label: 'Vacant Room',
                data: [this.dashboardData.vacant_room_count],
                backgroundColor: '#87CEEB',
              },
              {
                label: 'New Tenants',
                data: [this.dashboardData.new_tenant_count],
                backgroundColor: '#4682B4',
              },
            ],
          };
        }
      },
      error: (err) => {
        console.error('Error loading Dashboard Data', err);
      }
    });
  }
}
