import { Component, OnInit ,ViewChild } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ChartConfiguration, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ToastrService } from 'ngx-toastr';
import { adminJobmodal, JobsSummaryResponse, JobsSummaryResponse_Graph } from 'src/app/Classes/all-classes';
import { SharedService } from 'src/app/Shared/shared.service';
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  JobsSummaryResponse: JobsSummaryResponse;
  lstJobsSummaryResponse_Graph: JobsSummaryResponse_Graph[];
  modalOptions:NgbModalOptions;
  Pending_adminJobmodal: adminJobmodal[];
  pagenumber: number = 1;
  pagesize: number = 5;
  allocatedJob:number[];
  constructor(private modalService: NgbModal,private sharedservices: SharedService,
		private toastr: ToastrService ) { 
      this.modalOptions = {
        backdrop:'static',
        backdropClass:'customBackdrop'
      }
    this.JobsSummaryResponse = new  JobsSummaryResponse()
    this.Pending_adminJobmodal = [];
    this.lstJobsSummaryResponse_Graph = [];
    this.allocatedJob =[]

  }

  ngOnInit(): void {
    this.getcount();
    this.getjobs('1');
    this.getcount_forGraph()
  }
  getcount(){
    //api/Admin/technicians
     this.sharedservices.GetDetails("Dashboard/jobsummary").subscribe(rtnData => {
      debugger;
      console.log('rtnData', rtnData);
      if (rtnData.haserror == false) {
        this.JobsSummaryResponse = rtnData.result
      } else {
        this.toastr.success('error!', 'some Error Occured!');
      }
    });
  }

  getcount_forGraph(){
    //api/Admin/technicians
    debugger;
     this.sharedservices.GetDetails("Dashboard/alljobs").subscribe(rtnData => {
      debugger;
      console.log('rtnData', rtnData);
      if (rtnData.haserror == false) {
        this.lstJobsSummaryResponse_Graph = rtnData.result;
        this.lineChartData.datasets[0].data  = this.lstJobsSummaryResponse_Graph.map(t=>t.allocatedjobs)
        this.lineChartData.datasets[1].data  = this.lstJobsSummaryResponse_Graph.map(t=>t.unallocatedjobs)
        this.lineChartData.datasets[2].data  = this.lstJobsSummaryResponse_Graph.map(t=>t.completedjobs)
        this.lineChartData.datasets[3].data  = this.lstJobsSummaryResponse_Graph.map(t=>t.cancelledjobs)
        this.lineChartData.labels =this.lstJobsSummaryResponse_Graph.map(t=>t.name)
        this.chart?.update();
      } else {
        this.toastr.success('error!', 'some Error Occured!');
      }
    });

  }
  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {

        data: [0,0,0,0,0,1],
        label: 'Assigned Jobs',
        backgroundColor: '#009EFA',
        // borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: '#009EFA',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#009EFA',
        fill: 'origin',
      },
      {
        data: [ 28, 48, 40, 19, 86, 27, 90 ],
        label: 'Un Assigned Jobs',
        backgroundColor: '#7462EC',
        // borderColor: 'rgba(77,83,96,1)',
        pointBackgroundColor: '#7462EC',
        pointBorderColor: '#7462EC',
        pointHoverBackgroundColor: '#7462EC',
        pointHoverBorderColor: '#7462EC',
        fill: 'origin',
      },
      {
        data: [ 18, 48, 77, 90, 100, 27, 40 ],
        label: 'Complete Jobs',
        yAxisID: 'y-axis-1',
        backgroundColor: '#FFBD34',
        // borderColor: 'red',
        pointBackgroundColor: 'rgba(193, 205, 238, 0.72)',
        pointBorderColor: 'rgba(193, 205, 238, 0.72)',
        pointHoverBackgroundColor: 'rgba(193, 205, 238, 0.72)',
        pointHoverBorderColor: 'rgba(193, 205, 238, 0.72)',
        fill: 'origin',
      },
      {
        data: [ 18, 48, 77, 90, 100, 27, 40 ],
        label: 'Canceled',
        yAxisID: 'y-axis-1',
        backgroundColor: '#1F5979',
        // borderColor: 'red',
        pointBackgroundColor: 'rgba(193, 205, 238, 0.72)',
        pointBorderColor: 'rgba(193, 205, 238, 0.72)',
        pointHoverBackgroundColor: 'rgba(193, 205, 238, 0.72)',
        pointHoverBorderColor: 'rgba(193, 205, 238, 0.72)',
        fill: 'origin',
      }
    ],
    labels: [ ]
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5
      }
    },
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      x: {},
      'y-axis-0':
        {
          position: 'left',
        },
      'y-axis-1': {
        position: 'right',
        grid: {
          // color: 'rgba(255,0,0,0.3)',
        },
        ticks: {
          // color: 'red'
        }
      }
    },

    plugins: {
      legend: { display: true },
      
    }
  };

  public lineChartType: ChartType = 'line';

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  private static generateNumber(i: number): number {
    return Math.floor((Math.random() * (i < 2 ? 100 : 1000)) + 1);
  }

  public randomize(): void {
    for (let i = 0; i < this.lineChartData.datasets.length; i++) {
      for (let j = 0; j < this.lineChartData.datasets[i].data.length; j++) {
        this.lineChartData.datasets[i].data[j] = AdminDashboardComponent.generateNumber(i);
      }
    }
    this.chart?.update();
  }

  // events
  public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    // console.log(event, active);
  }

  public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    // console.log(event, active);
  }

  public hideOne(): void {
    const isHidden = this.chart?.isDatasetHidden(1);
    this.chart?.hideDataset(1, !isHidden);
  }

  public pushOne(): void {
    this.lineChartData.datasets.forEach((x, i) => {
      const num = AdminDashboardComponent.generateNumber(i);
      x.data.push(num);
    });
    this.lineChartData?.labels?.push(`Label ${ this.lineChartData.labels.length }`);

    this.chart?.update();
  }

  public changeColor(): void {
    // this.lineChartData.datasets[2].borderColor = 'green';
    // this.lineChartData.datasets[2].backgroundColor = `rgba(0, 255, 0, 0.3)`;

    this.chart?.update();
  }

  public changeLabel(): void {
    if (this.lineChartData.labels) {
      // this.lineChartData.labels[2] = [ '1st Line', '2nd Line' ];
    }

    this.chart?.update();
  }


  previous(type: any) {
    if (this.pagenumber != 1) {
      this.pagenumber = this.pagenumber - 1;
      this.getjobs(type)
    }
  }
  next(type: any) {
    this.pagenumber = this.pagenumber + 1;
    this.getjobs(type)
  }

  getjobs(type: any) {
    debugger;
    var str = "?type=" + type + "&pagenumber=" + this.pagenumber + "&pagesize=" + this.pagesize
    this.sharedservices.GetDetails("Admin/jobs" + str).subscribe(rtnData => {
      debugger;
      console.log('rtnData', rtnData);
      if (rtnData.haserror == false) {
       
          this.Pending_adminJobmodal = rtnData.result;
       
      } else {
        this.toastr.success('error!', 'some Error Occured!');
      }
    });
  }

}
