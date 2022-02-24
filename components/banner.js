import { useState } from 'react';

const Banner = (props) => {

    const [isGuideExpanded, setIsGuideExpanded] = useState(false);

    return (
        <div className="mx-12 mt-4 p-8 rounded-xl bg-blue-200 mb-4 shadow-lg">
            <div className="text-3xl mb-2">
                Internships are the surest path to a full-time job.
            </div>
            <div className="">
                Here's what you need to know.
                <a className="ml-4 text-blue-600 cursor-pointer hover:underline hover:text-blue-700"
                   onClick={(e) => {setIsGuideExpanded(!isGuideExpanded)}}>
                    Expand Guide
                </a>
            </div>
            <div className={"mt-4 " + (isGuideExpanded ? "block" : "hidden")}>
                Some useful info
            </div>
        </div>
    )
}

export default Banner;