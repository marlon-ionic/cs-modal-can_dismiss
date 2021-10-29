import { Component, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { CreditCardResult, CreditCardService } from '../services/credit-card.service';

@Component({
  selector: 'app-modal-confirm-remove',
  templateUrl: './modal-confirm-remove.component.html',
  styleUrls: ['./modal-confirm-remove.component.scss'],
})
export class ModalConfirmRemoveComponent implements OnInit {
  @Input() remove$: Observable<CreditCardResult>;
  backdropElement?: HTMLElement;
  enableBackdropDismiss = true;
  errorMessage?: string;
  showBackdrop = true;
  shouldPropagate = false;
  isLoading = false;
  private wasInside = false;

  constructor(private creditCardService: CreditCardService, private elementRef: ElementRef, private modalController: ModalController) {

  }


  //Stacked HostListeners to listen for both Keyboard ESC or mouseup events
  @HostListener('document:keyup.escape', ['$event'])
  @HostListener('document:mouseup', ['$event']) documentClick(e: MouseEvent | KeyboardEvent) {

    // For keyboard event, verify loading isn't happening.
    if(e instanceof KeyboardEvent) {
      if(!this.isLoading) {
        console.log('ESC');
        this.cancel();
      }
    }

    // For clicks, verify that the backdrop was clicked and a loading isn't happening.
    if(e.target === this.backdropElement && !this.isLoading) {
      console.log('BACKDROP CLICK');
      this.cancel();
  }
}

  ngOnInit() {
    //Determines the <ion-backdrop> element associated with this modal
    this.backdropElement = this.elementRef?.nativeElement?.closest('ion-modal')?.querySelector('ion-backdrop');
  }

  cancel() {
    this.modalController.dismiss({ successful: false, cancelled: true});
  }

  get modalHeader() {
    return this.isLoading ? 'Removing Debit Card…' : 'Confirm Removal';
  }

  async removeCard() {
    this.isLoading = true;
    this.creditCardService.remove$()
    .pipe(finalize(() => {
      this.isLoading = false;
    }))
    .subscribe(this.handleCreditCardResult);
  }

  private handleCreditCardResult = (creditCardResult: CreditCardResult) => {
    this.errorMessage = creditCardResult?.errorMessage;
    if(creditCardResult.successful) {
      this.modalController.dismiss({
        successful: true
      });
    }
  };

}
