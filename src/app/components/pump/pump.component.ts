import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pump } from '../../models/pump';
import { CommonModule } from '@angular/common';
import { PumpService } from '../../services/pump.service';
import { ModalService } from '../../services/modal.service';
import { ModalComponent } from '../modal/modal.component';
import { CreatePumpComponent } from '../create-pump/create-pump.component';

@Component({
  selector: 'app-pump',
  standalone: true,
  imports: [CommonModule, ModalComponent, CreatePumpComponent],
  templateUrl: './pump.component.html',
  styleUrl: './pump.component.css',
})
export class PumpComponent {
  constructor(
    private pumpService: PumpService,
    public modalService: ModalService
  ) {}
  details: boolean = false;
  showMotorDetails: boolean = false;
  showFullDescription: boolean = false;
  @Input() pump: Pump = new Pump();
  @Output() removePump = new EventEmitter<void>();
  @Output() editPump = new EventEmitter<Pump>();
  @Output() viewDetails = new EventEmitter<Pump>();

  onEdit() {
    this.editPump.emit(this.pump);
  }

  onViewDetails() {
    this.viewDetails.emit(this.pump);
  }

  remove(id: number) {
    this.pumpService.removePump(id).subscribe({
      next: (v) => {
        console.log('Насос успешно удалён', v);
        this.removePump.emit();
      },
      error: (e) => console.error('Ошибка при отправлке запроса', e.message),
    });
  }
}
