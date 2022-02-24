import { useEffect, useState } from 'react';
import Spinner from './spinner';
import Modal from './modal';
import Banner from './banner';

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
                    <tr className="border-2 border-t-0" key={salary.company}>
                        <Td>{salary.company}</Td>
                        <Td>{salary.salary}</Td>
                        <Td>{salary.details}</Td>
                        <Td>
                            {salary.experiences.map(experience =>
                                <div className="text-blue-600 cursor-pointer hover:underline hover:text-blue-700"
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
                        </Td>
                    </tr>
                )}
                </tbody>
            </table>
            {salaries.length === 0 ? <Spinner /> : <></>}
            <Modal experience={experience} onClose={onModalClose} />
        </div>
    )
}

export default Home;
