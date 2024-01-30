import { Component, Input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  imports: [ButtonModule],
  standalone: true,
  template: `
    <div>
      Purchase Confirmed! shipping code is {{ data }}
      <p-button label="Confirm Message" (click)="onClickConfirm()" />
    </div>
  `,
})
export class PurchaseConfirmedComponent {
  @Input() shippingCode!: string;

  constructor(
    private ref: DynamicDialogRef,
    private dialogConfig: DynamicDialogConfig
  ) {}

  onClickConfirm() {
    this.ref.close();
  }

  public get data(): string {
    return this.dialogConfig.data! as string;
  }
}
