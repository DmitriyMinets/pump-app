import { Component, Input } from '@angular/core';

import { Pump } from '../../models/pump';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-details-pump',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './details-pump.component.html',
  styleUrl: './details-pump.component.css',
})
export class DetailsPumpComponent {
  constructor() {}
  @Input() pump: Pump = new Pump();
  showFullDescription = false;
  showMotorDetails = false;

  toggleMotorDetails() {
    this.showMotorDetails = !this.showMotorDetails;
  }
}
