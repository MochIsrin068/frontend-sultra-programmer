import React, {Component, Fragment} from 'react'
import EmployeeCard from './Components/EmployeeCard'
import EmptyStateLoader from './Components/EmptyStateLoader'
import EmptyStateData from './Components/EmptyStateData'
import { ReactComponent as IconAdd}  from '../../Assets/icons/add.svg'
import API from '../../Services/Api'
import Modal from 'react-modal'
import Form from './Components/Form'

export default class Home extends Component {
    state  =  {
        employees : {
            isLoading : true,
            data : null
        },
        isModalCreateShow : false,
        key : ""
    }


    componentDidMount(){
        this.fetchListEmployee()
    }

    fetchListEmployee = () => {
        API.listEmployee().then(response => {
            if(response.code === 200){
                this.setState({
                    employees : {
                        isLoading : false,
                        data : response.data
                    }
                })
            }
        })
    }

    closeModal = () => {
        this.setState({
            isModalCreateShow : false
        })
    }
    

    onSearch = (event) => {

        event.preventDefault()
        const {key} = this.state
        
        if(key.trim().length > 0){
            const keyNaN = isNaN(parseInt(key))

            if(keyNaN){
                API.detailEmployeeByName(key).then(response => {
                    if(response.code === 200){
                        this.setState({
                            employees : {
                                isLoading : false,
                                data : response.data
                            }
                        })
                    }
                })
            }else{
                API.detailEmployeeByID(key).then(response => {
                    if(response.code === 200){
                        this.setState({
                            employees : {
                                isLoading : false,
                                data : [response.data]
                            }
                        })
                    }
                })
            }
        }else{
            this.fetchListEmployee()
        }
    }

    render(){
        const {employees, isModalCreateShow} = this.state

        return (
            <Fragment>
                <div className="home">
                    <div className="home__header">
                        <div className="home__header__title">
                            <h3>EMPLOYEE APP</h3>
                            <p>Process your employee data easily and efficiently</p>
                        </div>
                        <div className="home__header__action">
                            <form onSubmit={(event) => this.onSearch(event)}>
                                <input type="text" placeholder="Search..." onChange={({target : {value}}) => this.setState({key : value})}/>
                            </form>
                            <button onClick={() => this.setState({isModalCreateShow : true})}>
                                <IconAdd />
                            </button>
                        </div>
                        
                    </div>
                    <div className="home__body">
                        {employees.isLoading ? 
                            <EmptyStateLoader />
                            :  employees.data.length < 1? <EmptyStateData /> :
                            employees.data.map(employee => (
                                <EmployeeCard employee={employee} fetchListEmployee={this.fetchListEmployee}/>
                            ))
                        }
                    </div>
                </div>
                {/* Modal For Create form */}
                <Modal
                    isOpen={isModalCreateShow}
                    onRequestClose={() => this.setState({ isModalCreateShow: false })}
                    className='modalContainer'
                    overlayClassName='modalOverlayCenter'>
                    <Form fetchListEmployee={this.fetchListEmployee} closeModal={this.closeModal} />
                </Modal>
            </Fragment>
        )
    }
}