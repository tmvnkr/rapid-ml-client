import { connectedReduxRedirect } from 'redux-auth-wrapper/history4/redirect'
import { openModal } from '../modals/actions'

export const UserIsAuthenticated = connectedReduxRedirect({
  wrapperDisplayName: 'UserIsAuthenticated',
  allowRedirectBack: true,
  redirectPath: '/collections',
  authenticatedSelector: ({ firebase: { auth } }) => auth.isLoaded && !auth.isEmpty,
  redirectAction: newLoc => dispatch => {
    dispatch(openModal('UnauthModal'))
  }
})
