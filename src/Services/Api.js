import queryString from 'query-string'

const BASE_URL = '/api/v1.0'

export  default class API {

    static listEmployee = () => {
        return this.fetch('employees')
    }

    static detailEmployeeByID = (key) => {
        return this.fetch(`employee/${key}`)
    }

    
    static detailEmployeeByName = (key) => {
        return this.fetch(`employee/search?name=${key}`)
    }

    
    static deleteEmployee = (id) => {
        return this.fetch(`employee/${id}`, {method : 'DELETE'})
    }

    
	static review(id, parameters) {
		const payload = this.cleanPayload({
			rate: parameters.rate,
			review: parameters.review,
		})
		return this.fetch(`booking/${id}/review`, { method: 'POST', body: payload })
	}


    static createNewEmployee = (parameters = {}) => {
        const body = {
            name: parameters.name,
            address: parameters.address,
            grade: parameters.grade
        }

        return this.fetch(`employee`, {headers : {'Content-type' : 'application/json'}, method : 'POST', body : JSON.stringify(body)})
    } 

    static updateEmployee = (id, parameters = {}) => {
        const body = {
            name: parameters.name,
            address: parameters.address,
            grade: parameters.grade
        }

        return this.fetch(`employee/${id}`, {headers : {'Content-type' : 'application/json'}, method : 'PUT', body : JSON.stringify(body)})
    }

    static async fetch(url, config = {}) {  
        return fetch(`${BASE_URL}/${url}`, config)
            .then(response => {
                console.log("RESPONSE FETC", response)
                if(response.status !== 200){
                    console.log("Failed Fetching")
                }
                return response.json()
            })
            .catch(error => console.log("Error", error))
    }

}