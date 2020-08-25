import React, {Component} from 'react'
import API from '../../../Services/Api'

export default class Form extends Component{

    state = {
        name : "",
        address : "",
        grade : "",
        isSubmitting : false
    }

    submit = (event) => {
        event.preventDefault()
        console.log("EVENT", event.target)
    }


    componentDidMount(){
        this.fetchDetailEmployee()
    }

    fetchDetailEmployee = () => {
        const {employeeID} = this.props
        if(employeeID){
            API.detailEmployeeByID(employeeID).then(response => {
                if(response.code === 200){
                    this.setState({
                        name : response.data.name,
                        address : response.data.address,
                        grade : response.data.grade,
                    })
                }
            })
        }
    }

    submit = (event) => {
        event.preventDefault()

        const {employeeID, closeModal, fetchListEmployee} = this.props
        const {name, address, grade} = this.state

        this.setState({isSubmitting : true})
        if(employeeID){
            API.updateEmployee(employeeID, {name, address, grade}).then(response => {
                if(response.code === 200){
                    this.setState({
                        isSubmitting : false,
                    }, () => {
                        closeModal()
                        fetchListEmployee()
                    })
                }else{
                    alert(response.message)
                }
            })
        }else{
            API.createNewEmployee({name, address, grade}).then(response => {
                if(response.code === 200){
                    this.setState({
                        isSubmitting : false,
                    }, () => {
                        closeModal()
                        fetchListEmployee()
                    })
                }else{
                    alert(response.message)
                }
            })
        }

        this.setState({isSubmitting : false})
    }

    render(){
        const {name, address, grade, isSubmitting} = this.state
        const {employeeID, closeModal} = this.props
            
        return (
            <div className="form">
                <form onSubmit={(event) => this.submit(event)}>
                    <h2>{employeeID ? "Edit Data Employee" : "Create New Employee"}</h2>
                    <input type="text" value={name} placeholder="Name" onChange={({target : {value}}) => this.setState({name : value})}/>
                    <input type="text" value={address} placeholder="Address" onChange={({target : {value}}) => this.setState({address : value})}/>
                    <input type="text" value={grade} placeholder="Grade" onChange={({target : {value}}) => this.setState({grade : value})}/>

                    <div>
                        <button onClick={() => closeModal()}>Cancel</button>
                        <button type="submit">{isSubmitting ? "Submiting..." : employeeID ? "Update" : "Create"}</button>
                    </div>
                </form>
            </div>
        )
    }
}