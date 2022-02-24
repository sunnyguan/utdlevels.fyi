import { useEffect, useState } from 'react';

const Th = ({children}) => {
    return (
        <th className="border-2 font-medium py-2">
            {children}
        </th>
    )
}

const Tr = ({children}) => {
    return (
        <tr className="border-2 border-t-0">{children}</tr>
    )
}

const Td = ({children}) => {
    return (
        <td className="py-4">{children}</td>
    )
}

const Home = (props) => {

    const [salaries, setSalaries] = useState([]);
    const [isGuideExpanded, setIsGuideExpanded] = useState(false);
    const [filter, setFilter] = useState("");
    const [experience, setExperience] = useState({display: false, content: {}});

    useEffect(() => {
        async function fetchSalary() {
            fetch('/api/salary')
                .then(v => v.json())
                .then(data => {
                    setSalaries(data);
                })
                .catch(err => {
                    console.log(err);
                });
        }
        fetchSalary();
    }, []);

    const searchFilter = (e) => {
        const newFilter = e.target.value;
        setFilter(newFilter);
    }

    return (
        <div className="p-4 mx-8">
            <div>
                <div className="p-8 rounded-xl bg-blue-200 mb-4 shadow-lg">
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
            </div>
            <div className="">
                <div className="my-8 flex">
                    <input className="border-2 rounded-lg flex-grow p-2 mr-2" placeholder="Search" value={filter} onChange={searchFilter}/>
                    <button className="text-white bg-blue-600 hover:bg-blue-700 cursor-pointer px-4 rounded-lg focus:outline-none">
                        Add Internship
                    </button>
                </div>
                <table className="table-auto w-full">
                    <thead className="bg-gray-100">
                        <tr>
                            <Th>Company</Th>
                            <Th>Hourly Salary</Th>
                            <Th>Details</Th>
                            <Th>Experiences</Th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {salaries.filter(salary => salary.company.toLowerCase().startsWith(filter.toLowerCase())).map(salary =>
                            <Tr key={salary.company}>
                                <Td>{salary.company}</Td>
                                <Td>{salary.salary}</Td>
                                <Td>{salary.details}</Td>
                                <Td>
                                    {salary.experiences.map(experience =>
                                        <div>
                                            <a className="ml-4 text-blue-600 cursor-pointer hover:underline hover:text-blue-700"
                                               onClick={(e) => {
                                                   setExperience({display: true, content: {...experience, company: salary.company}})
                                               }}
                                            >
                                                {experience.name}
                                            </a>
                                        </div>
                                    )}
                                </Td>
                            </Tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div id="defaultModal"
                 className={(experience.display ? "flex" : "hidden") + " overflow-y-auto overflow-x-hidden fixed right-0 left-0 top-4 z-50 justify-center items-center h-modal md:h-full md:inset-0"}>
                <div className="relative px-4 w-full max-w-2xl h-full md:h-auto">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="flex justify-between items-start p-5 rounded-t border-b dark:border-gray-600">
                            <h3 className="text-xl font-semibold text-gray-900 lg:text-2xl dark:text-white">
                                {experience.content.company} - {experience.content.name}
                            </h3>
                            <button type="button"
                                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                    data-modal-toggle="defaultModal"
                            onClick={(e) => {setExperience({display: false, content: {}})}}>
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd"
                                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                          clip-rule="evenodd"></path>
                                </svg>
                            </button>
                        </div>
                        <div className="p-6 space-y-6">
                            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                {experience.content.summary}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;
