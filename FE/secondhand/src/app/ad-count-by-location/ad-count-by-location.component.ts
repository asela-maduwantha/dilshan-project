import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-ad-count-by-location',
  templateUrl: './ad-count-by-location.component.html',
  styleUrls: ['./ad-count-by-location.component.scss']
})
export class AdCountByLocationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    axios.get('http://localhost:8000/ad-count-by-location')
      .then(response => {
        const data = response.data;
        this.createChart(data);
      })
      .catch(error => {
        console.error('There was an error fetching the ad data!', error);
      });
  }

  createChart(data: any): void {
    const ctx = document.getElementById('adCountChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: data.map((item: any) => item.location),
        datasets: [{
          label: '# of Ads',
          data: data.map((item: any) => item.ad_count),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(54, 162, 235, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(54, 162, 235, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
