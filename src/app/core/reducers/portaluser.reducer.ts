// import { portalUserInitialState, PortalUserState } from "../state/portaluser.state";
import { AuthAction } from "src/app/auth/store/auth.actions";
//
// export function reducers(
//     state = portalUserInitialState, action: AuthAction): PortalUserState {
//     switch (action.type) {
//
//         // case AuthActionTypes.LOGIN_COMPLETED: {
//         //     return Object.assign({}, state, {
//         //         userData: action.payload.user.userData,
//         //         isLoggedIn: action.payload.user.userData != null,
//         //         isAdmin: action.payload.user.isAdmin,
//         //         isDistributor: action.payload.user.isDistributor,
//         //         error: null
//         //     });
//         // }
//
//         // case actions.AuthActionTypes.AUTH_ERROR: {
//         //     return Object.assign({}, state, {
//         //         error: action.payload.error
//         //     });
//         // }
//
//         // case actions.AuthActionTypes.LOGOUT_COMPLETED: {
//         //     return Object.assign({}, state, {
//         //         userData: null,
//         //         isLoggedIn: false
//         //     });
//         // }
//
//         default: {
//             return state;
//         }
//     }
// }
