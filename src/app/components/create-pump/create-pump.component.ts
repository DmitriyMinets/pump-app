import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IMotor } from '../../models/motor';
import { PumpService } from '../../services/pump.service';
import { IMaterial } from '../../models/material';
import { IPumpRQ } from '../../models/pumpRQ';
import { ModalService } from '../../services/modal.service';
import { Pump } from '../../models/pump';

@Component({
  selector: 'app-create-pump',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-pump.component.html',
  styleUrl: './create-pump.component.css',
})
export class CreatePumpComponent implements OnInit {
  motors: IMotor[];
  materials: IMaterial[];
  @Input() pump: Pump = new Pump();
  @Input() isEdit: boolean = false;
  @Output() pumpAdded = new EventEmitter<void>();
  private file?: any;
  isError: boolean = false;

  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    maxPressure: new FormControl(),
    liquidTemperature: new FormControl(),
    weight: new FormControl(),
    motorId: new FormControl('', [Validators.required]),
    bodyMaterialId: new FormControl('', [Validators.required]),
    impellerMaterialId: new FormControl('', [Validators.required]),
    description: new FormControl(),
    price: new FormControl(),
    imageUrl: new FormControl(null),
    image: new FormControl<any>(undefined),
  });

  constructor(
    private pumpService: PumpService,
    private modalService: ModalService
  ) {
    this.motors = [];
    this.materials = [];
  }

  get formControls() {
    return this.form.controls;
  }
  ngOnInit(): void {
    this.pumpService.getAllmotors().subscribe((data) => {
      this.motors = data;
    });
    this.pumpService.getAllMaterials().subscribe((data) => {
      this.materials = data;
    });
    if (this.isEdit && this.pump) {
      this.form.patchValue(this.convertPumpToFormValue(this.pump));
    }
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    this.file = file;
  }

  convertPumpToFormValue(pump: Pump): any {
    return {
      id: pump.id,
      name: pump.name.toString(),
      maxPressure: pump.maxPressure.toString(),
      liquidTemperature: pump.liquidTemperature.toString(),
      weight: pump.weight.toString(),
      motorId: pump.motorId.toString(),
      bodyMaterialId: pump.bodyMaterialId.toString(),
      impellerMaterialId: pump.impellerMaterialId.toString(),
      description: pump.description,
      price: pump.price,
      imageUrl: pump.imageUrl,
    };
  }

  commonInputClass = 'common-input';
  submit() {
    if (this.form.invalid) {
      this.isError = true;
    } else {
      var value = this.form.value;
      var pump: IPumpRQ = {
        id: this.pump !== null ? this.pump.id : 0,
        bodyMaterialId: Number(value.bodyMaterialId),
        description: value.description,
        motorId: Number(value.motorId),
        impellerMaterialId: Number(value.impellerMaterialId),
        maxPressure: Number(value.maxPressure),
        name: String(value.name),
        price: Number(value.price),
        weight: Number(value.weight),
        liquidTemperature: Number(value.liquidTemperature),
        imageUrl: value.imageUrl,
        image: this.file,
      };

      if (this.isEdit) {
        this.pumpService.updatePump(pump).subscribe({
          next: (v) => {
            console.log('Насос успешно обновлен', v);
            this.modalService.close();
            this.pumpAdded.emit();
          },
          error: (e) => console.error('Ошибка при отправке запроса', e.message),
        });
      } else {
        this.pumpService.addPump(pump).subscribe({
          next: (v) => {
            console.log('Насос успешно добавлен', v);
            this.modalService.close();
            this.pumpAdded.emit();
          },
          error: (e) => console.error('Ошибка при отправке запроса', e.message),
        });
      }
    }
  }
}
