import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // <-- Add this

@Component({
  selector: 'app-custom-card',
  standalone: true, // <-- Make sure this is here
  imports: [CommonModule, RouterModule], // <-- Add RouterModule here
  templateUrl: './custom-card.component.html',
  styleUrl: './custom-card.component.css'
})
export class CustomCardComponent {
  @Input() title: string = '';
  @Input() footerText: string = '';
  @Input() cardHeaderBgColor: string = '#000';
  @Input() cardBodyText: string = 'Used Space';
  @Input() cardBodyValue: string = '49/50 GB';
  @Input() moreInfoLink: string = '/'; // default route if not passed
}
