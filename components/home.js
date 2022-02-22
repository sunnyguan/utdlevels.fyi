import { useEffect, useState } from 'react';

const Th = ({children}) => {
    return (
        <th className="border-2 font-medium">
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
        <td className="">{children}</td>
    )
}

const Home = (props) => {

    const [salaries, setSalaries] = useState([]);

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

    return (
        <div className="p-4 w-full">
            <div>
                <div className="text-center mx-24 py-4 rounded-xl bg-blue-200 mb-4 shadow-lg">
                    Internships are the surest path to a full-time job.
                </div>
            </div>
            <div className="m-8">
                <table className="table-auto w-full">
                    <thead className="bg-gray-100">
                        <tr>
                            <Th>Company</Th>
                            <Th>Hourly Salary</Th>
                            <Th>Details</Th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {salaries.map(salary =>
                            <Tr key={salary.company}>
                                <Td>{salary.company}</Td>
                                <Td>{salary.salary}</Td>
                                <Td>{salary.details}</Td>
                            </Tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Home;
