import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MisViajesPage } from './mis-viajes';

@NgModule({
  declarations: [
    MisViajesPage,
  ],
  imports: [
    IonicPageModule.forChild(MisViajesPage),
  ],
})
export class MisViajesPageModule {}
