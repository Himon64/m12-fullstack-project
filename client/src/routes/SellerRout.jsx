import { Navigate } from "react-router";
import LoadingSpinner from "../components/Shared/LoadingSpinner";
import useRole from "../hooks/useRole";

const SellerRout = ({children}) => {

    const[role,isRoleLoading] = useRole();

    if(isRoleLoading) return <LoadingSpinner />
    if(role === 'seller') return children;

    return <Navigate to = '/' />
};

export default SellerRout;