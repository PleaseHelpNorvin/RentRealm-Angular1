import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomCardComponent } from "../../shared/components/custom-card/custom-card.component";
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartType } from 'chart.js';


@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, CustomCardComponent, BaseChartDirective],  // Import shared module and charts directive
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  public paymentChartLabels: string[] = ['Paid', 'Overdue', 'Pending'];
  public paymentChartData: ChartConfiguration<'pie'>['data'] = {
    labels: this.paymentChartLabels,
    datasets: [
      {
        data: [1200, 500, 800],
        backgroundColor: ['#ADD8E6', '#87CEEB', '#4682B4'], // Colors for pie chart
      },
    ],
  };
  public paymentChartType: ChartType = 'pie';

  // Tenants Overview Chart Data
  public tenantChartLabels: string[] = ['Occupied', 'Vacant', 'New Tenants'];
  public tenantChartData: ChartConfiguration<'bar'>['data'] = {
    labels: this.tenantChartLabels,
    datasets: [
      {
        label: 'Tenants',
        data: [50, 10, 5],
        backgroundColor: ['#ADD8E6', '#87CEEB', '#4682B4'], // Colors for bar chart
      },
    ],
  };
  public tenantChartType: ChartType = 'bar';

  // Chart Options
  public chartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
  };

}
