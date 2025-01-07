import { Component } from '@angular/core';
import { CarouselComponent } from '../../../shared/components/carousel/carousel.component';
import { RoomService } from '../../../core/service/room/room.service';
import { ActivatedRoute } from '@angular/router';
import { Room, RoomResponse } from '../../../core/interfaces/room.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-room-view',
  imports: [CarouselComponent, CommonModule],
  templateUrl: './room-view.component.html',
  styleUrl: './room-view.component.css'
})
export class RoomViewComponent {
  roomImages: string[] = [];
  room: Room | null = null;
  errorMessage: string = '';
  room_id: number |  null = null;



  constructor(private route: ActivatedRoute, private roomService: RoomService) {
    this.route.params.subscribe(params => {
      this.room_id = params['id'];
      console.log(`from cosntructor room_id:${this.room_id}`);
    });
  }

  ngOnInit(): void {
    if (this.room_id !== null) {
      this.loadRoomData(this.room_id);
    }
  }

  loadRoomData(room_id: number): void {
    console.log(`from loadRoomData(): ${room_id}`);
    this.roomService.getRoomData(room_id).subscribe((response: any) => {
      console.log(`this is from OUTSIDE RSPONSE IF ELSE: ${JSON.stringify(response)}`);

      if (response) {
        this.room = response.data.rooms;
        console.log(`this is from success response: ${JSON.stringify(this.room)}`);
        const roomPictureUrl = response.data.rooms.room_picture_url;

        // this.roomImages = response.data.rooms.room_picture_url;
        if (roomPictureUrl) {
          this.roomImages = roomPictureUrl.map(String); 
          console.log(`not null ${this.roomImages}`)
        }else if (roomPictureUrl){
        this.roomImages = [String(roomPictureUrl)];

        }else{
          this.roomImages = [];

          console.log(this.roomImages)
        }
      }

    });
  }

}
