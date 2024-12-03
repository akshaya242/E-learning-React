import React, { useEffect, useState } from "react";
import "./users.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../../index";
import Layout from "../Utils/Layout";
import toast from "react-hot-toast";

const AdminUsers = ({ user }) => {
  const navigate = useNavigate();
  
  const [users, setUsers] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState({}); // Store selected role per user

  useEffect(() => {
    fetchUsers();
  }, []);

  if (user && user.mainrole !== "superadmin") return navigate("/");

  // Fetch users function
  async function fetchUsers() {
    try {
      const { data } = await axios.get(`${server}/api/users`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });

      setUsers(data.users);
      // Initialize selectedRoles state for each user
      const initialRoles = data.users.reduce((acc, user) => {
        acc[user._id] = user.role; // Set the initial role
        return acc;
      }, {});
      setSelectedRoles(initialRoles);
    } catch (error) {
      console.log(error);
    }
  }

  // Update the user's role
  const updateRole = async (id) => {
    const newRole = selectedRoles[id]; // Get the selected role for this user
    try {
      const { data } = await axios.put(
        `${server}/api/user/${id}`,
        { role: newRole },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );

      toast.success(data.message);
      fetchUsers(); // Refresh the user list after the role update
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleRoleChange = (id, role) => {
    setSelectedRoles((prev) => ({
      ...prev,
      [id]: role, // Update the role for the specific user
    }));
  };

  return (
    <Layout>
      <div className="users">
        <h1>All Users</h1>
        <table border={"black"}>
          <thead>
            <tr>
              <td>Sr.No</td>
              <td>Name</td>
              <td>Email</td>
              <td>Role</td>
              <td>Update role</td>
              <td>Requesting access for</td>
            </tr>
          </thead>
          {users &&
            users.map((e, i) => (
              <tbody key={e._id}>
                <tr>
                  <td>{i + 1}</td>
                  <td>{e.name}</td>
                  <td>{e.email}</td>
                  <td>
                    {e.role === "user"
                      ? "User"
                      : e.role === "admin"
                      ? "Admin"
                      : e.role === "teacher"
                      ? "Teacher"
                      : ""}
                  </td>
                  <td>
                    {/* Select dropdown to change role */}
                    <select
                      value={selectedRoles[e._id] || e.role} // Default to current role
                      onChange={(event) => handleRoleChange(e._id, event.target.value)}
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                      <option value="teacher">Teacher</option>
                    </select>
                    <button
                      onClick={() => updateRole(e._id)} // Update role based on selected value
                      className="common-btn"
                    >
                      Update Role
                    </button>
                  </td>

                  <td>{e.role !== "admin" && e.designation}</td>

                </tr>
              </tbody>
            ))}
        </table>
      </div>
    </Layout>
  );
};

export default AdminUsers;
