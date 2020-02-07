import { element } from 'protractor';
import { Component } from '@angular/core';
import {} from 'apexcharts';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(http : HttpClient) {

    var idBug = [296,
      326,
      336,
      424,
      491,
      518,
      839,
      1299,
      2042,
      2994,
      3150,
      4491,
      4765,
      4990,
      5754,
      5863,
      6001,
      7535,
      7816,
      8163,
      8800,
      11226,
      11494];

    for(let i = 0;i < 23;i++){
      http.get(`https://bugzilla.mozilla.org/rest/bug/${idBug[i]}/history`).subscribe(data=>{
        console.log(data);
        this.ProcessExcel2(data);
    })
    }

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
  let whoName = {'afranke@mathweb.org':{color:'red'},'agracebush@netscape.net':{color:'blue'},
  'alecf@flett.org':{color:'green'},'benc@meer.net':{color:'yellow'},
  'briano@bluemartini.com':{color:'pink'},'cathleennscp@netscape.net':{color:'#1abc9c'},
  'chofmann@gmail.com':{color:'#9b59b6'},'Chris.Yeh@nokia.com':{color:'#32ff7e'},
  'cpratt@formerly-netscape.com.tld':{color:'#34495e'},'dbaron@dbaron.org':{color:'#474787'},
  'desale@formerly-netscape.com.tld':{color:'#f1c40f'},'don@formerly-netscape.com.tld':{color:'#84817a'},
  'doug.turner@gmail.com':{color:'#f39c12'},'elig@formerly-netscape.com.tld':{color:'#227093'},
  'endico@mozilla.org':{color:'#d35400'},'esther@formerly-netscape.com.tld':{color:'#ccae62'},
  'hangas@formerly-netscape.com.tld':{color:'#e67e22'},'harleyangel@angelfire.com':{color:'#ffda79'},
  'jar@formerly-netscape.com.tld':{color:'#2980b9'},'jaymoz@gmail.com':{color:'#b33939'},
  'jensend@iname.com':{color:'#e74c3c'},'jimmykenlee@yahoo.com':{color:'#40407a'},
  'jonasj@qio.dk':{color:'#7f8c8d'},'jruderman@gmail.com':{color:'#6F1E51'},
  'kmcclusk@formerly-netscape.com.tld':{color:'#2c3e50'},'laurel@formerly-netscape.com.tld':{color:'#833471'},
  'law@formerly-netscape.com.tld':{color:'#fd79a8'},'lchiang@formerly-netscape.com.tld':{color:'#B53471'},
  'leger@formerly-netscape.com.tld':{color:'#e17055'},'mcafee@gmail.com':{color:'#ED4C67'},
  'michaell@formerly-netscape.com.tld':{color:'#fdcb6e'},'mike.rolig@writeme.com':{color:'#FDA7DF'},
  'mozilla@davidkrause.com':{color:'#55efc4'},'msanz@formerly-netscape.com.tld':{color:'#D980FA'},
  'myk@mykzilla.org':{color:'#74b9ff'},'phil@formerly-netscape.com.tld':{color:'#9980FA'},
  'rickg@formerly-netscape.com.tld':{color:'#81ecec'},'pkwarren@gmail.com':{color:'#5758BB'},
  'rods@formerly-netscape.com.tld':{color:'#18dcff'},'roland.mainz@nrubsig.org':{color:'#1B1464'},
  'rubydoo123@aol.com':{color:'#FFC312'},'scottputterman@gmail.com':{color:'#C4E538'},
  'selmer@formerly-netscape.com.tld':{color:'#F79F1F'},'sfraser_bugs@smfr.org':{color:'#A3CB38'},
  'tever@formerly-netscape.com.tld':{color:'#EE5A24'},'timeless@bemail.org':{color:'#009432'},
  'vdwel@caiw.nl':{color:'#006266'}

    };
  google.charts.load('current', {packages: ['timeline']});
  google.charts.setOnLoadCallback(drawChart);
  function drawChart() {
        const container = document.createElement('div');
        document.body.append(container);
        const chart = new google.visualization.Timeline(container);
        const dataTable = new google.visualization.DataTable();
        dataTable.addColumn({ type: 'string', id: 'Term' });
        dataTable.addColumn({ type: 'string', id: 'President' });
        dataTable.addColumn({ type: 'date', id: 'Start' });
        dataTable.addColumn({ type: 'date', id: 'End' });
        const arr = [];
        let options = {
          colors: []
        };
        data.bugs[0].history.forEach(element => {
          element.changes.forEach(elementx => {
            if (elementx.field_name == 'status') {
              arr.push({who: element.who, when: element.when,status:elementx.added});
              options.colors.push(whoName[element.who]?whoName[element.who].color:`${getRandomColor()}`);
            }
          });

        });

        console.log(arr);
        arr.forEach((ele, index) => {
          if (index != arr.length - 1 ) {
            dataTable.addRow([ele.status,ele.who,new Date(ele.when),new Date(arr[index+1]['when'])]);
          }
          else {
            dataTable.addRow([ele.status,ele.who,new Date(ele.when),new Date(ele.when)]);
          }
        });
        function getRandomColor() {
          var letters = '0123456789ABCDEF';
          var color = '#';
          for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
          }
          return color;
        }
        chart.draw(dataTable,options);
      }



}
}
