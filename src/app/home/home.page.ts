import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Observable, of } from 'rxjs';
import { finalize, mergeMap, switchMap } from 'rxjs/operators';
import { ModalConfirmRemoveComponent } from '../modal-confirm-remove/modal-confirm-remove.component';
import { CreditCardResult, CreditCardService } from '../services/credit-card.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private creditCardService: CreditCardService, private modalController: ModalController) { }

  async confirmCardRemove() {
    const modal = await this.modalController.create({
      backdropDismiss: false,
      component: ModalConfirmRemoveComponent,
      cssClass: 'modal-card-rm',
      showBackdrop: true
    });
    await modal.present();
    const result = await modal.onWillDismiss();

    console.log('dismiss result', result);

  }

}
