import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common'; // <-- Import CommonModule here

@Component({
  selector: 'app-custom-card',
  imports: [CommonModule],
  templateUrl: './custom-card.component.html',
  styleUrl: './custom-card.component.css'
})
export class CustomCardComponent {
  @Input() title: string = '';
  @Input() footerText: string = '';
  @Input() cardHeaderBgColor: string = '#000';

   // Dynamic content for the card-body
   @Input() cardBodyText: string = 'Used Space';  // Default text for the <p> element
   @Input() cardBodyValue: string = '49/50 GB';   // Default value for the <h3> element
}
