import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { IMotorRQ } from '../../models/motorRQ';
import { PumpService } from '../../services/pump.service';
import { ModalService } from '../../services/modal.service';
@Component({
  selector: 'app-create-motor',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-motor.component.html',
  styleUrl: './create-motor.component.css',
})
export class CreateMotorComponent {
  constructor(
    private pumpService: PumpService,
    private modalService: ModalService
  ) {}
  isError: boolean = false;

  form = new FormGroup({
    name: new FormControl<string>('', Validators.required),
    power: new FormControl(''),
    current: new FormControl(''),
    rateSpeed: new FormControl(''),
    price: new FormControl(''),
    description: new FormControl(''),
  });
  get formControls() {
    return this.form.controls;
  }

  submit() {
    if (this.form.invalid) {
      this.isError = true;
    } else {
      var value = this.form.value;
      var motor: IMotorRQ = {
        name: String(value.name),
        current: Number(value.current),
        description: String(value.description),
        power: Number(value.power),
        price: Number(value.price),
        ratedSpeed: Number(value.rateSpeed),
      };

      this.pumpService.addMotor(motor).subscribe({
        next: (v) => {
          console.log('Насос успешно обновлен', v);
          this.modalService.close();
        },
        error: (e) => console.error('Ошибка при отправке запроса', e.message),
      });
    }
  }
}
