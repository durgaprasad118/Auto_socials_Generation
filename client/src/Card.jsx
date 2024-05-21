const Card = ({ domain, employees, followers }) => {
  return (
    <div className="h-[200px] w-[250px] rounded-lg shadow-md p-6 bg-white m-4 flex flex-col box-border">
      <div className="flex-grow ">
        <div className="font-bold text-3xl m-2">{domain}</div>
        <p className="text-gray-700 text-xl m-2">Employees: {employees}</p>
        <p className="text-gray-700 text-xl m-2">Followers: {followers}</p>
      </div>
      <a
        href={`https://${domain}`}
        target="_blank"
        className="text-blue-500 hover:underline mt-2 self-start"
      >
        Go to page
      </a>
    </div>
  )
}

export default Card
