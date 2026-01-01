import React from 'react'
import {useState, useEffect} from 'react'
import "../styles/AdminDashboard.css"

const AdminDashboard = () => {
    const token = localStorage.getItem('token');
    const [users, setUsers] = useState([]);
    const [groups, setGroups] = useState([]);
    const [userForm, setUserForm] = useState({name:'', email:'', password:''});
    const [groupForm, setGroupForm] = useState("");
    const [selectedUser, setSelectedUser] = useState("");
    const [selectedGroup, setSelectedGroup] = useState("");

    useEffect(()=>{
        fetchUsers()
        fetchGroups()
    },[])

    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/admin/users", {
          headers: { Authorization: "Bearer " + token }
        })

        const data = await res.json()

        // console.log("USERS API RESPONSE:", data)

        setUsers(Array.isArray(data) ? data : [])
      } catch (err) {
        console.error("Error fetching users", err)
        setUsers([])
      }
    }

    const fetchGroups = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/admin/groups", {
          headers: { Authorization: "Bearer " + token }
        })

        const data = await res.json()

        // console.log("GROUP API RESPONSE:", data)

        setGroups(Array.isArray(data) ? data : [])
      } catch (err) {
        console.error("Error fetching groups", err)
        setGroups([])
      }
    }

    const createUser = async()=>{
        await fetch('http://localhost:5000/api/admin/create-user', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            },
            body: JSON.stringify(userForm)
        })
        setUserForm({name:'', email:'', password:''});
        fetchUsers()
        alert("User created")
    }

    const createGroup = async()=>{
        await fetch('http://localhost:5000/api/admin/create-group', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            },
            body: JSON.stringify({name: groupForm})
        })
        setGroupForm("");
        fetchGroups()
        alert("Group created")
    }

    const addUserToGroup = async()=>{
        await fetch('http://localhost:5000/api/admin/add-user-to-group', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json',
                Authorization: "Bearer " + token
            },
            body: JSON.stringify({
                userId: selectedUser, 
                groupId: selectedGroup
            })
        })
        alert("User added to group")
        setSelectedUser("");
        setSelectedGroup("");
    }

    const logout = ()=>{
        localStorage.clear();
        window.location.href = '/login';
    }


  return (
    <>
    <div className="admin-dashboard">
      <div className="admin-header">
        <h2>Admin Dashboard</h2>
      <button onClick={logout}>Logout</button>
      </div>
      

      <hr />
      <div className='createuser'>
      <h3>Create User</h3>
      <input
        placeholder="Name"
        value={userForm.name}
        onChange={e => setUserForm({ ...userForm, name: e.target.value })}
      />
      <input
        placeholder="Email"
        value={userForm.email}
        onChange={e => setUserForm({ ...userForm, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        value={userForm.password}
        onChange={e => setUserForm({ ...userForm, password: e.target.value })}
      />
      <button onClick={createUser}>Create User</button>

      </div>
      
      <hr />
      <div className='creategroup'>
        <h3>Create Group</h3>
      <input
        placeholder="Group Name"
        value={groupForm}
        onChange={e => setGroupForm(e.target.value)}
      />
      <button onClick={createGroup}>Create Group</button>
      </div>
      
      <hr />
      <div className='addusertogroup'>
        <h3>Add User to Group</h3>

      <select value={selectedUser} onChange={e => setSelectedUser(e.target.value)}>
      <option value="">Select User</option>
      {Array.isArray(users) &&
        users.map(u => (
          <option key={u._id} value={u._id}>
            {u.name}
          </option>
        ))}
    </select>

    <select value={selectedGroup} onChange={e => setSelectedGroup(e.target.value)}>
      <option value="">Select Group</option>
      {Array.isArray(groups) &&
        groups.map(g => (
          <option key={g._id} value={g._id}>
            {g.name}
          </option>
        ))}
    </select>

      <button onClick={addUserToGroup}>Add</button>
        </div>
      
              <hr />

    </div>
    </>
  )
}

export default AdminDashboard