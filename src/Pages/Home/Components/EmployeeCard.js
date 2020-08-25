import React, {Component, Fragment} from 'react'
import { ReactComponent as IconDelete } from "../../../Assets/icons/trash.svg";
import { ReactComponent as IconEdit } from "../../../Assets/icons/draw.svg";
import { ReactComponent as DeleteIlustration } from "../../../Assets/delete.svg";
import Modal from 'react-modal'
import Form from './Form'
import API from '../../../Services/Api'

export default class EmployeeCard extends Component{
    state = {
        isModalConfirmedShow : false,
        isModalEditShow : false,
        isDeleting : false
    }


    deleteEmployee = () => {
        const { employee, fetchListEmployee } = this.props
        this.setState({
            isDeleting : true
        })

        API.deleteEmployee(employee.id).then(response => {
            if(response.code === 200){
                this.setState({
                    isDeleting : false,
                    isModalConfirmedShow : false
                }, () => fetchListEmployee())
            }else{
                alert(response.message)
            }
        })
    }


    closeModal = () => {
        this.setState({
            isModalEditShow : false
        })
    }

    render(){
        const { employee, fetchListEmployee } = this.props
        const { isModalConfirmedShow, isModalEditShow, isDeleting } = this.state
        return (
            <Fragment>
                <div className="employee">
                    <div className="employee__card">
                        <div className="employee__card__data">
                            <img className="employee__card__data__profile" src={`https://randomuser.me/api/portraits/men/${employee.id}.jpg`} alt=""/>
                            <div className="employee__card__data__desc">
                                <div>{employee.name} - {employee.grade}</div>
                                <div>{employee.address}</div>
                            </div>
                        </div>
                        <div className="employee__card__action">
                            <button onClick={() => this.setState({isModalEditShow : true})}>
                                <IconEdit />
                            </button>            
                            <button onClick={() => this.setState({isModalConfirmedShow : true})}>
                                <IconDelete/>
                            </button>   
                        </div>     
                    </div>        
                </div>
                {/* Modal For Confirmed Delete */}
                <Modal
                    isOpen={isModalConfirmedShow}
                    onRequestClose={() => this.setState({ isModalConfirmedShow: false })}
                    className='modalContainer'
                    overlayClassName='modalOverlayCenter'>
                    <div className="modalDelete">
                        <div>
                            Are You Sure To Delete <br/>
                            <b>{employee.name}</b> ?
                        </div>
                        <DeleteIlustration />
                        <div className="modalDelete__action">
                            <button onClick={() => this.setState({isModalConfirmedShow : false})}>No</button>
                            <button onClick={() => this.deleteEmployee()}>{isDeleting ? "Loading..." : "Yes"}</button>
                        </div>
                    </div>
				</Modal>
                {/* Modal For Edit form */}
                <Modal
                    isOpen={isModalEditShow}
                    onRequestClose={() => this.setState({ isModalEditShow: false })}
                    className='modalContainer'
                    overlayClassName='modalOverlayCenter'>
                    <Form employeeID={employee.id} closeModal={this.closeModal} fetchListEmployee={fetchListEmployee}/>
				</Modal>
            </Fragment>
        )
    }
}