import { useEffect, useState } from 'react';
import Spinner from './spinner';
import Modal from './modal';

const Th = ({children}) => {
    return (
        <th className="border-2 font-medium py-2">
            {children}
        </th>
    )
}

const Td = ({children}) => {
    return (
        <td className="py-4">{children}</td>
    )
}

const Home = (props) => {

    const [salaries, setSalaries] = useState([]);
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

    const onModalClose = (e) => {
        setExperience({display: false, content: {}});
    }

    return (
        <div className="p-4 mx-8">
            <div className="my-8 flex">
                <input className="border-2 rounded-lg flex-grow p-2 mr-2" placeholder="Search" value={filter} onChange={searchFilter}/>
                <button className="text-white bg-blue-600 hover:bg-blue-700 cursor-pointer px-4 rounded-lg focus:outline-none">
                    Add Internship
                </button>
            </div>
            <div className="w-full">
                <div className="bg-gray-100 rounded-xl py-4 mb-8 shadow-md">
                    <div className="grid grid-cols-13 text-center"
                        style={{gridTemplateColumns: "repeat(13, minmax(0, 1fr))"}}>
                        <div className="col-span-2">Company</div>
                        <div className="col-span-2">Hourly Salary</div>
                        <div className="col-span-4">Details</div>
                        <div className="col-span-2">Experiences</div>
                        <div className="col-span-2">Guide</div>
                        <div className="col-span-1">Action</div>
                    </div>
                </div>
                <div className="text-center">
                    {salaries.filter(salary => salary.company.toLowerCase().startsWith(filter.toLowerCase())).map(salary =>
                        <div className="bg-blue-100 rounded-xl grid py-2 shadow-md my-6" key={salary.company}
                        style={{gridTemplateColumns: "repeat(13, minmax(0, 1fr))"}}>
                            <div className="my-auto col-span-2">{salary.company}</div>
                            <div className="my-auto col-span-2">{salary.salary}</div>
                            <div className="my-auto col-span-4">{salary.details}</div>
                            <div className="my-auto col-span-2">
                                {salary.experiences.map(experience =>
                                    <div className="text-blue-600 cursor-pointer hover:underline hover:text-blue-700" key={experience.name}
                                       onClick={(e) => {
                                           setExperience({
                                               display: true,
                                               content: { ...experience, company: salary.company }
                                           })
                                       }}
                                    >
                                        {experience.name}
                                    </div>
                                )}
                                <div className="text-green-600 cursor-pointer hover:underline hover:text-blue-700"
                                    onClick={(e) => {
                                        alert("Not implemented yet!");
                                    }}>
                                    Add
                                </div>
                            </div>
                            <div className="my-auto col-span-2">
                                <a className="inline-block text-white bg-blue-600 hover:bg-blue-700 cursor-pointer py-2 px-4 rounded-lg focus:outline-none shadow-lg"
                                   href={"https://github.com/sunnyguan/utdlevels.fyi/blob/main/guides/" + salary.company.toLowerCase() + ".md"}
                                   target="_blank"
                                >
                                    Guide
                                </a>
                            </div>
                            <div className="my-auto text-green-600">
                                Edit
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {salaries.length === 0 ? <Spinner /> : <></>}
            <Modal experience={experience} onClose={onModalClose} />
        </div>
    )
}

export default Home;
