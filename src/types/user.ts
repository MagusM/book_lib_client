import { User as UserType } from "../store/types"

interface User extends UserType {
    lastLoggedIn?: Date | null
 }

export default User;