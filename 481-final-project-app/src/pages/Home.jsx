import React, { useState, useEffect, useRef } from 'react'
import ProfileCard from '../components/ProfileCard';
import { useNavigate } from 'react-router-dom';
import SupabaseDatabase from '../classes/SupabaseDatabase'

/*
Todo -
- filters (PRIO)
  - implement filters
- fix looks (LATER)
  - fix images
  - fix positioning css
*/

export default function Home() {

  const profile_list = ["Alice","Bob","Charlie","Diana","Ethan","Fiona","George","Hannah","Isaac","Julia"];
  const navigate = useNavigate();

  const [accounts, setAccounts] = useState([])

  const[students, setStudents] = useState([])
  const[alumni, setAlumni] = useState([])

  const[search, setSearch] = useState("")
  const[studentSearch, setStudentSearch] = useState(true)
  const[alumniSearch, setAlumniSearch] = useState(true)
  //const[seen, setSeen] = useState([])

  useEffect(()=>{
    const fetchData = async () => {
      const db = new SupabaseDatabase()
      const obj = await db.readTable("accounts")
      //console.log(db)
      if (obj.data) {
        setAccounts(obj.data)
      } else if (obj.error) {
        console.log("There was an error in the Home page")
      }
      const obj2 = await db.readTable("uw_students")
      if (obj2.data) {
        setStudents(obj2.data)
      }
      const obj3 = await db.readTable("uw_alumni")
      if (obj3.data) {
        setAlumni(obj3.data)
      }
    }


    fetchData()
  }, []);

  const fields = [...new Set(alumni.map(alumn => alumn.currentField))];
  const titles = [...new Set(alumni.map(alumn => alumn.currentJobTitle))];
  const companies = [...new Set(alumni.map(alumn => alumn.currentCompany))];
  const majors = [...new Set(students.map(alumn => alumn.major))];

  const filteredAccounts = accounts.filter((account) =>
    `${account.firstName.toLowerCase()} ${account.lastName.toLowerCase()}`
    .startsWith(search.toLowerCase())
    && ((account.account_type === 'Student' && studentSearch)
    || (account.account_type === 'Alumni' && alumniSearch))
  )

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };
  const handleCheckStudent = (event) => {
    setStudentSearch(!studentSearch);
  };
  const handleCheckAlumni = (event) => {
    setAlumniSearch(!alumniSearch);
  };

  return (
    <div className="container">
      <div className="title">Make Connections</div>
      <div className="horizontal stacked-block">
        <input type="text" placeholder="Enter a name..." className="search"
          onChange={handleSearch}
        />
        <div className="nowrap">
          <input type="checkbox" id="alumni" name="people" value="alumni"
          checked={alumniSearch} onChange={handleCheckAlumni}/>
          <label for="alumni">Alumni</label>
        </div>
        <div className="nowrap">
          <input type="checkbox" id="students" name="people" value="students"
          checked={studentSearch} onChange={handleCheckStudent}/>
          <label for="students">Students</label>
        </div>
      </div>
      <div className="flex">
        <div className="filter">
          {
            alumniSearch &&
            <>
              <div classname>Field: </div>
              <select class="filter-dropdown">
                <option>All fields</option>
                {fields.map(field => {
                  return <option>{field}</option>
                })}
              </select>
              <div>Title: </div>
              <select class="filter-dropdown">
                <option>All titles</option>
                  {titles.map(title => {
                    return <option>{title}</option>
                  })}
              </select>
              <div>Company: </div>
              <select class="filter-dropdown">
                <option>All companies</option>
                {companies.map(company => {
                  return <option>{company}</option>
                })}
              </select>
            </>
          }
          {studentSearch &&
          <>
            <div>Major: </div>
            <select class="filter-dropdown">
                <option>All majors</option>
                {majors.map(major => {
                  return <option>{major}</option>
                })}
              </select>
          </>
          }
          <div style={{marginTop: "15px", fontSize: "17px"}}>
          <label for="placeholder">Show connections:</label>
          <input type="checkbox" id="placeholder" name="placeholder" value="placeholder" checked/>
          </div>
        </div>
        <div className="card-list">
          {filteredAccounts.map(account => {
            return <div
            key={account.accountId}
            onClick={()=>{
              navigate(`/profile/${account.accountId}`)
              }}>
              <ProfileCard name={`${account.firstName} ${account.lastName}`}
              picture={account.profilePicture}></ProfileCard>
            </div>
          })}
        </div>
      </div>
    </div>
  )
}
