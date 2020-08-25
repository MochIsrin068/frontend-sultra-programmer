import React from 'react'
import { ReactComponent as NoData}  from '../../../Assets/nodata.svg'

const EmptyStateData = () => {
    return (
        <div className="emptyState__nodata">
            <NoData />
        </div>
    )
}

export default EmptyStateData