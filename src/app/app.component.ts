import { Component } from '@angular/core';
import { ChatService, Message } from 'src/app/chat.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'GCL';


  messages: Message[] = [];
  value: string = "";
  constructor(public chatService: ChatService) { }

  ngOnInit():void {
      this.chatService.conversation.subscribe((val: any) => {
      this.messages = this.messages.concat(val);
    });
  }

  sendMessage() {
    this.chatService.getBotAnswer(this.value);
    this.value = '';
  }

   openForm() {
    let element: HTMLElement = document.getElementById('myForm') as HTMLElement;
    element.style.display = "block";
  }
  
  closeForm() {
    let element: HTMLElement = document.getElementById('myForm') as HTMLElement;
    element.style.display = "none";
  }
}
