import React, { Component } from 'react'
import ReactGantt from 'gantt-for-react'

//redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {loadProject} from '../../shared/actions/projectActions'

class ProjectGantt extends Component {


    constructor(props) {
        super(props);
        this.state = {
            viewMode: 'Week',
            chart: ''
        }
	}
	
	componentWillMount(){
		this.props.loadProject(45)
	}



    componentWillReceiveProps(next) {
        if (next.project) {
            console.log(next.project)
            let tasks = next.project.tasks
            this.getTasks(tasks)
        }
    }

    componentDidMount() {
        // this.setState({
        //     viewMode: 'Week',

        //     tasks: this.getTasks().slice(0, parseInt(Math.random() * 4 + 1))
        // });
    }

    getTasks = (tasks) => {


        let t = tasks.map(function (task, i) {

            let startDate = new Date(task.startDate);
            let dueDate = new Date(task.dueDate);

            let start = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
            let end = new Date(dueDate.getFullYear(), dueDate.getMonth(), dueDate.getDate());
            return {
                start: start,
                end: end,
                name: task.name,
                id: task.id,
                progress: task.status === 'finished' ? 100 : 0
            }
        });
        
        t.sort(function(a, b) {
            return new Date (a.startDate) > new Date( b.startDate)
          });
		
        // tasks[1].dependencies = "Task 0";
        // tasks[2].dependencies = "Task 1, Task 0";
        // tasks[3].dependencies = "Task 2";
        // tasks[5].dependencies = "Task 4";

        // tasks[0].custom_class = "bar-milestone";
        // tasks[0].progress = 60;


        this.setState({
            chart: <ReactGantt tasks={t}
                viewMode={this.state.viewMode}
                //customPopupHtml={this.customPopupHtml}
                scrollOffsets={this.state.scrollOffsets}
            />
        })
        return tasks;
    };

    // customPopupHtml = task => {
    //     const end_date = task._end.format('MMM D');
    //     return `
    //           <div class="details-container">
    //             <h5>${task.name}</h5>
    //             <p>Expected to finish by ${end_date}</p>
    //             <p>${task.progress}% completed!</p>
    //           </div>
    //         `;
    // };

    setDaily() {
        this.setState({ viewMode: 'Day' })
    }

    render() {
        let t =[ {
                start: new Date(2019, 7, 21),
                end:  new Date(2019, 7, 25),
                name: 'Create Creative Brief',
                id: "t1",
                progress:100 
            },

            {
                start: new Date(2019, 7, 21),
                end:  new Date(2019, 7, 23),
                name: 'Report about Recent Works',
                id: "t2",
                progress:100 
            },

            {
                start: new Date(2019, 7, 23),
                end:  new Date(2019, 7, 25),
                name: 'First Prototype',
                id: "t3",
                progress:100 
            },
            {
                start: new Date(2019, 7, 23),
                end:  new Date(2019, 7, 24),
                name: 'Last quotation',
                id: "t4",
                progress:100 
            },
            {
                start: new Date(2019, 7, 24),
                end:  new Date(2019, 7, 28),
                name: 'Progress Report',
                id: "t5",
                progress:0 
            },
            {
                start: new Date(2019, 7, 28),
                end:  new Date(2019, 7, 30),
                name: 'Go to Production',
                id: "t6",
                progress:0 
            },
            {
                start: new Date(2019, 7, 30),
                end:  new Date(2019, 7, 31),
                name: 'Last Products',
                id: "t7",
                progress:0 
            },
        ]

        return (
            <div className='m-gantt'>

                {/* <div className='row'>
                    <div className="offset-9 col-3 btn-group" role="group" aria-label="Basic example" style={{ marginBottom: '20px' }}>
                        <button type="button" className="btn  btn-sm btn-outline-dark " onClick={() => this.setState({ viewMode: 'Day' })}>Daily</button>
                        <button type="button" className="btn btn-sm btn-outline-dark " onClick={() => this.setState({ viewMode: 'Week' })}>Weekly</button>
                        <button type="button" className="btn btn-sm btn-outline-dark " onClick={() => this.setState({ viewMode: 'Month' })}>Monthly</button>
                    </div>
                </div> */}
                <div>
                    {this.state.chart}

                    {/* <ReactGantt tasks={t}
                        viewMode={this.state.viewMode}
                        customPopupHtml={this.customPopupHtml}
                        scrollOffsets={this.state.scrollOffsets}
                    /> */}
                </div>
            </div>
        )
    }
}

let mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ loadProject }, dispatch)
}

let mapStateToProps = (state) => {
    return { project: state.projects.details }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectGantt)