import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomService } from '../../../core/service/room/room.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-room-add',
  imports: [CommonModule],
  templateUrl: './room-add.component.html',
  styleUrls: ['./room-add.component.css']
})
export class RoomAddComponent {
  property_id: number | null = null;
  selectedImages: string[] = []; // Array to hold selected images
  room = {
    code: '',
    rentPrice: '',
    // Add other properties like capacity, status, etc.
  };

  constructor(private router: Router, private route: ActivatedRoute, private roomService: RoomService) {
    this.route.params.subscribe(params => {
      this.property_id = params['property_id'];
      console.log('Property ID:', this.property_id);
    });
  }

  // Handle image selection
  onImageSelected(event: any): void {
    const files = event.target.files; // Get the selected files
    const maxImages = 7;
    const newImages: string[] = []; // Temporary array to hold new image data
    
    // Check how many images are already selected
    const currentImageCount = this.selectedImages.length;
    const remainingSlots = maxImages - currentImageCount;
    
    // If the number of files selected exceeds the remaining slots, show an alert and stop the selection
    if (files.length > remainingSlots) {
      alert(`You can only select up to ${maxImages} images.`);
      return;
    }
  
    // Temporary counter to track how many files have been processed
    let filesProcessed = 0;
  
    // Loop through the selected files and create object URLs for previews
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
    
      reader.onload = () => {
        const imageUrl = reader.result as string;
        newImages.push(imageUrl); // Add image to the temporary array
    
        // Debugging: Log the image URL
        console.log('Image URL:', imageUrl);
        
        // Increment the counter when a file is processed
        filesProcessed++;
  
        // Once all files are processed, update the selectedImages array
        if (filesProcessed === files.length) {
          this.selectedImages = [...this.selectedImages, ...newImages];
          // Debugging: Log the selected images array
          console.log('Selected Images:', this.selectedImages);
        }
      };
    
      reader.readAsDataURL(file); // Convert the file to a DataURL
    }
  }
      
  // Handle form submission
  onSubmit(): void {
    // Handle form submission logic here (e.g., sending data to the server)
    console.log('Room data:', this.room);
    console.log('Selected Images:', this.selectedImages);
  }
}
