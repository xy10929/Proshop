import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { FaTrash, FaEdit, FaCheck } from 'react-icons/fa'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import {
  useGetUsersQuery,
  useDeleteUserMutation,
} from '../../slices/usersApiSlice'
import { toast } from 'react-toastify'

const UserListScreen = () => {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery()

  const [deleteUser, { isLoading: loadingDelete }] = useDeleteUserMutation()

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete the user?')) {
      try {
        await deleteUser(id)

        refetch()

        toast.success('User deleted')
      } catch (err) {
        toast.error(err?.data?.message || err.message)
      }
    }
  }

  return (
    <>
      <h1>Users</h1>
      {isLoading || loadingDelete ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>USER ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>
                  {user.isAdmin ? (
                    <FaCheck style={{ color: 'green' }} />
                  ) : (
                    <FaCheck style={{ color: 'red' }} />
                  )}
                </td>
                <td>
                  {/* edit icon */}
                  <LinkContainer to={`/admin/user/${user._id}/edit`}>
                    <Button className='btn-sm' variant='light'>
                      <FaEdit />
                    </Button>
                  </LinkContainer>

                  {/* delete icon */}
                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => deleteHandler(user._id)}
                  >
                    <FaTrash style={{ color: 'white' }} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default UserListScreen
