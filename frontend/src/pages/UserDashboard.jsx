import React from 'react'
import "../styles/UserDashboard.css"

const UserDashboard = () => {
    const [user, setUser] = React.useState("");
    const [groups, setGroups] = React.useState([]);
    React.useEffect(()=>{
        fetchUser()
        fetchGroups()
    }, [])
    const fetchUser = async () => {
    const res = await fetch("http://localhost:5000/api/user/me", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem('token')
      }
    })
    const data = await res.json()
    setUser(data)
    // console.log("USER DATA:", data)
  }

    const fetchGroups = ()=>{
        fetch('http://localhost:5000/api/user/my-groups', {
            headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
        })
        .then(res => res.json())
        .then(data => setGroups(data))
    }
// console.log("USER GROUPS:", groups)
const logout = ()=>{
    localStorage.clear();
    window.location.href = "/login";
}
  return (
    <>
    <div className="dashboard-container">
        <div className='nav'>
            <h2>
        Welcome{user?`, ${user.name}`:""}
      </h2>
      <button className="logout-btn" onClick={logout}>Logout</button>
        </div>
        
    
    {groups.map(g => (<div className='groups' key={g.groupId}>
        <div className='gname'>
            <h3>{g.groupName}</h3> 
            <h3>Members:{g.membersCount}</h3>
        </div>
        
        <ul>
            {g.members.map(u => (
            <li 
                key={u._id}>{u.name}
            </li>))}
        </ul>
    </div>
    ))}
    </div>
    </>
  )
}

export default UserDashboard