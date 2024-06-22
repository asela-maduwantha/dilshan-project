import { Component, OnInit } from '@angular/core';
import axios from 'axios';

interface Complaint {
  advertisement_id: number;
  user_id:number;
  total_complaints: number;
  latest_complaint_date: string;
  'MAX(complaint_type)': string;
  'MAX(complaint_description)': string;
  earliest_complaint_date: string;
}

@Component({
  selector: 'app-user-complaints',
  templateUrl: './user-complaints.component.html',
  styleUrls: ['./user-complaints.component.scss']
})
export class UserComplaintsComponent implements OnInit {
  complaints: Complaint[] = [];
  isPopupVisible = false;

  constructor() { }

  ngOnInit(): void {
    this.fetchComplaints();
  }

  fetchComplaints() {
    axios.get('http://localhost:8000/all-user-complaints')
      .then(response => {
        // Check if response data is an array
        if (Array.isArray(response.data)) {
          this.complaints = response.data;
        } else {
          // If response data is an object, convert it to an array
          this.complaints = [response.data];
        }
      })
      .catch(error => {
        console.error('Error fetching complaints:', error);
      });
  }

  showPopup() {
    this.isPopupVisible = true;
  }

  closePopup() {
    this.isPopupVisible = false;
  }

  banUser() {
    // Add your logic to ban the user here
    alert('User has been banned.');
    this.closePopup();
  }
}
