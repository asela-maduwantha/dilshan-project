import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chatService';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  message: string = '';
  messages: string[] = [];


  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.chatService.receiveMessage().subscribe((message: string) => {
      this.messages.push(message);
    });
  }

  sendMessage(): void {
    if (this.message.trim()) {
      this.chatService.sendMessage(this.message);
      this.message = '';
    }
  }
}
