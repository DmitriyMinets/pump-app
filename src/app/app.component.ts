import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { PumpService } from './services/pump.service';
import { PumpComponent } from './components/pump/pump.component';
import { ModalComponent } from './components/modal/modal.component';
import { CreatePumpComponent } from './components/create-pump/create-pump.component';
import { ModalService } from './services/modal.service';
import { Pump } from './models/pump';
import { DetailsPumpComponent } from './components/details-pump/details-pump.component';
import { GlobalErrorComponent } from './components/global-error/global-error.component';
import { CreateMotorComponent } from './components/create-motor/create-motor.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    PumpComponent,
    ModalComponent,
    CreatePumpComponent,
    DetailsPumpComponent,
    GlobalErrorComponent,
    CreateMotorComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'pump-app';
  pumps$?: Observable<Pump[]>;
  isEdit: boolean = false;

  constructor(
    public pumpService: PumpService,
    public modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.getPumps();
  }

  public getPumps(): void {
    this.pumps$ = this.pumpService.getAllPump();
  }

  openModalForNewMotor() {
    this.modalService.open(null, 'Добавить новый мотор', 'createMotor');
    this.isEdit = false;
  }
  openModalForNewPump() {
    this.modalService.open(null, 'Добавить новый насос', 'createPump');
    this.isEdit = false;
  }

  openModalWithPump(pump: Pump) {
    this.modalService.open(pump, 'Изменить насос', 'updatePump');
    this.isEdit = true;
  }

  openDetailsModal(pump: Pump) {
    this.modalService.open(pump, 'Детали насоса', 'details');
  }
}
