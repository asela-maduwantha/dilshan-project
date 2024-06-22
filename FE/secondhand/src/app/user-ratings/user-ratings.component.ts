import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { Chart, ChartOptions } from 'chart.js/auto'; // Ensure to import from 'chart.js/auto'

@Component({
  selector: 'app-user-ratings',
  templateUrl: './user-ratings.component.html',
  styleUrls: ['./user-ratings.component.scss']
})
export class UserRatingsComponent implements OnInit {
  ratingsData: any[] = []; // Data retrieved from API
  donutChart: Chart | undefined; // Chart.js instance

  constructor() { }

  ngOnInit(): void {
    this.fetchUserRatings();
  }

  fetchUserRatings() {
    axios.get<any[]>('http://localhost:8000/user-rating')
      .then(response => {
        this.ratingsData = response.data;
        this.renderDonutChart();
      })
      .catch(error => {
        console.error('Error fetching user ratings:', error);
      });
  }

  renderDonutChart() {
    const labels = this.ratingsData.map(item => `Rating ${item.rating}`);
    const data = this.ratingsData.map(item => item.num_ads);

    if (this.donutChart) {
      this.donutChart.destroy();
    }

    const ctx = document.getElementById('donutChart') as HTMLCanvasElement;
    this.donutChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: this.generateRandomColors(data.length),
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
        },
      } as ChartOptions // Explicitly specify ChartOptions
    });
  }

  generateRandomColors(count: number): string[] {
    const colors: string[] = [];
    for (let i = 0; i < count; i++) {
      colors.push('#' + Math.floor(Math.random()*16777215).toString(16));
    }
    return colors;
  }
}
