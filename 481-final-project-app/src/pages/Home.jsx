import React, { useState, useEffect, useRef } from 'react'
import ProfileCard from '../components/ProfileCard';
import { useNavigate } from 'react-router-dom';
import SupabaseDatabase from '../classes/SupabaseDatabase'
import SupabaseAuthentication from '../classes/SupabaseAuthentication'

/*
Todo -
- fix looks (LATER)
  - fix positioning css
*/

export default function Home() {

  const profile_list = ["Alice","Bob","Charlie","Diana","Ethan","Fiona","George","Hannah","Isaac","Julia"];
  const navigate = useNavigate();

  const [accounts, setAccounts] = useState([])

  const[students, setStudents] = useState([])
  const[alumni, setAlumni] = useState([])

  const[loaded, setLoaded] = useState(false)

  const[selectedField, setSelectedField] = useState("")
  const[selectedTitle, setSelectedTitle] = useState("")
  const[selectedCompany, setSelectedCompany] = useState("")
  const[selectedMajor, setSelectedMajor] = useState("")
  const[showConnections, setShowConnections] = useState(true)

  const[search, setSearch] = useState("")
  const[studentSearch, setStudentSearch] = useState(true)
  const[alumniSearch, setAlumniSearch] = useState(true)

  const[connections, setConnections] = useState([])
  const[user, setUser] = useState(null)

  useEffect(()=>{
    window.scrollTo(0, 0)
    const db = new SupabaseDatabase()

    const fetchData = async () => {
      const obj = await db.readTable("accounts")
      if (obj.data) {
        setAccounts(obj.data)
        setLoaded(true)
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

  useEffect(()=>{
    const auth = new SupabaseAuthentication();
    const getUser = async () => {
      setUser(await auth.retrieveUser());
      console.log(user)
    }

    getUser()
  }, [loaded])


  useEffect(()=>{
    const getConnections = async () => {
      const db = new SupabaseDatabase()

      if(user){
        const obj = await db.readRecordFromTable("accounts", "accountId", `${user.id}`)
        if (obj.data) {
          setConnections(obj.data[0].connections);
          console.log("done");
        }
      }
    }

    getConnections()
  }, [user])


  const fields = [...new Set(alumni.map(alumn => alumn.currentField))];
  const titles = [...new Set(alumni.map(alumn => alumn.currentJobTitle))];
  const companies = [...new Set(alumni.map(alumn => alumn.currentCompany))];
  const majors = [...new Set(students.map(student => student.major))];

  const filteredAccounts = accounts.filter((account) => {
    const notYou = account.accountId !== user.id;
    const nameMatches = `${account.firstName.toLowerCase()} ${account.lastName.toLowerCase()}`
      .startsWith(search.toLowerCase());
    const accountTypeMatches = (account.account_type === 'Student' && studentSearch)
      || (account.account_type === 'Alumni' && alumniSearch);
    const studentData = students.find(student => student.studentId === account.accountId);
    const alumniData = alumni.find(alumnus => alumnus.alumniId === account.accountId);
    const majorMatches = studentData ? (selectedMajor ? studentData.major.startsWith(selectedMajor) : true) : selectedMajor == "";
    const fieldMatches = alumniData ? (selectedField ? alumniData.currentField.toLowerCase().startsWith(selectedField.toLowerCase()) : true) : selectedField == "";
    const titleMatches = alumniData ? (selectedTitle ? alumniData.currentJobTitle.toLowerCase().startsWith(selectedTitle.toLowerCase()) : true) : selectedTitle == "";
    const companyMatches = alumniData ? (selectedCompany ? alumniData.currentCompany.toLowerCase().startsWith(selectedCompany.toLowerCase()) : true) : selectedCompany == "";
    const notConnection = showConnections ? true : !connections.includes(account.accountId);
    return notYou && nameMatches && accountTypeMatches && majorMatches && fieldMatches && titleMatches && companyMatches && notConnection;
  });

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };
  const handleCheckStudent = (event) => {
    setStudentSearch(!studentSearch);
  };
  const handleCheckAlumni = (event) => {
    setAlumniSearch(!alumniSearch);
  };
  const handleSelectField = (event) => {
    event.target.value.startsWith("All ") ?
    setSelectedField("") :
    setSelectedField(event.target.value);
  };
  const handleSelectTitle = (event) => {
    event.target.value.startsWith("All ") ?
    setSelectedTitle("") :
    setSelectedTitle(event.target.value);
  };
  const handleSelectCompany = (event) => {
    event.target.value.startsWith("All ") ?
    setSelectedCompany("") :
    setSelectedCompany(event.target.value);
  };
  const handleSelectMajor = (event) => {
    event.target.value.startsWith("All ") ?
    setSelectedMajor("") :
    setSelectedMajor(event.target.value);
  };
  const handleConnectionsChecked = (event) => {
    setShowConnections(!showConnections);
  };

  return (
    <div className="container">
      {/*<div className="title">Make Connections</div>*/}
      <div className="horizontal stacked-block" style={{paddingTop: "20px"}}>
        <input type="text" placeholder="Enter a name..." className="search"
          onChange={handleSearch}
        />
        <div className="nowrap">
          <input type="checkbox" id="alumni" name="people" value="alumni"
          checked={alumniSearch} onChange={handleCheckAlumni}/>
          <label htmlFor="alumni">Alumni</label>
        </div>
        <div className="nowrap">
          <input type="checkbox" id="students" name="people" value="students"
          checked={studentSearch} onChange={handleCheckStudent}/>
          <label htmlFor="students">Students</label>
        </div>
      </div>
      <div className="flex">
        <div className="filter">
          {
            alumniSearch &&
            <>
              <div>Field: </div>
              <select className="filter-dropdown" onChange={handleSelectField}>
                <option>All fields</option>
                {fields.map((field, index) => {
                  return <option key={index}>{field}</option>
                })}
              </select>
              <div>Title: </div>
              <select className="filter-dropdown" onChange={handleSelectTitle}>
                <option>All titles</option>
                  {titles.map((title, index) => {
                    return <option key={index}>{title}</option>
                  })}
              </select>
              <div>Company: </div>
              <select className="filter-dropdown" onChange={handleSelectCompany}>
                <option>All companies</option>
                {companies.map((company, index) => {
                  return <option key={index}>{company}</option>
                })}
              </select>
            </>
          }
          {studentSearch &&
          <>
            <div>Major: </div>
            <select className="filter-dropdown" onChange={handleSelectMajor}>
                <option>All majors</option>
                {majors.map((major, index) => {
                  return <option key={index}>{major}</option>
                })}
              </select>
          </>
          }
          <div style={{marginTop: "15px", fontSize: "17px"}}>
          <label htmlFor="placeholder">Show connections:</label>
          <input type="checkbox" id="placeholder" name="placeholder" value="placeholder"
           onChange={handleConnectionsChecked} defaultChecked/>
          </div>
        </div>
        {
          filteredAccounts.length == 0 ?
          (loaded ? <div>No accounts to show</div> : <div>Loading accounts...</div>)
          :
          <div className="card-list">
            {filteredAccounts.map((account, index) => {
              return <div
              key={account.accountId}
              onClick={()=>{
                navigate(`/profile/${account.accountId}`)
                }}>
                <ProfileCard name={`${account.firstName} ${account.lastName}`}
                picture={account.profilePicture}></ProfileCard>
              </div>
            })}
          </div>}
      </div>
    </div>
  )
}
