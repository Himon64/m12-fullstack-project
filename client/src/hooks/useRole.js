import React, { useEffect, useState } from 'react';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

const useRole = () => {
  const { user } = useAuth();
  const [role, setRole] = useState(null);
  const [isRoleLoading, setIsRoleLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (!user?.email) {
      setIsRoleLoading(false);
      return;
    }

    const fetchUserRole = async () => {
      try {
        const { data } = await axiosSecure(
          `${import.meta.env.VITE_API_URL}/user/role/${user.email}`
        );
        setRole(data?.role);
      } catch (err) {
        console.error("Error fetching role:", err);
      } finally {
        setIsRoleLoading(false);
      }
    };

    fetchUserRole();
  }, [user, axiosSecure]);

  return [role, isRoleLoading];
};

export default useRole;
