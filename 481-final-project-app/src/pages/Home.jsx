import React, { useState, useEffect } from 'react'
import ProfileCard from '../components/ProfileCard';
import { useNavigate } from 'react-router-dom';
import SupabaseDatabase from '../classes/SupabaseDatabase'


export default function Home() {

  const profile_list = ["Alice","Bob","Charlie","Diana","Ethan","Fiona","George","Hannah","Isaac","Julia"];
  const navigate = useNavigate();

  const [accounts, setAccounts] = useState([])

  useEffect(()=>{
    const fetchData = async () => {
      const db = new SupabaseDatabase()
      const obj = await db.readTable("accounts")
      if (obj.data) {
        setAccounts(obj.data)
        console.log(obj.data)
      } else if (obj.error) {
        console.log("There was an error in the Home page")
      }
    }

    fetchData()
  }, []);

  return (
    <div className="container">
      <div className="title">Make Connections</div>
      <div className="horizontal stacked-block">
        <input type="text" placeholder="Enter a name..." className="search" />
        <div className="nowrap">
          <input type="checkbox" id="alumni" name="people" value="alumni" checked/>
          <label for="alumni">Alumni</label>
        </div>
        <div className="nowrap">
          <input type="checkbox" id="students" name="people" value="students" checked/>
          <label for="students">Students</label>
        </div>
      </div>
      <div className="horizontal">
        <div className="filter">
          <div>Filters</div>
          <input type="checkbox" id="placeholder" name="placeholder" value="placeholder" />
          <label for="placeholder">Placeholder</label><br />
          <input type="checkbox" id="placeholder" name="placeholder" value="placeholder" />
          <label for="placeholder">Placeholder</label><br />
          <input type="checkbox" id="placeholder" name="placeholder" value="placeholder" />
          <label for="placeholder">Placeholder</label><br />
          <input type="checkbox" id="placeholder" name="placeholder" value="placeholder" />
          <label for="placeholder">Placeholder</label><br />
          <input type="checkbox" id="placeholder" name="placeholder" value="placeholder" />
          <label for="placeholder">Placeholder</label><br />
          <input type="checkbox" id="placeholder" name="placeholder" value="placeholder" />
          <label for="placeholder">Placeholder</label><br />
          <input type="checkbox" id="placeholder" name="placeholder" value="placeholder" />
          <label for="placeholder">Placeholder</label><br />
          <input type="checkbox" id="placeholder" name="placeholder" value="placeholder" />
          <label for="placeholder">Placeholder</label>
        </div>
        <div className="card-list">
          {accounts.map(account => {
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
