import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState } from "react";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast, { Toaster } from 'react-hot-toast';

const UpdateUserRoleModal = ({isOpen,setIsOpen,role,userEmail}) => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const[updatedRole,setUpdateRole] = useState(role);
  console.log(updatedRole)
  function close() {
    setIsOpen(false);
  }

  // get data === useQuery
  // update/add/delete === useMutation

  const mutation = useMutation({
    mutationFn:async (role) => {
      const {data} = await axiosSecure.patch(`/user/role/update/${userEmail}`,{role})
      return data;
    },
    onSuccess:data => {
      toast.success('user role update successfully!')
      setIsOpen(false)
      queryClient.invalidateQueries(['users'])
    },
    onError:error => {
      console.log(error)
    }
  })
  const handleSubmit = e => {
    e.preventDefault();
    mutation.mutate(updatedRole)
  }

  return (
    <>

      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={close}
        __demoMode
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0 border border-gray-200 shadow-xl"
            >
              <DialogTitle as="h3" className="text-base/7 font-medium ">
                Update User Role
              </DialogTitle>
              <form onSubmit={handleSubmit}>
                <div>
                  <select
                  value={updatedRole}
                  onChange={e => setUpdateRole(e.target.value)}
                    name="role"
                    id=""
                    className="border border-gray-400 w-full px-2 py-3 rounded-xl"
                  >
                    <option value="customer">Customer</option>
                    <option value="seller">Seller</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <div className="flex justify-between mt-7">
                  <button type="submit" className="bg-green-700 text-white rounded-xl px-3 py-2 cursor-pointer">Update</button>
                  <button onClick={close} type="button" className="bg-red-700 text-white rounded-xl px-3 py-2 cursor-pointer">Cancel</button>
                </div>
              </form>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default UpdateUserRoleModal;
