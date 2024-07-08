import { Component } from '@angular/core';
import { ErrorService } from '../../services/error.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-global-error',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './global-error.component.html',
  styleUrl: './global-error.component.css',
})
export class GlobalErrorComponent {
  constructor(public errorService: ErrorService) {}
}
