import { element } from 'protractor';
import { Component } from '@angular/core';
import {} from 'apexcharts';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private oFileIn;

  constructor() {

  }
fileUpload() {
    const fileUpload = document.getElementById('fileUpload');
        // Validate whether File is valid Excel file.
    const regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx)$/;
    if (regex.test(fileUpload.value.toLowerCase())) {
            if (typeof (FileReader) != 'undefined') {
                const reader = new FileReader();

                // For Browsers other than IE.
                if (reader.readAsBinaryString) {
                    // tslint:disable-next-line: only-arrow-functions
                    reader.onload = (e) => {
                        this.ProcessExcel(e.target.result);
                    };
                    reader.readAsBinaryString(fileUpload.files[0]);
                } else {
                    // For IE Browser.
                    // tslint:disable-next-line: only-arrow-functions
                    reader.onload = (e: any) => {
                        let data = '';
                        const bytes = new Uint8Array(e);
                        for (let i = 0; i < bytes.byteLength; i++) {
                            data += String.fromCharCode(bytes[i]);
                        }
                        this.ProcessExcel(data);
                    };
                    reader.readAsArrayBuffer(fileUpload.files[0]);
                }
            } else {
                alert('This browser does not support HTML5.');
            }
        } else {
            alert('Please upload a valid Excel file.');
        }
}
ProcessExcel(data) {
    // Read the Excel File data.
    // tslint:disable-next-line: prefer-const
    let workbook = XLSX.read(data, {
        type: 'binary'
    });

    // Fetch the name of First Sheet.
    const firstSheet = workbook.SheetNames[0];

    // Read all rows from First Sheet into an JSON array.
    const excelRows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[firstSheet]);
    console.log(excelRows);
    // Create a HTML Table element.
    const sums = {unconfirmed: {sumUnconfirmed: 0},
                new: {sumNew: 0}, assigned: {sumAssigned: 350}, reopend: {sumRepoend: 30}, resolved: {sumResolved: 200},
                verified: {sumVerified: 87}, closed: {sumClosed: 100}};

    excelRows.forEach(element => {
      switch (element.Status) {
        case 'UNCONFIRMED':
          sums.unconfirmed.sumUnconfirmed += 1;
          break;
        case 'NEW':
          sums.new.sumNew += 1;
          break;
        case 'ASSIGNED':
          sums.assigned.sumAssigned += 1;
          break;
        case 'REOPEND':
          sums.reopend.sumRepoend += 1;
          break;
        case 'RESOLVED':
          sums.resolved.sumResolved += 1;
          break;
        case 'VERIFIED':
          sums.verified.sumVerified += 1;
          break;
        case 'COLSED':
          sums.closed.sumClosed += 1;
          break;
      }
    });
    const options = {
      series: [{
      data: [sums.unconfirmed.sumUnconfirmed, sums.new.sumNew , sums.assigned.sumAssigned, sums.reopend.sumRepoend ,
         sums.resolved.sumResolved , sums.verified.sumVerified, sums.closed.sumClosed]
    }],
      chart: {
      type: 'bar',
      height: 380
    },
    plotOptions: {
      bar: {
        barHeight: '100%',
        distributed: true,
        horizontal: true,
        dataLabels: {
          position: 'bottom'
        },
      }
    },
    colors: ['#d4526e', '#546E7A', '#69d2e7', '#13d8aa', '#A5978B', '#2b908f', '#ff0000'
    ],
    dataLabels: {
      enabled: true,
      textAnchor: 'start',
      style: {
        colors: ['#fff']
      },
      formatter(val, opt) {
        return opt.w.globals.labels[opt.dataPointIndex] + ':  ' + val;
      },
      offsetX: 0,
      dropShadow: {
        enabled: true
      }
    },
    stroke: {
      width: 1,
      colors: ['#fff']
    },
    xaxis: {
      categories: ['Unconfirmed', 'New', 'Assigned', 'Reopend', 'Resolved', 'Verified', 'Closed'
      ],
    },
    yaxis: {
      labels: {
        show: false
      }
    },
    title: {
        text: 'Custom DataLabels',
        align: 'center',
        floating: true
    },
    subtitle: {
        text: 'Category Names as DataLabels inside bars',
        align: 'center',
    },
    tooltip: {
      theme: 'dark',
      x: {
        show: false
      },
      y: {
        title: {
          formatter() {
            return '';
          }
        }
      }
    }
    };

    const chart = new ApexCharts(document.querySelector('#my_file_output'), options);
    chart.render();



}
fileUpload2() {
  const fileUpload = document.getElementById('fileUpload2');
      // Validate whether File is valid Excel file.
  const regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx)$/;
  if (regex.test(fileUpload.value.toLowerCase())) {
          if (typeof (FileReader) != 'undefined') {
              const reader = new FileReader();

              // For Browsers other than IE.
              if (reader.readAsBinaryString) {
                  // tslint:disable-next-line: only-arrow-functions
                  reader.onload = (e) => {
                      this.ProcessExcel2(e.target.result);
                  };
                  reader.readAsBinaryString(fileUpload.files[0]);
              } else {
                  // For IE Browser.
                  // tslint:disable-next-line: only-arrow-functions
                  reader.onload = (e: any) => {
                      let data = '';
                      const bytes = new Uint8Array(e);
                      for (let i = 0; i < bytes.byteLength; i++) {
                          data += String.fromCharCode(bytes[i]);
                      }
                      this.ProcessExcel2(data);
                  };
                  reader.readAsArrayBuffer(fileUpload.files[0]);
              }
          } else {
              alert('This browser does not support HTML5.');
          }
      } else {
          alert('Please upload a valid Excel file.');
      }
}
ProcessExcel2(data) {
  // Read the Excel File data.
  // tslint:disable-next-line: prefer-const
  let workbook = XLSX.read(data, {
      type: 'binary'
  });

  // Fetch the name of First Sheet.
  const firstSheet = workbook.SheetNames[0];

  // Read all rows from First Sheet into an JSON array.
  const excelRows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[firstSheet]);
  console.log(excelRows);
  google.charts.load('current', {packages: ['timeline']});
  google.charts.setOnLoadCallback(drawChart);
  function drawChart() {
        const container = document.getElementById('timeline');
        const chart = new google.visualization.Timeline(container);
        const dataTable = new google.visualization.DataTable();
        dataTable.addColumn({ type: 'string', id: 'Term' });
        dataTable.addColumn({ type: 'string', id: 'President' });
        dataTable.addColumn({ type: 'date', id: 'Start' });
        dataTable.addColumn({ type: 'date', id: 'End' });
        const arr = [];
        excelRows.forEach(element => {
          if (element.What == 'Status') {
            arr.push({who: element.Added, when: element.When});
          }
        });
        arr.forEach((ele, index) => {
          if (index != arr.length - 1 ) {
            dataTable.addRow([index.toString(),ele.who,new Date(ele.when),new Date(arr[index+1]['when'])]);
          }
          else {
            dataTable.addRow([index.toString(),ele.who,new Date(ele.when),new Date(ele.when)]);
          }
        });

        chart.draw(dataTable);
      }



}
}
