import React from 'react'

const EmptyStateLoader = () => {
    return(
        <div className="emptyState">
            <div className="emptyState__card">
                <div className="emptyState__card__profile"/>
                <div className="emptyState__card__content">
                    <div></div>
                    <div></div>
                </div> 
            </div>    
            <div className="emptyState__card">
                <div className="emptyState__card__profile"/>
                <div className="emptyState__card__content">
                    <div></div>
                    <div></div>
                </div> 
            </div>   
        </div>
    )
}
export default EmptyStateLoader