import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})

export class ToastService {
  constructor(
    private ms: MessageService,
  ) { }

  public error(txt: string, title = 'Error', time = 2500): void {
    this.ms.add({severity: 'error', summary: title, detail: txt, life: time});
  }

  public success(txt: string, title = 'Success', time = 2500): void {
    this.ms.add({severity: 'success', summary: title, detail: txt, life: time});
  }
}
