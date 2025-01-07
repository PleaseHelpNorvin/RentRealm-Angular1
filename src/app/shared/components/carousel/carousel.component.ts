import { CommonModule } from '@angular/common';
import { OnInit, Component, Input } from '@angular/core';
import { SlickCarouselModule } from 'ngx-slick-carousel';

@Component({
  selector: 'app-carousel',
  imports: [CommonModule, SlickCarouselModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css'
})
export class CarouselComponent implements OnInit  {
  @Input() images: string[] = []; // Array of image URLs

  slickConfig = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 3000,
    arrows: true,
  };
 
  // Sample slide data
   slides: { image: string }[] = [];
  constructor() { }

  ngOnInit(): void {
    this.slides = this.images.map(image => ({ image }));
    console.log(this.images);
  }

  
}
